import React from "react";
import { Image, Text, View } from "react-native";

export const BookingConfirmation: React.FC = () => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      {/* Success Icon - Wavy Blue Circle */}
      <Image
        source={require("../../assets/images/subtract.png")}
        className="w-32 h-32 mb-8"
        resizeMode="contain"
      />

      {/* Confirmation Content */}
      <View className="items-center mb-8">
        <Text className="text-black text-2xl font-bold mb-4">
          Booking Confirmation
        </Text>

        <Text className="text-gray-600 text-base text-center mb-2">
          Your delivery has been created successfully.
        </Text>

        <Text className="text-gray-600 text-base text-center mb-6">
          You gained 10 points
        </Text>

        <View className="flex-row items-center mb-8">
          <Text className="text-gray-600 text-base">Your Payment Code:</Text>
          <Text className="text-[#1141AF] text-base font-bold ml-2">
            #AB12345
          </Text>
        </View>
      </View>
    </View>
  );
};
