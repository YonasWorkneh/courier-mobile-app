import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";

interface OrderSummaryProps {
  formData: {
    pickupAddress: string;
    deliveryAddress: string;
    serviceType: string;
    collectionType: string;
    senderEntry: string;
    shipmentType: string;
    destination: string;
    categories: string[];
    fragile: boolean;
    quantity: string;
    weight: string;
    length?: string;
    width?: string;
    height?: string;
    name: string;
    receiverName: string;
  };
  
}

export const OrderSummary: React.FC<OrderSummaryProps> = ({ formData }) => {
  return (
    <View className="flex-1">
      {/* Pickup and Delivery Locations */}
      <View className="mb-6">
        <View className="flex-row items-start">
          {/* Visual Route */}
          <View className="items-center mr-4">
            <View className="w-4 h-4 border-2 border-[#1141AF] rounded-full" />
            <View className="w-[1px] h-8 border-l border-dashed border-gray-300 my-2" />
            <Ionicons name="location" size={20} color="#1141AF" />
          </View>

          {/* Location Names */}
          <View className="flex-1 gap-[32px]">
            <Text className="text-gray-900 text-sm font-medium mb-2">
              {formData.pickupAddress || "Piassa"}
            </Text>
            <Text className="text-gray-900 text-sm font-medium">
              {formData.deliveryAddress || "Bole Medhanilem"}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-gray-200 my-4" />
      </View>

      {/* Order Details */}
      <View className="flex gap-2">
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Created on</Text>
          <Text className="text-gray-900 font-medium">Oct 2, 2:15 PM</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Service Type</Text>
          <Text className="text-gray-900 font-medium">
            {formData.serviceType}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Courier Collection Type</Text>
          <Text className="text-gray-900 font-medium">
            {formData.collectionType}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Sender Entry</Text>
          <Text className="text-gray-900 font-medium">
            {formData.senderEntry}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Shipment Type</Text>
          <Text className="text-gray-900 font-medium">
            {formData.shipmentType}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Destination</Text>
          <Text className="text-gray-900 font-medium">
            {formData.destination}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Categories</Text>
          <Text className="text-gray-900 font-medium">
            {formData.categories?.join(", ")}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Fragile</Text>
          <Text className="text-gray-900 font-medium">
            {formData.fragile ? "Yes" : "No"}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Quantity</Text>
          <Text className="text-gray-900 font-medium">
            {formData.quantity || "0"}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Weight</Text>
          <Text className="text-gray-900 font-medium">
            {formData.weight || "0"} KG
          </Text>
        </View>

        {(formData.destination === "International" ||
          formData.destination === "Regional") && (
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">Dimensions</Text>
            <Text className="text-gray-900 font-medium">
              {formData.length || "0"} x {formData.width || "0"} x{" "}
              {formData.height || "0"} cm
            </Text>
          </View>
        )}

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Distance</Text>
          <Text className="text-gray-900 font-medium">5 Km</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Sender</Text>
          <Text className="text-gray-900 font-medium">{formData.name}</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Receiver</Text>
          <Text className="text-gray-900 font-medium">
            {formData.receiverName}
          </Text>
        </View>
      </View>

      {/* Pricing Breakdown */}
      <View className="mt-8 pt-4 border-t border-gray-200">
        {/* Base Price */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-600 text-base">Base Delivery Fee</Text>
          <Text className="text-gray-900 text-base font-medium">
            ETB 2,000.00
          </Text>
        </View>

        {/* VAT */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-600 text-base">VAT (15%)</Text>
          <Text className="text-gray-900 text-base font-medium">
            ETB 300.00
          </Text>
        </View>

        {/* Total */}
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-900 text-lg font-bold">Total</Text>
          <Text className="text-[#1141AF] text-lg font-bold">ETB 2,300.00</Text>
        </View>

        {/* VAT Note */}
        <View className="mt-2">
          <Text className="text-gray-500 text-xs text-center">
            *VAT included in total amount
          </Text>
        </View>
      </View>
    </View>
  );
};
