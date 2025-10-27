export interface Address {
  label: string;
  addressLine: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  lat: string;
  long: string;
}

export interface CreateOrderRequest {
  customerId: string;
  serviceType: string;
  branchId: string;
  fulfillmentType: string;
  weight: number;
  category: string;
  isFragile: boolean;
  shipmentType: string;
  shippingScope: string;
  length: number;
  width: number;
  height: number;
  pickupDate: string;
  pickupAddress: Address;
  deliveryAddress: Address;
  deliveryDate: string;
  isUnusual: boolean;
  unusualReason: string;
}

export interface CreateOrderResponse {
  id: string;
  status: string;
  trackingNumber: string;
  // Add other response fields as needed
}
