import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TrackTab() {
  const [recentSearches, setRecentSearches] = useState([
    "#AB12345",
    "#AB12346",
    "#AB12347",
    "#AB12348",
    "#AB12349",
  ]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const removeSearchItem = (itemToRemove: string) => {
    setRecentSearches(recentSearches.filter((item) => item !== itemToRemove));
  };

  const clearAllSearches = () => {
    setRecentSearches([]);
  };

  const renderSearchItem = ({ item }: { item: string }) => (
    <View className="flex-row items-center justify-between">
      <Text className="text-gray-800 text-sm">{item}</Text>
      <TouchableOpacity className="p-1" onPress={() => removeSearchItem(item)}>
        <View className="w-5 h-5 bg-gray-300 rounded-full items-center justify-center">
          <Ionicons name="close" size={12} color="#6B7280" />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-6 py-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-black text-2xl font-bold">Track</Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="qr-code-outline" size={24} color="#1141AF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Input */}
      <View className="px-6 mb-6">
        <View
          className={`bg-white border rounded-xl px-4 py-3 flex-row items-center ${
            isSearchFocused ? "border-[#1141AF]" : "border-gray-200"
          }`}
        >
          <Ionicons name="search" size={20} color="#1141AF" />
          <TextInput
            placeholder="Enter Tracking Code"
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-3 text-gray-900"
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
        </View>
      </View>

      {recentSearches.length > 0 && (
        <View className="px-6 mb-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-black font-bold">Recent Seach</Text>
            <TouchableOpacity onPress={clearAllSearches}>
              <Text className="text-[#1141AF] font-semibold">Clear All</Text>
            </TouchableOpacity>
          </View>

          {recentSearches.length > 0 && (
            <FlatList
              data={recentSearches}
              renderItem={renderSearchItem}
              keyExtractor={(item: string) => item}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <View className="h-2" />}
            />
          )}
        </View>
      )}

      {/* Ongoing Order Card */}
      <View className="px-6 mb-6">
        <TouchableOpacity className="bg-white border border-blue-200 rounded-2xl p-4">
          <View className="flex-row items-center">
            <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center mr-4">
              <Ionicons name="time-outline" size={20} color="#1141AF" />
            </View>
            <View className="flex-1">
              <Text className="text-black font-bold text-lg">
                Order #AB12345
              </Text>
              <Text className="text-gray-500 text-sm">Ongoing • Sept 30</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#6B7280" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Empty Content Area */}
      <View className="flex-1" />
    </SafeAreaView>
  );
}
