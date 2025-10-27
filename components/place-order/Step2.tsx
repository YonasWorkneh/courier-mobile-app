import {
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
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
  onSelectCategory: (categoryId: string) => void;
}

const destinations = [
  { label: "Town", value: "TOWN" },
  { label: "Regional", value: "REGIONAL" },
  { label: "International", value: "INTERNATIONAL" },
];

export const Step2: React.FC<Step2Props> = ({
  formData,
  errors,
  showDropdown,
  onFieldChange,
  onToggleDropdown,
  onSelectCategory,
}) => {
  const categoryOptions = [
    {
      id: "Document",
      icon: "document-text-outline",
      selected: formData.categories.includes("Document"),
    },
    {
      id: "Cakes, Flowers, Delicates",
      icon: "gift-outline",
      selected: formData.categories.includes("Cakes, Flowers, Delicates"),
    },
    {
      id: "Grocery",
      selected: formData.categories.includes("Grocery"),
      specialIcon: (
        <FontAwesome5
          name="shopping-cart"
          size={16}
          color={formData.categories.includes("Grocery") ? "#fff" : "#1141AF"}
        />
      ),
    },
    {
      id: "Medication",
      selected: formData.categories.includes("Medication"),
      specialIcon: (
        <MaterialIcons
          name="medical-services"
          size={16}
          color={
            formData.categories.includes("Medication") ? "#fff" : "#1141AF"
          }
        />
      ),
    },
    {
      id: "Clothes",
      icon: "shirt-outline",
      selected: formData.categories.includes("Clothes"),
    },
    {
      id: "Household items",
      specialIcon: (
        <MaterialCommunityIcons
          name="toolbox"
          size={24}
          color={
            formData.categories.includes("Household items") ? "#fff" : "#1141AF"
          }
        />
      ),
      selected: formData.categories.includes("Household items"),
    },
    {
      id: "Fashion items",
      specialIcon: (
        <View className="relative rounded-full items-center justify-center text-[#1141AF]">
          <MaterialCommunityIcons
            name="redhat"
            size={20}
            color={
              formData.categories.includes("Fashion items") ? "#fff" : "#1141AF"
            }
          />
          <MaterialCommunityIcons
            name="sunglasses"
            size={14}
            className="absolute -bottom-2 -right-0"
            color={
              formData.categories.includes("Fashion items") ? "#fff" : "#1141AF"
            }
          />
        </View>
      ),
      selected: formData.categories.includes("Fashion items"),
    },
    {
      id: "Food Items",
      specialIcon: (
        <MaterialIcons
          name="fastfood"
          size={24}
          color={
            formData.categories.includes("Food Items") ? "#fff" : "#1141AF"
          }
        />
      ),
      selected: formData.categories.includes("Food Items"),
    },

    {
      id: "E-Commerce",
      icon: "pricetag-outline",
      selected: formData.categories.includes("E-Commerce"),
    },

    {
      id: "Electronics",
      icon: "phone-portrait-outline",
      selected: formData.categories.includes("Electronics"),
    },
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
            onPress={() => onFieldChange("shipmentType", "PARCEL")}
            className={`flex-row gap-2 border rounded-xl p-4 !py-0 items-center justify-center ${
              formData.shipmentType === "PARCEL"
                ? "border-[#1141AF] bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
            activeOpacity={0.7}
          >
            <FontAwesome5 name="envelope" size={18} color="#1141AF" />
            <Text
              className={`font-semibold text-sm ${
                formData.shipmentType === "PARCEL"
                  ? "text-[#1141AF]"
                  : "text-gray-700"
              }`}
            >
              Parcel-Envelope
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onFieldChange("shipmentType", "COURIER")}
            className={`flex-1 flex-row gap-2 border rounded-xl p-4 py-6 items-center justify-center ${
              formData.shipmentType === "COURIER"
                ? "border-[#1141AF] bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
            activeOpacity={0.7}
          >
            <FontAwesome5 name="box-open" size={18} color="#1141AF" />
            <Text
              className={`font-semibold text-sm ${
                formData.shipmentType === "COURIER"
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
        value={
          formData.destination?.toLowerCase().charAt(0).toUpperCase() +
          formData.destination?.toLowerCase().slice(1)
        }
        placeholder="Town, National, International, Regional"
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
        onToggle={onSelectCategory}
      />
    </View>
  );
};
