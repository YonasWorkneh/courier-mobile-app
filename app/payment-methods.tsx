import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { PaymentMethods } from "../components/place-order/PaymentMethods";
import { useCreateOrder } from "../hooks/useCreateOrder";

export default function PaymentMethodsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedMethod, setSelectedMethod] = useState("CBE");
  const { orderData } = useLocalSearchParams();
  const createOrderMutation = useCreateOrder();

  const paymentMethods = [
    { id: "CBE", name: "CBE", icon: require("../assets/images/cbe.png") },
    {
      id: "Abyssinia",
      name: "Abyssinia",
      icon: require("../assets/images/abysnnia.png"),
    },
    {
      id: "Dashen",
      name: "Dashin",
      icon: require("../assets/images/dashen.png"),
    },
    {
      id: "Awash",
      name: "Awash",
      icon: require("../assets/images/awash.png"),
    },
    {
      id: "Telebirr",
      name: "Telebirr",
      icon: require("../assets/images/telebirr.png"),
    },
    {
      id: "Wallet",
      name: "Wallet (In-App Balance)",
      icon: require("../assets/images/wallet.png"),
    },
    {
      id: "COD",
      name: "Cash on Delivery (COD)",
      icon: require("../assets/images/cod.png"),
    },
  ];

  const handlePaymentComplete = async () => {
    try {
      if (!orderData) {
        Toast.show({
          type: "error",
          text1: "Order Data Missing",
          text2: "Please go back and try again.",
          visibilityTime: 0, // Don't auto-close
        });
        return;
      }

      // Parse the order data
      const orderRequest = JSON.parse(orderData as string);

      // Add payment method to order
      const orderWithPayment = {
        ...orderRequest,
        paymentMethod: selectedMethod,
      };

      // Create the order
      await createOrderMutation.mutateAsync(orderWithPayment);

      // Show success message
      Toast.show({
        type: "success",
        text1: "Order Created Successfully",
        text2: "Your order has been placed!",
      });

      // Navigate to confirmation
      router.push("/booking-confirmation");
    } catch (error) {
      console.error("Failed to create order:", error);
      Toast.show({
        type: "error",
        text1: "Order Failed",
        text2: "Failed to create order. Please try again.",
      });
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-6 py-4" style={{ paddingTop: insets.top + 16 }}>
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-black text-3xl font-bold">Payment Methods</Text>
          <View className="w-8 h-8" />
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-6">
        <PaymentMethods
          paymentMethods={paymentMethods}
          selectedMethod={selectedMethod}
          onSelect={setSelectedMethod}
        />
      </View>

      {/* Fixed Button */}
      <View
        className="px-6 pb-4 bg-white"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <TouchableOpacity
          onPress={handlePaymentComplete}
          className="bg-[#1141AF] rounded-2xl py-4"
          disabled={createOrderMutation.isPending}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center justify-center">
            {createOrderMutation.isPending && (
              <ActivityIndicator size="small" color="white" className="mr-2" />
            )}
            <Text className="text-white font-bold text-lg text-center">
              {createOrderMutation.isPending
                ? "Creating Order..."
                : "Proceed to Pay"}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
