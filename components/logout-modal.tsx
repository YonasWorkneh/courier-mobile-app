import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface LogoutModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName?: string;
  isLoading?: boolean;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  visible,
  onClose,
  onConfirm,
  userName,
  isLoading = false,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={isLoading ? undefined : onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center px-6">
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
          {/* Header */}
          <View className="items-center mb-6">
            <View className="w-16 h-16 bg-red-100 rounded-full items-center justify-center mb-4">
              <Ionicons name="log-out-outline" size={32} color="#EF4444" />
            </View>
            <Text className="text-black text-xl font-bold text-center">
              Logout
            </Text>
            <Text className="text-gray-600 text-base text-center mt-2">
              {userName
                ? `Are you sure you want to logout, ${userName}?`
                : "Are you sure you want to logout?"}
            </Text>
          </View>

          {/* Buttons */}
          <View className="flex-row gap-4">
            <TouchableOpacity
              onPress={onClose}
              disabled={isLoading}
              className={`flex-1 rounded-xl py-4 ${
                isLoading ? "bg-gray-200" : "bg-gray-100"
              }`}
            >
              <Text
                className={`font-semibold text-center ${
                  isLoading ? "text-gray-400" : "text-gray-700"
                }`}
              >
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onConfirm}
              disabled={isLoading}
              className={`flex-1 rounded-xl py-4 ${
                isLoading ? "bg-red-300" : "bg-red-500"
              }`}
            >
              {isLoading ? (
                <View className="flex-row items-center justify-center">
                  <ActivityIndicator size="small" color="white" />
                  <Text className="text-white font-semibold ml-2">
                    Logging out...
                  </Text>
                </View>
              ) : (
                <Text className="text-white font-semibold text-center">
                  Logout
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
