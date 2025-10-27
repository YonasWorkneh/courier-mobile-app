import { FontAwesome6, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";
import { useAuthState } from "../../hooks/useAuthState";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabLayout() {
  const router = useRouter();
  const { isAuthenticated } = useAuthState();

  return (
    <View className="flex-1 bg-white">
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
        onPress={() =>
          router.push(isAuthenticated ? "/place-order" : "/login-to-order")
        }
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
        <Image
          source={require("../../assets/images/gps.png")}
          className="w-10 h-10 absolute top-0 left-0 z-10"
          contentFit="contain"
          style={{ width: 20, height: 20 }}
        />
        <FontAwesome6 name="box-open" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}
