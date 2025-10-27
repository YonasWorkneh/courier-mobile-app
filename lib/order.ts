import { CreateOrderRequest, CreateOrderResponse } from "../types/order";
import api from "./api";

// Order API functions
export const createOrder = async (
  orderData: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  const response = await api.post("/order", orderData);
  return response.data;
};
