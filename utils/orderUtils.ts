import { PlaceOrderSchema } from "../schemas/placeOrder";
import { CreateOrderRequest } from "../types/order";

// Helper function to extract coordinates from address string
// This assumes the address format includes coordinates in parentheses or as separate data
const extractCoordinates = (address: string): { lat: string; long: string } => {
  // For now, return default coordinates for Addis Ababa
  // In a real app, you'd parse the address or get coordinates from the map selection
  return {
    lat: "9.1450", // Default to Addis Ababa
    long: "38.7613",
  };
};

// Helper function to map service types to API values
const mapServiceType = (serviceType: string): string => {
  const serviceTypeMap: Record<string, string> = {
    "Same Day": "SAME_DAY",
    "Next Day": "NEXT_DAY",
    Standard: "STANDARD",
    Express: "EXPRESS",
  };
  return serviceTypeMap[serviceType] || "STANDARD";
};

// Helper function to map collection types to API values
const mapFulfillmentType = (collectionType: string): string => {
  const fulfillmentTypeMap: Record<string, string> = {
    Pickup: "PICKUP",
    "Drop-off": "DROP_OFF",
  };
  return fulfillmentTypeMap[collectionType] || "PICKUP";
};

// Helper function to map shipment types to API values
const mapShipmentType = (shipmentType: string): string => {
  const shipmentTypeMap: Record<string, string> = {
    Parcel: "PARCEL",
    Document: "DOCUMENT",
    Package: "PACKAGE",
  };
  return shipmentTypeMap[shipmentType] || "PARCEL";
};

// Helper function to map destination to shipping scope
const mapShippingScope = (destination: string): string => {
  const scopeMap: Record<string, string> = {
    Town: "TOWN",
    National: "NATIONAL",
    International: "INTERNATIONAL",
    Regional: "REGIONAL",
  };
  return scopeMap[destination] || "TOWN";
};

// Helper function to get primary category
const getPrimaryCategory = (categories: string[]): string => {
  if (categories.includes("Document")) return "DOCUMENT";
  if (categories.includes("Food Items")) return "FOOD";
  if (categories.includes("Electronics")) return "ELECTRONICS";
  if (categories.includes("Clothing")) return "CLOTHING";
  return "GENERAL";
};

export const transformFormDataToOrderRequest = (
  formData: PlaceOrderSchema,
  customerId: string,
  branchId: string = "cmgkctf9d0001jmdh7ex23gpf"
): CreateOrderRequest => {
  const pickupCoords = extractCoordinates(formData.pickupAddress);
  const deliveryCoords = extractCoordinates(formData.deliveryAddress);

  // Calculate pickup and delivery dates
  const now = new Date();
  const pickupDate = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 hours from now
  const deliveryDate = new Date(now.getTime() + 24 * 60 * 60 * 1000); // 24 hours from now

  return {
    customerId,
    serviceType: mapServiceType(formData.serviceType),
    branchId,
    fulfillmentType: mapFulfillmentType(formData.collectionType),
    weight: parseFloat(formData.weight) || 0,
    category: getPrimaryCategory(formData.categories),
    isFragile: formData.fragile,
    shipmentType: mapShipmentType(formData.shipmentType),
    shippingScope: mapShippingScope(formData.destination),
    length: parseFloat(formData.length || "0") || 0,
    width: parseFloat(formData.width || "0") || 0,
    height: parseFloat(formData.height || "0") || 0,
    pickupDate: pickupDate.toISOString(),
    pickupAddress: {
      label: "Pickup Location",
      addressLine: formData.pickupAddress,
      city: "Addis Ababa",
      state: "Addis Ketema",
      country: "Ethiopia",
      postalCode: "1000",
      lat: pickupCoords.lat,
      long: pickupCoords.long,
    },
    deliveryAddress: {
      label: "Delivery Location",
      addressLine: formData.deliveryAddress,
      city: "Addis Ababa",
      state: "Bole",
      country: "Ethiopia",
      postalCode: "1010",
      lat: deliveryCoords.lat,
      long: deliveryCoords.long,
    },
    deliveryDate: deliveryDate.toISOString(),
    isUnusual: formData.unusualItem || false,
    unusualReason: formData.unusualItem
      ? "Unusual item specified by customer"
      : "",
  };
};
