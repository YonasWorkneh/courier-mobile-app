import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LeafletMap from "./leaflet-map";

interface MapSelectionProps {
  visible: boolean;
  onClose: () => void;
  onLocationSelect: (
    address: string,
    coordinates: { latitude: number; longitude: number }
  ) => void;
  title: string;
  initialLocation?: { latitude: number; longitude: number };
}

export default function MapSelection({
  visible,
  onClose,
  onLocationSelect,
  title,
  initialLocation = { latitude: 9.0192, longitude: 38.7525 }, // Addis Ababa default
}: MapSelectionProps) {
  const insets = useSafeAreaInsets();

  const handleLocationSelect = (
    latitude: number,
    longitude: number,
    address: string
  ) => {
    onLocationSelect(address, { latitude, longitude });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
    >
      <View className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View
          className="flex-row items-center justify-between px-6 py-4 bg-white border-b border-gray-200"
          style={{ paddingTop: insets.top + 16 }}
        >
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#000000" />
          </TouchableOpacity>
          <Text className="text-black text-lg font-bold">{title}</Text>
          <View className="w-6" />
        </View>

        {/* Leaflet Map */}
        <View className="flex-1 relative">
          <LeafletMap
            onLocationSelect={handleLocationSelect}
            initialLocation={initialLocation}
          />
        </View>
      </View>
    </Modal>
  );
}
