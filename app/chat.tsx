import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ChatItem {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  avatar: string;
  isOnline?: boolean;
}

export default function ChatScreen() {
  const insets = useSafeAreaInsets();

  const chatItems: ChatItem[] = [
    {
      id: "1",
      name: "Abel Mola",
      lastMessage: "Yes, it's on the way!",
      timestamp: "9:15 AM",
      avatar: "AM",
      isOnline: true,
    },
    {
      id: "2",
      name: "Hanna Marin",
      lastMessage: "Can't wait to see you!",
      timestamp: "Yesterday",
      avatar: "HM",
    },
    {
      id: "3",
      name: "Spencer Hastings",
      lastMessage: "Meeting at 3?",
      timestamp: "Monday",
      avatar: "SH",
    },
    {
      id: "4",
      name: "Emily Fields",
      lastMessage: "Lunch tomorrow?",
      timestamp: "Sunday",
      avatar: "EF",
    },
    {
      id: "5",
      name: "Alison DiLaurentis",
      lastMessage: "Miss you all!",
      timestamp: "Last week",
      avatar: "AD",
    },
  ];

  const renderChatItem = ({ item }: { item: ChatItem }) => (
    <TouchableOpacity
      onPress={() => {
        router.push("/chat-detail");
      }}
      className="flex-row items-center py-4 px-6 bg-white"
    >
      {/* Avatar */}
      <View className="relative mr-4">
        <View className="w-14 h-14 bg-gray-200 rounded-full items-center justify-center">
          <Text className="text-2xl">{item.avatar}</Text>
        </View>
        {item.isOnline && (
          <View className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        )}
      </View>

      {/* Content */}
      <View className="flex-1">
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-gray-900 font-bold text-base flex-1">
            {item.name}
          </Text>
          <Text className="text-gray-500 text-sm ml-2">{item.timestamp}</Text>
        </View>
        <Text className="text-gray-500 text-sm" numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderSeparator = () => <View className="h-[1px] bg-gray-200 mx-6" />;

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View
        className="px-6 py-4 bg-white"
        style={{ paddingTop: insets.top + 16 }}
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text className="text-black text-xl font-bold">Chat</Text>
          <TouchableOpacity className="p-2">
            <View className="w-8 h-8 bg-white rounded-full items-center justify-center">
              <Ionicons name="search" size={20} color="#1141AF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat List */}
      <FlatList
        data={chatItems}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        ItemSeparatorComponent={renderSeparator}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      />
    </View>
  );
}
