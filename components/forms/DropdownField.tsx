import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface DropdownFieldProps {
  label: string;
  value: string;
  placeholder: string;
  icon: string;
  options: string[];
  error?: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
}

export const DropdownField: React.FC<DropdownFieldProps> = ({
  label,
  value,
  placeholder,
  icon,
  options,
  error,
  isOpen,
  onToggle,
  onSelect,
}) => {
  return (
    <View className="mb-6">
      <Text className="text-black font-semibold text-sm mb-2">{label}</Text>
      <TouchableOpacity
        onPress={onToggle}
        className={`bg-white border rounded-xl px-4 py-4 flex-row items-center ${
          error
            ? "border-red-500"
            : isOpen
              ? "border-[#1141AF]"
              : "border-gray-200"
        }`}
      >
        <Ionicons name={icon as any} size={20} color="#1141AF" />
        <Text
          className={`flex-1 ml-3 ${value ? "text-gray-900" : "text-gray-500"}`}
        >
          {value || placeholder}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="#9CA3AF"
        />
      </TouchableOpacity>

      {/* Dropdown Options */}
      {isOpen && (
        <View className="bg-white border border-gray-200 rounded-xl mt-1">
          {options.map((option, index) => (
            <TouchableOpacity
              key={option}
              onPress={() => onSelect(option)}
              className={`px-4 py-3 ${
                index !== options.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <Text className="text-gray-900">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};
