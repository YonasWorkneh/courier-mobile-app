import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface SavedOrder {
  id: string;
  orderNumber: string;
  status: string;
  date: string;
}

export default function SavedScreen() {
  const router = useRouter();

  const savedOrders: SavedOrder[] = [
    {
      id: "1",
      orderNumber: "Order #AB12345",
      status: "Cancelled",
      date: "Sept 30",
    },
    {
      id: "2",
      orderNumber: "Order #AB12346",
      status: "Cancelled",
      date: "Sept 30",
    },
    {
      id: "3",
      orderNumber: "Order #AB12347",
      status: "Pending",
      date: "Oct 1",
    },
    {
      id: "4",
      orderNumber: "Order #AB12348",
      status: "Shipped",
      date: "Oct 2",
    },
    {
      id: "5",
      orderNumber: "Order #AB12349",
      status: "Delivered",
      date: "Oct 3",
    },
    {
      id: "6",
      orderNumber: "Order #AB12350",
      status: "Processing",
      date: "Oct 4",
    },
  ];

  const renderOrderItem = ({ item }: { item: SavedOrder }) => (
    <TouchableOpacity
      className="bg-white rounded-2xl p-4 mb-3 border border-gray-200"
      onPress={() => router.push("/order-detail")}
    >
      <View className="flex-row items-center">
        {/* Heart Icon */}
        <View className="size-12 bg-blue-100 rounded-full items-center justify-center mb-3 mr-3">
          <FontAwesome6 name="check-circle" size={15} color="#1141AF" />
          <FontAwesome6 name="box-open" size={20} color="#1141AF" />
        </View>

        {/* Order Details */}
        <View className="flex-1">
          <Text className="text-black font-semibold text-md mb-1">
            {item.orderNumber}
          </Text>
          <Text className="text-gray-500 text-sm">
            {item.status} • {item.date}
          </Text>
        </View>

        {/* Arrow Icon */}
        <Ionicons name="chevron-forward" size={20} color="#6B7280" />
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="bg-white px-6 py-4 border-b border-gray-100">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          <Text className="text-black text-2xl font-bold">Saved</Text>

          <TouchableOpacity className="p-[8px] border border-gray-200 rounded-full">
            <Ionicons name="filter" size={24} color="#2456c9" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-6 pt-6">
        <FlatList
          data={savedOrders}
          renderItem={renderOrderItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
}
