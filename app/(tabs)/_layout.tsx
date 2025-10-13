import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#1141AF",
          tabBarInactiveTintColor: "#6B7280",
          tabBarStyle: {
            backgroundColor: "white",
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
            borderTopWidth: 1,
            borderTopColor: "#E5E7EB",
            position: "relative",
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "500",
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="track"
          options={{
            title: "Track",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="order"
          options={{
            title: "Order",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Floating Action Button */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          marginLeft: -30,
          width: 60,
          height: 60,
          backgroundColor: "#1141AF",
          borderRadius: 30,
          alignItems: "center",
          justifyContent: "center",
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}
      >
        <Ionicons name="add" size={32} color="white" />
      </TouchableOpacity>
    </View>
  );
}
