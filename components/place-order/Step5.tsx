import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import { FormData } from "../../types/place-order";
import { InputField } from "../forms/InputField";

interface Step5Props {
  formData: {
    receiverName: string;
    receiverEmail: string;
    receiverPhoneNumber: string;
    deliveryAddress: string;
  };
  errors: {
    receiverName?: string;
    receiverEmail?: string;
    receiverPhoneNumber?: string;
    deliveryAddress?: string;
  };
  focusedInput: string | null;
  onFieldChange: (field: keyof FormData, value: string | boolean) => void;
  onFocus: (field: string) => void;
  onBlur: () => void;
  onMapPress: () => void;
}

export const Step5: React.FC<Step5Props> = ({
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
      {/* Receiver Information Header */}
      <View className="mb-6">
        <Text className="text-black text-2xl font-bold">
          Receiver Information
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          Please provide the receiver&apos;s contact details and delivery
          address
        </Text>
      </View>

      {/* Receiver Name */}
      <InputField
        label="Name"
        value={formData.receiverName}
        placeholder="Receiver Name"
        icon={<Ionicons name="person-outline" size={20} color="#1141AF" />}
        error={errors.receiverName}
        focused={focusedInput === "receiverName"}
        onChangeText={(text) => onFieldChange("receiverName", text)}
        onFocus={() => onFocus("receiverName")}
        onBlur={onBlur}
      />

      {/* Receiver Email */}
      <InputField
        label="Email"
        value={formData.receiverEmail}
        placeholder="Receiver Email"
        icon={<Ionicons name="mail-outline" size={20} color="#1141AF" />}
        keyboardType="email-address"
        error={errors.receiverEmail}
        focused={focusedInput === "receiverEmail"}
        onChangeText={(text) => onFieldChange("receiverEmail", text)}
        onFocus={() => onFocus("receiverEmail")}
        onBlur={onBlur}
      />

      {/* Receiver Phone Number */}
      <InputField
        label="Phone Number"
        value={formData.receiverPhoneNumber}
        placeholder="Receiver Phone Number"
        icon={<Ionicons name="call-outline" size={20} color="#1141AF" />}
        keyboardType="phone-pad"
        error={errors.receiverPhoneNumber}
        focused={focusedInput === "receiverPhoneNumber"}
        onChangeText={(text) => onFieldChange("receiverPhoneNumber", text)}
        onFocus={() => onFocus("receiverPhoneNumber")}
        onBlur={onBlur}
      />

      {/* Delivery Address */}
      <InputField
        label="Delivery Address"
        value={formData.deliveryAddress}
        placeholder="Search address"
        icon={<Ionicons name="location-outline" size={20} color="#1141AF" />}
        error={errors.deliveryAddress}
        focused={focusedInput === "deliveryAddress"}
        onChangeText={(text) => onFieldChange("deliveryAddress", text)}
        onFocus={() => onFocus("deliveryAddress")}
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
