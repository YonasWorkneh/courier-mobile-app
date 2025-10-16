import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const router = useRouter();

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
              <MaterialIcons name="gps-fixed" size={24} color={color} />
            ),
          }}
        />

        {/* Placeholder for center floating button */}
        <Tabs.Screen
          name="placeholder"
          options={{
            title: "Order",
            tabBarButton: () => <View />,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
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
          name="orders"
          options={{
            title: "Orders",
            tabBarIcon: ({ color, size }) => (
              <Ionicons
                name="document-text-outline"
                size={size}
                color={color}
              />
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
        onPress={() => router.push("/place-order")}
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
        <Ionicons name="archive-outline" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
