import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface CancelOrderModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  warningMessage?: string;
  confirmationQuestion?: string;
  yesButtonText?: string;
  noButtonText?: string;
}

export default function CancelOrderModal({
  visible,
  onClose,
  onConfirm,
  title = "Cancel Order",
  warningMessage = "The order will be canceled but you won't get you fund back.",
  confirmationQuestion = "Are you sure you want to cancel the order?",
  yesButtonText = "Yes",
  noButtonText = "No",
}: CancelOrderModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 items-center justify-center px-6">
        <View className="bg-white rounded-2xl w-full max-w-sm">
          {/* Modal Header */}
          <View className="flex-row items-center justify-between p-6 pb-4">
            <Text className="text-black text-xl font-bold">{title}</Text>
            <TouchableOpacity
              onPress={onClose}
              className="w-8 h-8 items-center justify-center"
            >
              <Ionicons name="close" size={24} color="#1141AF" />
            </TouchableOpacity>
          </View>

          {/* Modal Content */}
          <View className="px-6 pb-6">
            {/* Warning Message */}
            <Text className="text-red-500 text-sm mb-4 leading-5">
              {warningMessage}{" "}
              <Text className="text-[#1141AF] underline">Read More</Text>
            </Text>

            {/* Confirmation Question */}
            <Text className="text-black text-base mb-6">
              {confirmationQuestion}
            </Text>

            {/* Action Buttons */}
            <View className="flex gap-4">
              {/* Yes Button */}
              <TouchableOpacity
                className="bg-[#1141AF] rounded-xl py-4 items-center"
                onPress={handleConfirm}
              >
                <Text className="text-white font-bold">
                  {yesButtonText}
                </Text>
              </TouchableOpacity>

              {/* No Button */}
              <TouchableOpacity
                className="bg-white border-2 border-[#1141AF] rounded-xl py-4 items-center"
                onPress={onClose}
              >
                <Text className="text-[#1141AF] font-bold">
                  {noButtonText}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
