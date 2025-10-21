import React from "react";
import { Text, View } from "react-native";

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps?: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps = 5,
}) => {
  return (
    <View className="flex-row items-center justify-center mb-8">
      {Array.from({ length: totalSteps }, (_, index) => {
        const step = index + 1;
        return (
          <View key={step} className="flex-row items-center">
            <View
              className={`w-8 h-8 rounded-full items-center justify-center ${
                step <= currentStep ? "bg-[#1141AF]" : "bg-gray-200"
              }`}
            >
              <Text
                className={`font-bold text-sm ${
                  step <= currentStep ? "text-white" : "text-gray-500"
                }`}
              >
                {step}
              </Text>
            </View>
            {index < totalSteps - 1 && (
              <View
                className={`w-8 h-[1px] mx-2 ${
                  step < currentStep ? "bg-[#1141AF]" : "bg-gray-200"
                }`}
              />
            )}
          </View>
        );
      })}
    </View>
  );
};
