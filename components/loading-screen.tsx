import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoadingScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="dark" />
      <View className="flex-1 items-center justify-center px-6">
        {/* Logo Section - Upper portion of screen */}
        <View className="flex-1 items-center justify-center">
          {/* Logo Image */}
          <View className="items-center justify-center mb-6">
            <Image
              source={require("../assets/images/logo.png")}
              className="w-48 h-48"
              style={{ width: 500, height: 300 }}
              contentFit="contain"
            />
          </View>
        </View>

        {/* Loading Spinner - Lower portion */}
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      </View>
    </SafeAreaView>
  );
}
