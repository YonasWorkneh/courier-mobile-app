import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { FormData } from "../../types/place-order";
import { InputField } from "../forms/InputField";

interface Step4Props {
  formData: {
    name: string;
    email: string;
    phoneNumber: string;
    pickupAddress: string;
  };
  errors: {
    name?: string;
    email?: string;
    phoneNumber?: string;
    pickupAddress?: string;
  };
  focusedInput: string | null;
  onFieldChange: (field: keyof FormData, value: string | boolean) => void;
  onFocus: (field: string) => void;
  onBlur: () => void;
  onMapPress: () => void;
}

export const Step4: React.FC<Step4Props> = ({
  formData,
  errors,
  focusedInput,
  onFieldChange,
  onFocus,
  onBlur,
  onMapPress,
}) => {
  return (
    <View className="flex-1">
      {/* Sender Information Header */}
      <View className="mb-6">
        <Text className="text-black text-2xl font-bold">
          Sender Information
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          Please provide your contact details and pickup address
        </Text>
      </View>

      {/* Name */}
      <InputField
        label="Name"
        value={formData.name}
        placeholder="Sender Name"
        icon={<Ionicons name="person-outline" size={20} color="#1141AF" />}
        error={errors.name}
        focused={focusedInput === "name"}
        onChangeText={(text) => onFieldChange("name", text)}
        onFocus={() => onFocus("name")}
        onBlur={onBlur}
      />

      {/* Email */}
      <InputField
        label="Email"
        value={formData.email}
        placeholder="Sender Email"
        icon={<Ionicons name="mail-outline" size={20} color="#1141AF" />}
        keyboardType="email-address"
        error={errors.email}
        focused={focusedInput === "email"}
        onChangeText={(text) => onFieldChange("email", text)}
        onFocus={() => onFocus("email")}
        onBlur={onBlur}
      />

      {/* Phone Number */}
      <InputField
        label="Phone Number"
        value={formData.phoneNumber}
        placeholder="Sender Phone Number"
        icon={<Ionicons name="call-outline" size={20} color="#1141AF" />}
        keyboardType="phone-pad"
        error={errors.phoneNumber}
        focused={focusedInput === "phoneNumber"}
        onChangeText={(text) => onFieldChange("phoneNumber", text)}
        onFocus={() => onFocus("phoneNumber")}
        onBlur={onBlur}
      />

      {/* Pickup Address */}
      <InputField
        label="Pickup Address"
        value={formData.pickupAddress}
        placeholder="Search address"
        icon={<Ionicons name="location-outline" size={20} color="#1141AF" />}
        error={errors.pickupAddress}
        focused={focusedInput === "pickupAddress"}
        onChangeText={(text) => onFieldChange("pickupAddress", text)}
        onFocus={() => onFocus("pickupAddress")}
        onBlur={onBlur}
        rightButton={{
          text: "Map",
          icon: "map-outline",
          onPress: onMapPress,
        }}
      />
    </View>
  );
};
