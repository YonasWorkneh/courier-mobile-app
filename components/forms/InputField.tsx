import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

interface InputFieldProps {
  label: string;
  value: string;
  placeholder: string;
  icon: string | React.ReactNode;
  keyboardType?: any;
  error?: string;
  focused?: boolean;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  rightButton?: {
    text: string;
    icon: string;
    onPress: () => void;
  };
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  placeholder,
  icon,
  keyboardType = "default",
  error,
  focused = false,
  onChangeText,
  onFocus,
  onBlur,
  rightButton,
}) => {
  return (
    <View className="mb-4">
      <Text className="text-black font-semibold text-sm mb-2">{label}</Text>
      <View
        className={`bg-white border rounded-xl px-4 py-3 flex-row items-center ${
          error
            ? "border-red-500"
            : focused
              ? "border-[#1141AF]"
              : "border-gray-200"
        }`}
      >
        {typeof icon === "string" ? (
          <Ionicons name={icon as any} size={20} color="#1141AF" />
        ) : (
          icon
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={value}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType={keyboardType}
          className="flex-1 ml-3 text-gray-900"
        />
        {rightButton && (
          <TouchableOpacity
            onPress={rightButton.onPress}
            className="flex-row items-center bg-[#1141AF] px-3 py-2 rounded-lg ml-2"
            activeOpacity={0.8}
          >
            <Ionicons name={rightButton.icon as any} size={16} color="white" />
            <Text className="text-white text-xs font-medium ml-1">
              {rightButton.text}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};
