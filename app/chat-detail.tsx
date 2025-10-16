import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface Message {
  id: string;
  text: string;
  isFromUser: boolean;
  timestamp: string;
  hasImage?: boolean;
  imageUrl?: string;
}

interface DateSeparator {
  id: string;
  type: "separator";
  date: string;
}

type ChatItem = Message | DateSeparator;

export default function ChatDetailScreen() {
  const insets = useSafeAreaInsets();
  const [messageText, setMessageText] = useState("");

  const chatData: ChatItem[] = [
    { id: "sep1", type: "separator", date: "Yesterday" },
    {
      id: "1",
      text: "Hey, have you checked the delivery status?",
      isFromUser: true,
      timestamp: "9:15 AM",
    },
    {
      id: "2",
      text: "Yes, it's on the way!",
      isFromUser: false,
      timestamp: "9:16 AM",
    },
    {
      id: "3",
      text: "Great! Let me know when it arrives.",
      isFromUser: true,
      timestamp: "9:17 AM",
    },
    {
      id: "4",
      text: "Sure thing!",
      isFromUser: false,
      timestamp: "9:18 AM",
    },
    { id: "sep2", type: "separator", date: "Today" },
    {
      id: "5",
      text: "",
      isFromUser: false,
      timestamp: "2:30 PM",
      hasImage: true,
      imageUrl:
        "https://via.placeholder.com/200x150/4A90E2/FFFFFF?text=Package+Delivery",
    },
    {
      id: "6",
      text: "Have you received it?",
      isFromUser: false,
      timestamp: "2:31 PM",
    },
    {
      id: "7",
      text: "Yeah. Thanks!",
      isFromUser: true,
      timestamp: "3:15 PM",
    },
  ];

  const renderDateSeparator = (date: string) => (
    <View className="flex-row items-center my-4">
      <View className="flex-1 h-[1px] bg-gray-300" />
      <Text className="mx-4 text-gray-500 text-sm font-medium">{date}</Text>
      <View className="flex-1 h-[1px] bg-gray-300" />
    </View>
  );

  const renderMessage = (message: Message) => (
    <View
      key={message.id}
      className={`flex-row items-end mb-2 px-4 ${
        message.isFromUser ? "justify-end" : "justify-start"
      }`}
    >
      <View
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          message.isFromUser ? "bg-[#1141AF] ml-12" : "bg-gray-200 mr-12"
        }`}
      >
        {message.hasImage && message.imageUrl ? (
          <Image
            source={{ uri: message.imageUrl }}
            className="w-48 h-36 rounded-lg mb-2"
            resizeMode="cover"
          />
        ) : (
          <Text
            className={`text-base ${
              message.isFromUser ? "text-white" : "text-gray-900"
            }`}
          >
            {message.text}
          </Text>
        )}
      </View>

      {/* Reaction Icon */}
      <View className="ml-2 mb-1">
        <Ionicons name="thumbs-up" size={16} color="#9CA3AF" />
      </View>
    </View>
  );

  const renderChatItem = ({ item }: { item: ChatItem }) => {
    if ("type" in item && item.type === "separator") {
      return renderDateSeparator(item.date);
    }
    return renderMessage(item as Message);
  };

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Handle sending message
      console.log("Sending message:", messageText);
      setMessageText("");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View
        className="px-6 py-4 bg-white border-b border-gray-200"
        style={{ paddingTop: insets.top + 16 }}
      >
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text className="text-black text-lg font-bold">Abel Mola</Text>
          <TouchableOpacity className="p-2">
            <View className="w-8 h-8 bg-gray-100 rounded-full items-center justify-center">
              <Ionicons name="call" size={20} color="#1141AF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={chatData}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 16,
          paddingBottom: insets.bottom + 100,
        }}
        style={{ flex: 1 }}
      />

      {/* Message Input */}
      <View
        className="px-4 py-3 bg-white border-t border-gray-200"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
          <TextInput
            placeholder="Type your message..."
            placeholderTextColor="#9CA3AF"
            value={messageText}
            onChangeText={setMessageText}
            className="flex-1 text-gray-900 text-base"
            multiline
          />
          <TouchableOpacity className="ml-3 mr-2">
            <Ionicons name="image" size={24} color="#1141AF" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSendMessage}>
            <Ionicons name="mic" size={24} color="#1141AF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
