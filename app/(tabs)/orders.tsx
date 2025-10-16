import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Order {
  id: string;
  orderNumber: string;
  status: "ongoing" | "delivered" | "cancelled";
  date: string;
}

export default function OrdersScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<
    "ongoing" | "delivered" | "cancelled"
  >("ongoing");

  const allOrders: Order[] = [
    {
      id: "1",
      orderNumber: "#AB12345",
      status: "ongoing",
      date: "Sept 30",
    },
    {
      id: "2",
      orderNumber: "#AB12346",
      status: "ongoing",
      date: "Oct 2",
    },
    {
      id: "3",
      orderNumber: "#AB12347",
      status: "ongoing",
      date: "Oct 1",
    },
    {
      id: "4",
      orderNumber: "#AB12348",
      status: "ongoing",
      date: "Oct 3",
    },
    {
      id: "5",
      orderNumber: "#AB12349",
      status: "ongoing",
      date: "Oct 4",
    },
    {
      id: "6",
      orderNumber: "#AB12350",
      status: "ongoing",
      date: "Oct 4",
    },
    {
      id: "7",
      orderNumber: "#AB12351",
      status: "delivered",
      date: "Sept 28",
    },
    {
      id: "8",
      orderNumber: "#AB12352",
      status: "delivered",
      date: "Sept 29",
    },
    {
      id: "9",
      orderNumber: "#AB12353",
      status: "cancelled",
      date: "Oct 1",
    },
  ];

  const filteredOrders = allOrders.filter(
    (order) => order.status === selectedFilter
  );

  const getStatusText = (status: string) => {
    switch (status) {
      case "ongoing":
        return "Ongoing";
      case "delivered":
        return "Delivered";
      case "cancelled":
        return "Cancelled";
      default:
        return "Unknown";
    }
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <TouchableOpacity
      onPress={() => {
        // Navigate to order details or tracking
        router.push(`/(tabs)/track`);
      }}
      className="bg-white rounded-xl p-4 mb-3 mx-6 border border-gray-200 flex-row items-center"
    >
      {/* Left Icon */}
      <View className="w-12 h-12 rounded-full items-center justify-center mr-4">
        <FontAwesome6 name="clock-rotate-left" size={20} color="#1141af" />
      </View>

      {/* Middle Content */}
      <View className="flex-1">
        <Text className="text-gray-900 font-bold text-base mb-1">
          Order {item.orderNumber}
        </Text>
        <Text className="text-gray-500 text-sm">
          {getStatusText(item.status)} • {item.date}
        </Text>
      </View>

      {/* Right Arrow */}
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  const renderSegmentedControl = () => (
    <View className="flex-row mx-6 mb-6 bg-gray-100 rounded-full p-2">
      {(["ongoing", "delivered", "cancelled"] as const).map((filter) => (
        <TouchableOpacity
          key={filter}
          onPress={() => setSelectedFilter(filter)}
          className={`flex-1 py-3 rounded-full ${
            selectedFilter === filter ? "bg-[#1141AF]" : "bg-transparent"
          }`}
        >
          <Text
            className={`text-center font-medium text-sm ${
              selectedFilter === filter ? "text-white" : "text-[#1141AF]"
            }`}
          >
            {getStatusText(filter)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View
        className="px-6 py-4 bg-white"
        style={{ paddingTop: insets.top + 16 }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <Text className="text-black text-2xl font-bold">Orders</Text>
          <TouchableOpacity className="p-[8px] border border-gray-200 rounded-full">
            <Ionicons name="filter" size={24} color="#2456c9" />
          </TouchableOpacity>
        </View>

        {/* Segmented Control */}
        {renderSegmentedControl()}
      </View>

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 24,
          paddingBottom: insets.bottom + 100,
        }}
        ListEmptyComponent={
          <View className="items-center justify-center py-12">
            <Ionicons name="receipt-outline" size={64} color="#9CA3AF" />
            <Text className="text-gray-500 text-lg font-medium mt-4">
              No {selectedFilter} orders
            </Text>
            <Text className="text-gray-400 text-sm text-center mt-2">
              Your {selectedFilter} orders will appear here
            </Text>
          </View>
        }
      />
    </View>
  );
}
