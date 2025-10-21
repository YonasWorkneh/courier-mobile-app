import React from "react";
import { Image, Text, View } from "react-native";

export const PaymentConfirmation: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      {/* Success Icon */}
      <Image
        source={require("../../assets/images/success.png")}
        className="w-36 h-36 mb-8"
        resizeMode="contain"
      />

      {/* Confirmation Content */}
      <View className="items-center mb-8">
        <Text className="text-black text-2xl font-bold mb-4">
          Payment Completed
        </Text>

        <Text className="text-gray-600 text-base text-center mb-6">
          You have completed payment and you can proceed
        </Text>

        {/* QR Code */}
        <View className="w-32 h-32 rounded-lg items-center justify-center mb-6">
          <Image
            source={require("../../assets/images/qrsample.jpg")}
            className="w-40 h-40"
            resizeMode="contain"
          />
        </View>

        <View className="flex-row items-center mb-8">
          <Text className="text-gray-600 text-base">Your Track Number:</Text>
          <Text className="text-[#1141AF] text-base font-bold ml-2">
            #AB12345
          </Text>
        </View>
      </View>
    </View>
  );
};
