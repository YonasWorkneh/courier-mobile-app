import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface SettingItem {
  id: string;
  title: string;
  icon: string;
  iconType: "ionicons";
  hasArrow?: boolean;
  hasToggle?: boolean;
  toggleValue?: boolean;
  onPress?: () => void;
  onToggle?: (value: boolean) => void;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const [pushNotifications, setPushNotifications] = useState(false);

  const settingSections: SettingSection[] = [
    {
      title: "App Preferences",
      items: [
        {
          id: "language",
          title: "Language",
          icon: "globe-outline",
          iconType: "ionicons",
          hasArrow: true,
          onPress: () => {
            // Navigate to language settings
            console.log("Language pressed");
          },
        },
        {
          id: "appearance",
          title: "Appearance / Theme",
          icon: "moon-outline",
          iconType: "ionicons",
          hasArrow: true,
          onPress: () => {
            // Navigate to appearance settings
            console.log("Appearance pressed");
          },
        },
        {
          id: "notifications",
          title: "Push Notifications",
          icon: "notifications-outline",
          iconType: "ionicons",
          hasToggle: true,
          toggleValue: pushNotifications,
          onToggle: setPushNotifications,
        },
      ],
    },
    {
      title: "Privacy & Security",
      items: [
        {
          id: "privacy",
          title: "Privacy Settings",
          icon: "shield-checkmark-outline",
          iconType: "ionicons",
          hasArrow: true,
          onPress: () => {
            // Navigate to privacy settings
            console.log("Privacy pressed");
          },
        },
        {
          id: "password",
          title: "Change Password",
          icon: "lock-closed-outline",
          iconType: "ionicons",
          hasArrow: true,
          onPress: () => {
            // Navigate to change password
            console.log("Change Password pressed");
          },
        },
      ],
    },
    {
      title: "Support & Legal",
      items: [
        {
          id: "help",
          title: "Help & Support",
          icon: "help-circle-outline",
          iconType: "ionicons",
          hasArrow: true,
          onPress: () => {
            // Navigate to help
            console.log("Help pressed");
          },
        },
        {
          id: "terms",
          title: "Terms & Conditions",
          icon: "document-text-outline",
          iconType: "ionicons",
          hasArrow: true,
          onPress: () => {
            // Navigate to terms
            console.log("Terms pressed");
          },
        },
        {
          id: "version",
          title: "App Version",
          icon: "layers-outline",
          iconType: "ionicons",
          hasArrow: true,
          onPress: () => {
            // Navigate to version info
            console.log("Version pressed");
          },
        },
      ],
    },
    {
      title: "Account Actions",
      items: [
        {
          id: "logout",
          title: "Logout",
          icon: "log-out-outline",
          iconType: "ionicons",
          hasArrow: true,
          onPress: () => {
            // Handle logout
            console.log("Logout pressed");
          },
        },
        {
          id: "delete",
          title: "Delete Account",
          icon: "person-remove-outline",
          iconType: "ionicons",
          hasArrow: true,
          onPress: () => {
            // Handle delete account
            console.log("Delete Account pressed");
          },
        },
      ],
    },
  ];

  const renderSettingItem = (item: SettingItem, isLast: boolean) => (
    <View key={item.id}>
      <TouchableOpacity
        onPress={item.onPress}
        className="flex-row items-center justify-between py-4 px-6"
        disabled={!item.hasArrow && !item.hasToggle}
      >
        <View className="flex-row items-center flex-1">
          <View className="w-8 h-8 items-center justify-center mr-4">
            <Ionicons name={item.icon as any} size={24} color="#1141AF" />
          </View>
          <Text className="text-gray-900 font-medium text-base flex-1">
            {item.title}
          </Text>
        </View>
        {item.hasToggle ? (
          <Switch
            value={item.toggleValue}
            onValueChange={item.onToggle}
            trackColor={{ false: "#E5E7EB", true: "#1141AF" }}
            thumbColor={item.toggleValue ? "#FFFFFF" : "#FFFFFF"}
          />
        ) : item.hasArrow ? (
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        ) : null}
      </TouchableOpacity>
      {!isLast && <View className="h-[1px] bg-gray-200 mx-6" />}
    </View>
  );

  const renderSection = (section: SettingSection, sectionIndex: number) => (
    <View key={section.title} className="mb-8">
      <Text className="text-gray-900 font-bold text-lg mb-4 px-6">
        {section.title}
      </Text>
      <View className="bg-white">
        {section.items.map((item, itemIndex) =>
          renderSettingItem(item, itemIndex === section.items.length - 1)
        )}
      </View>
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
        <View className="flex-row items-center justify-between">
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text className="text-black text-xl font-bold">Settings</Text>
          <TouchableOpacity className="p-2">
            <View className="w-8 h-8 bg-white rounded-full items-center justify-center">
              <Ionicons name="search" size={20} color="#1141AF" />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
      >
        <View className="px-6 pt-6">
          {settingSections.map((section, index) =>
            renderSection(section, index)
          )}
        </View>
      </ScrollView>
    </View>
  );
}
