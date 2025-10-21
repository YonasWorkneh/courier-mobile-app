import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onToggle: () => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  checked,
  onToggle,
}) => {
  return (
    <TouchableOpacity onPress={onToggle} className="flex-row items-center mb-4">
      <View
        className={`w-6 h-6 border-2 rounded items-center justify-center mr-3 ${
          checked
            ? "bg-[#1141AF] border-[#1141AF]"
            : "border-[#1141AF] bg-white"
        }`}
      >
        {checked && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
      <Text className="text-black font-medium text-base">{label}</Text>
    </TouchableOpacity>
  );
};
