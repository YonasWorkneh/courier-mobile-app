import { FontAwesome5, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LogoutModal } from "../../components/logout-modal";
import { useAuth, useLogout } from "../../hooks/useAuth";

interface MenuItem {
  id: string;
  title: string;
  icon: string;
  iconType: "ionicons" | "fontawesome5" | "fontawesome6";
  onPress: () => void;
}

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const {
    logout,
    isLoading: isLoggingOut,
    isSuccess: logoutSuccess,
  } = useLogout();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Function to get user initials
  const getUserInitials = () => {
    if (!user?.name) return "U";
    return user.name
      .split(" ")
      .map((name: string) => name.charAt(0).toUpperCase())
      .slice(0, 2)
      .join("");
  };

  const handleLogout = () => {
    logout();
  };

  // Close modal and redirect to home when logout is successful
  React.useEffect(() => {
    if (logoutSuccess) {
      setShowLogoutModal(false);
      // Redirect to home tab after successful logout
      router.push("/(tabs)");
    }
  }, [logoutSuccess, router]);

  const menuItems: MenuItem[] = [
    {
      id: "settings",
      title: "Settings",
      icon: "settings-outline",
      iconType: "ionicons",
      onPress: () => {
        router.push("/settings");
      },
    },
    {
      id: "packages",
      title: "Received/Send package",
      icon: "cube-outline",
      iconType: "ionicons",
      onPress: () => {
        router.push("/package");
      },
    },
    {
      id: "feedback",
      title: "Feedback / Complain",
      icon: "document-text-outline",
      iconType: "ionicons",
      onPress: () => {
        // Navigate to feedback
        console.log("Feedback pressed");
      },
    },
    {
      id: "chat",
      title: "Chat",
      icon: "chatbubble-outline",
      iconType: "ionicons",
      onPress: () => {
        router.push("/chat");
      },
    },
    {
      id: "prizes",
      title: "Prize and Points",
      icon: "ribbon-outline",
      iconType: "ionicons",
      onPress: () => {
        // Navigate to prizes
        console.log("Prizes pressed");
      },
    },
    {
      id: "help",
      title: "Help & Support",
      icon: "help-circle-outline",
      iconType: "ionicons",
      onPress: () => {
        // Navigate to help
        console.log("Help pressed");
      },
    },
    {
      id: "logout",
      title: "Logout",
      icon: "log-out-outline",
      iconType: "ionicons",
      onPress: () => {
        setShowLogoutModal(true);
      },
    },
  ];

  const renderIcon = (item: MenuItem) => {
    const iconProps = {
      size: 24,
      color: item.id === "logout" ? "#EF4444" : "#1141AF",
    };

    switch (item.iconType) {
      case "ionicons":
        return <Ionicons name={item.icon as any} {...iconProps} />;
      case "fontawesome5":
        return <FontAwesome5 name={item.icon as any} {...iconProps} />;
      case "fontawesome6":
        return <FontAwesome6 name={item.icon as any} {...iconProps} />;
      default:
        return <Ionicons name={item.icon as any} {...iconProps} />;
    }
  };

  const renderMenuItem = (item: MenuItem, index: number) => (
    <TouchableOpacity
      key={item.id}
      onPress={item.onPress}
      className="flex-row items-center justify-between py-4 px-6"
    >
      <View className="flex-row items-center flex-1">
        <View className="w-8 h-8 items-center justify-center mr-4">
          {renderIcon(item)}
        </View>
        <Text
          className={`font-medium text-base flex-1 ${
            item.id === "logout" ? "text-red-500" : "text-gray-900"
          }`}
        >
          {item.title}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View
        className="px-6 py-4 bg-white"
        style={{ paddingTop: insets.top + 16 }}
      >
        <View className="flex-row items-center justify-between mb-8">
          <Text className="text-black text-3xl font-bold">Profile</Text>
          <TouchableOpacity className="p-2">
            <View className="w-8 h-8 bg-white rounded-full items-center justify-center">
              <Ionicons name="search" size={24} color="#1141AF" />
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
        {/* User Information Section */}
        <View className="items-center mb-8">
          {/* Avatar */}
          <View className="w-32 h-32 bg-[#1141AF] rounded-full items-center justify-center mb-4">
            {isAuthenticated && user?.name ? (
              <Text className="text-white font-bold text-4xl">
                {getUserInitials()}
              </Text>
            ) : (
              <Ionicons name="person" size={64} color="white" />
            )}
          </View>

          {/* Name */}
          <Text className="text-black text-2xl font-bold mb-2">
            {isAuthenticated && user?.name ? user.name : "Guest User"}
          </Text>

          {/* Email */}
          <Text className="text-gray-500 text-base mb-6">
            {isAuthenticated && user?.email ? user.email : "Not signed in"}
          </Text>

          {/* Edit Profile Button */}
          <TouchableOpacity
            onPress={() => {
              // Navigate to edit profile
              console.log("Edit Profile pressed");
            }}
            className="bg-[#1141AF] rounded-xl px-8 py-4"
          >
            <Text className="text-white font-bold text-base">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <View>
          {menuItems.map((item, index) => (
            <View key={item.id}>
              {renderMenuItem(item, index)}
              {index < menuItems.length - 1 && (
                <View className="h-[1px] bg-gray-200 mx-6" />
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Logout Modal */}
      <LogoutModal
        visible={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
        userName={user?.name}
        isLoading={isLoggingOut}
      />
    </View>
  );
}
