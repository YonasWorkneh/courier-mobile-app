import { Image } from "expo-image";
import React, { useState } from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface CourierOnboardingProps {
  onNext: () => void;
  onSkip: () => void;
  onBack: () => void;
}

export default function CourierOnboarding({
  onNext,
  onSkip,
  onBack,
}: CourierOnboardingProps) {
  const [currentPage, setCurrentPage] = useState(0);

  const onboardingData = [
    {
      title: "Fast & Reliable Delivery",
      description:
        "Choose local, regional, or international delivery with just a few taps.",
      image: require("../assets/images/mobile-truck.jpg"),
      imageStyle: { width: 350, height: 400 },
    },
    {
      title: "Real-Time Tracking",
      description:
        "Follow your delivery live on the map and get instant status updates.",
      image: require("../assets/images/delivery-running.png"),
      imageStyle: { width: 350, height: 400 },
    },
    {
      title: "Secure Delivery",
      description:
        "Telebirr, mobile banking, wallet and cash on proof of delivery with photo and signature",
      image: require("../assets/images/payment.jpg"),
      imageStyle: { width: 450, height: 400 },
    },
  ];

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onNext(); // Complete onboarding
    }
  };

  const handleBack = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    } else {
      onBack(); // Go back to welcome screen
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header with Back Button */}
      <View className="flex-row items-center px-6 pt-4">
        <TouchableOpacity onPress={handleBack} className="p-2">
          <View className="w-6 h-6">
            <View className="w-4 h-4 border-l-[3px] border-b-[3px] border-[var(--primary)] transform rotate-45" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View className="flex-1">
        {/* Main Illustration */}
        <View className="items-center justify-center flex-1">
          <Image
            source={onboardingData[currentPage].image}
            style={onboardingData[currentPage].imageStyle}
            contentFit="contain"
          />
        </View>

        {/* Text Content */}
        <View className="px-8 pb-8">
          <Text className="text-3xl font-bold text-black text-center mb-4">
            {onboardingData[currentPage].title}
          </Text>
          <Text className="text-lg text-gray-700 text-center mb-8 leading-6">
            {onboardingData[currentPage].description}
          </Text>

          {/* Page Indicators */}
          <View className="flex-row justify-center items-center mb-8">
            {onboardingData.map((_, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => setCurrentPage(index)}
                className={`mr-3 ${index === currentPage ? "w-8 h-3 bg-[var(--primary)]" : "w-3 h-3 bg-gray-300"} rounded-full`}
                activeOpacity={0.7}
              />
            ))}
          </View>

          {/* Action Buttons */}
          <View className="items-center">
            <TouchableOpacity
              onPress={handleNext}
              className="w-full bg-[var(--primary)] rounded-xl py-4 mb-4"
            >
              <Text className="text-white font-bold text-lg text-center">
                {currentPage === onboardingData.length - 1
                  ? "Get Started"
                  : "Next"}
              </Text>
            </TouchableOpacity>

            {currentPage !== onboardingData.length - 1 && (
              <TouchableOpacity onPress={onSkip}>
                <Text className="text-[var(--primary)] font-semibold text-base">
                  Skip
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
