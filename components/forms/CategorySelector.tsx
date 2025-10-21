import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface Category {
  id: string;
  icon?: string;
  specialIcon?: React.ReactNode;
  selected?: boolean;
}

interface CategorySelectorProps {
  categories: Category[];
  selectedCategories: string[];
  onToggle: (categoryId: string) => void;
}

export const CategorySelector: React.FC<CategorySelectorProps> = ({
  categories,
  selectedCategories,
  onToggle,
}) => {
  return (
    <View className="mb-8">
      <Text className="text-black font-semibold text-sm mb-4">Categories</Text>
      <View className="flex-row flex-wrap gap-3">
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => onToggle(category.id)}
            className={`border border-gray-200 rounded-full px-3 py-2 flex-row items-center ${
              selectedCategories.includes(category.id)
                ? "bg-[#1141AF]"
                : "bg-white !border-[#1141AF]"
            }`}
          >
            <View className="w-8 h-8 rounded-full items-center justify-center mr-3 text-blue-500">
              {category.specialIcon ? (
                category.specialIcon
              ) : (
                <Ionicons
                  name={category.icon as any}
                  size={16}
                  color={
                    selectedCategories.includes(category.id)
                      ? "#fff"
                      : "#1141AF"
                  }
                />
              )}
            </View>
            <Text
              className={`font-medium text-sm ${
                selectedCategories.includes(category.id)
                  ? "text-[#fff]"
                  : "text-gray-700"
              }`}
            >
              {category.id}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          onPress={() => onToggle("Other")}
          className={`border border-gray-200 rounded-full px-6 py-2 flex-row items-center ${
            selectedCategories.includes("Other")
              ? "bg-[#1141AF]"
              : "bg-white !border-[#1141AF]"
          }`}
        >
          <Text
            className={`font-medium text-sm ${
              selectedCategories.includes("Other")
                ? "text-[#fff]"
                : "text-gray-700"
            }`}
          >
            Other
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
