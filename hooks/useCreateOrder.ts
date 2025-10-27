import { useMutation } from "@tanstack/react-query";
import Toast from "react-native-toast-message";
import { createOrder } from "../lib/order";
import { CreateOrderRequest, CreateOrderResponse } from "../types/order";

export const useCreateOrder = () => {
  return useMutation<CreateOrderResponse, Error, CreateOrderRequest>({
    mutationFn: createOrder,
    onSuccess: (data, variables) => {
      // Create field summary for toast
      const fieldSummary = Object.keys(variables)
        .map((field) => `${field}: ${(variables as any)[field]}`)
        .join("\n");

      Toast.show({
        type: "success",
        text1: "Order created successfully",
        text2: fieldSummary,
        visibilityTime: 0, // Don't auto-close
      });
    },
    onError: (error) => {
      console.error("Failed to create order:", error);
      Toast.show({
        type: "error",
        text1: "Order Failed",
        text2: "Failed to create order. Please try again.",
        visibilityTime: 0, // Don't auto-close
      });
    },
  });
};
