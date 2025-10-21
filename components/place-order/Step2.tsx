import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FormData } from "../../types/place-order";
import { CategorySelector } from "../forms/CategorySelector";
import { DropdownField } from "../forms/DropdownField";

interface Step2Props {
  formData: {
    shipmentType: string;
    destination: string;
    categories: string[];
  };
  errors: {
    destination?: string;
  };
  showDropdown: string | null;
  onFieldChange: (field: keyof FormData, value: string | boolean) => void;
  onToggleDropdown: (field: string) => void;
  onToggleCategory: (categoryId: string) => void;
}

const destinations = ["Town", "Regional", "International"];

export const Step2: React.FC<Step2Props> = ({
  formData,
  errors,
  showDropdown,
  onFieldChange,
  onToggleDropdown,
  onToggleCategory,
}) => {
  const categoryOptions = [
    {
      id: "Document",
      icon: "document-text-outline",
      selected: true,
    },
    {
      id: "Food Items",
      specialIcon: (
        <Image
          source={require("../../assets/images/food-box.png")}
          className="w-8 h-8"
          resizeMode="contain"
        />
      ),
      selected: true,
    },
    {
      id: "Grocery",
      selected: false,
      specialIcon: (
        <FontAwesome5 name="shopping-cart" size={18} color="#1141AF" />
      ),
    },
    {
      id: "Medication",
      selected: false,
      specialIcon: (
        <MaterialIcons name="medical-services" size={18} color="#1141AF" />
      ),
    },
    { id: "Electronics", icon: "phone-portrait-outline", selected: false },
    { id: "Cakes, Flowers, Delicates", icon: "gift-outline", selected: false },
    {
      id: "Household items",
      specialIcon: (
        <MaterialCommunityIcons name="toolbox" size={24} color="#1141AF" />
      ),
      selected: false,
    },
    {
      id: "Fashion items",
      specialIcon: (
        <View className="relative rounded-full items-center justify-center text-[#1141AF]">
          <MaterialCommunityIcons name="redhat" size={24} color="#1141AF" />
          <MaterialCommunityIcons
            name="sunglasses"
            size={15}
            color="#1141AF"
            className="absolute -bottom-2 -right-0"
          />
        </View>
      ),
      selected: false,
    },
    { id: "Clothes", icon: "shirt-outline", selected: false },
    { id: "E-Commerce", icon: "pricetag-outline", selected: false },
  ];
  return (
    <View className="flex-1">
      {/* Shipment Type */}
      <View className="mb-8">
        <Text className="text-black font-semibold text-sm mb-4">
          Shipment Type
        </Text>
        <View className="flex-1 flex-row gap-8">
          <TouchableOpacity
            onPress={() => onFieldChange("shipmentType", "Parcel")}
            className={`flex-row gap-2 border rounded-xl p-4 !py-0 items-center justify-center ${
              formData.shipmentType === "Parcel"
                ? "border-[#1141AF] bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <FontAwesome5 name="envelope" size={18} color="#1141AF" />
            <Text
              className={`font-semibold text-sm ${
                formData.shipmentType === "Parcel"
                  ? "text-[#1141AF]"
                  : "text-gray-700"
              }`}
            >
              Parcel-Envelope
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onFieldChange("shipmentType", "Courier")}
            className={`flex-1 flex-row gap-2 border rounded-xl p-4 py-6 items-center justify-center ${
              formData.shipmentType === "Courier"
                ? "border-[#1141AF] bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <FontAwesome5 name="box-open" size={18} color="#1141AF" />
            <Text
              className={`font-semibold text-sm ${
                formData.shipmentType === "Courier"
                  ? "text-[#1141AF]"
                  : "text-gray-700"
              }`}
            >
              Parcel- Box
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Destination */}
      <DropdownField
        label="Destination"
        value={formData.destination}
        placeholder="Town, Region, International"
        icon="location-outline"
        options={destinations}
        error={errors.destination}
        isOpen={showDropdown === "destination"}
        onToggle={() => onToggleDropdown("destination")}
        onSelect={(value) => onFieldChange("destination", value)}
      />

      {/* Categories */}
      <CategorySelector
        categories={categoryOptions}
        selectedCategories={formData.categories}
        onToggle={onToggleCategory}
      />
    </View>
  );
};
