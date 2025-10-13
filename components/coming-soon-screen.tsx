import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ComingSoonScreenProps {
  onBack: () => void;
}

export default function ComingSoonScreen({ onBack }: ComingSoonScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Main Content */}
      <View className="flex-1 items-center justify-center px-8">
        {/* Clock Icon */}
        <FontAwesome5 name="clock" size={48} color="blue" className="mb-20 text-blue-600" />
        {/* Title */}
        <Text className="text-3xl font-bold text-black text-center mb-4">
          Coming Soon!
        </Text>

        {/* Description */}
        <Text className="text-lg text-gray-700 text-center mb-12 leading-6">
          We&apos;re working hard to bring you convenient food delivery and ride
          options. Stay tuned!
        </Text>
      </View>

      {/* Back Button */}
      <View className="px-8 pb-8">
        <TouchableOpacity
          onPress={onBack}
          className="w-full bg-blue-600 rounded-xl py-4"
        >
          <Text className="text-white font-bold text-lg text-center">Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
