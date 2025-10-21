import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { PaymentMethods } from "../components/place-order/PaymentMethods";

export default function PaymentMethodsScreen() {
  const insets = useSafeAreaInsets();
  const [selectedMethod, setSelectedMethod] = useState("CBE");

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

  const handlePaymentComplete = () => {
    router.push("/booking-confirmation");
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
        >
          <Text className="text-white font-bold text-lg text-center">
            Proceed to Pay
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
