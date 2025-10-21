import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

interface PaymentMethod {
  id: string;
  name: string;
  icon: any;
}

interface PaymentMethodsProps {
  paymentMethods: PaymentMethod[];
  selectedMethod: string;
  onSelect: (methodId: string) => void;
}

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  paymentMethods,
  selectedMethod,
  onSelect,
}) => {
  return (
    <View className="flex-1">
      <Text className="text-black font-bold text-lg mb-6">Payment method</Text>

      <View className="space-y-4">
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            onPress={() => onSelect(method.id)}
            className="flex-row items-center justify-between py-4"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 rounded-full items-center justify-center mr-4 bg-gray-50">
                <Image
                  source={method.icon}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-gray-900 font-medium text-base">
                {method.name}
              </Text>
            </View>

            <View
              className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                selectedMethod === method.id
                  ? "border-[#1141AF] bg-[#1141AF]"
                  : "border-gray-300"
              }`}
            >
              {selectedMethod === method.id && (
                <View className="w-2 h-2 rounded-full bg-white" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};
