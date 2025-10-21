export interface FormData {
  serviceType: string;
  collectionType: string;
  senderEntry: string;
  shipmentType: string;
  destination: string;
  categories: string[];
  quantity: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  fragile: boolean;
  unusualItem: boolean;
  name: string;
  email: string;
  phoneNumber: string;
  pickupAddress: string;
  receiverName: string;
  receiverEmail: string;
  receiverPhoneNumber: string;
  deliveryAddress: string;
  paymentMethod: string;
}
