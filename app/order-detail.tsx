import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import CancelOrderModal from "../components/cancel-order-modal";

const { height } = Dimensions.get("window");

export default function OrderDetailScreen() {
  const insets = useSafeAreaInsets();
  const webViewRef = useRef<WebView>(null);

  // Sheet height management
  const minHeight = 200;
  const maxHeight = height * 0.75;
  const [sheetHeight, setSheetHeight] = useState(height * 0.6);
  const translateY = useRef(new Animated.Value(0)).current;
  const [showCancelModal, setShowCancelModal] = useState(false);

  // Handle order cancellation
  const handleOrderCancellation = () => {
    // Handle order cancellation logic here
    console.log("Order cancelled");
    // You can add API call, navigation, or other logic here
  };

  // Gesture handling functions
  const onGestureEvent = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: false }
  );

  const onHandlerStateChange = (event: any) => {
    if (event.nativeEvent.oldState === 4) {
      // ACTIVE state
      const { translationY } = event.nativeEvent;
      const newHeight = sheetHeight - translationY;

      // Constrain height within bounds
      const constrainedHeight = Math.max(
        minHeight,
        Math.min(maxHeight, newHeight)
      );
      setSheetHeight(constrainedHeight);

      // Reset translateY for next gesture
      translateY.setValue(0);
    }
  };

  // Delivery progress data
  const deliveryStages = [
    { id: 1, name: "Piassa", status: "completed", time: "10:30 AM" },
    {
      id: 2,
      name: "Churchill Avenue Branch",
      status: "completed",
      time: "11:15 AM",
    },
    { id: 3, name: "Meskel Square", status: "completed", time: "12:00 PM" },
    { id: 4, name: "Denbel", status: "current", time: "12:45 PM" },
    {
      id: 5,
      name: "Bole Medhanilem",
      status: "pending",
      time: "Expected 1:30 PM",
    },
  ];

  // Map HTML with route and markers
  const mapHtml = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <title>Delivery Tracking Map</title>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <style>
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                overflow: hidden;
            }
            #map {
                height: 100vh;
                width: 100vw;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 1;
            }
            .delivery-route {
                color: #1141AF;
                weight: 6;
                opacity: 0.8;
            }
            .current-location {
                background: #1141AF;
                border: 3px solid white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
            }
            .completed-location {
                background: #1141AF;
                border: 3px solid white;
                border-radius: 50%;
                width: 16px;
                height: 16px;
            }
            .pending-location {
                background: #6B7280;
                border: 3px solid white;
                border-radius: 50%;
                width: 16px;
                height: 16px;
            }
            .custom-popup {
                font-size: 12px;
                font-weight: bold;
            }
        </style>
    </head>
    <body>
        <div id="map"></div>
        
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <script>
            // Initialize map centered on Addis Ababa
            const map = L.map('map').setView([9.0192, 38.7525], 12);
            
            // Add OpenStreetMap tiles
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Delivery route coordinates (simplified route through Addis Ababa)
            const routeCoordinates = [
                [9.0192, 38.7525], // Piassa (completed)
                [9.0180, 38.7540], // Churchill Avenue Branch (completed)
                [9.0170, 38.7560], // Meskel Square (completed)
                [9.0160, 38.7580], // Denbel (current location)
                [9.0150, 38.7600]  // Bole Medhanilem (destination)
            ];

            // Create route polyline
            const route = L.polyline(routeCoordinates, {
                color: '#1141AF',
                weight: 6,
                opacity: 0.8,
                className: 'delivery-route'
            }).addTo(map);

            // Add markers for each stage
            const locations = [
                { coords: [9.0192, 38.7525], name: 'Piassa', status: 'completed', time: '10:30 AM' },
                { coords: [9.0180, 38.7540], name: 'Churchill Avenue Branch', status: 'completed', time: '11:15 AM' },
                { coords: [9.0170, 38.7560], name: 'Meskel Square', status: 'completed', time: '12:00 PM' },
                { coords: [9.0160, 38.7580], name: 'Denbel', status: 'current', time: '12:45 PM' },
                { coords: [9.0150, 38.7600], name: 'Bole Medhanilem', status: 'pending', time: 'Expected 1:30 PM' }
            ];

            locations.forEach(location => {
                let marker;
                if (location.status === 'current') {
                    // Current location marker with arrow icon
                    const currentIcon = L.divIcon({
                        className: 'current-location',
                        html: '<div style="background: #1141AF; border: 3px solid white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;"><span style="color: white; font-size: 12px;">↓</span></div>',
                        iconSize: [20, 20],
                        iconAnchor: [10, 10]
                    });
                    marker = L.marker(location.coords, { icon: currentIcon });
                } else if (location.status === 'completed') {
                    // Completed location marker with checkmark
                    const completedIcon = L.divIcon({
                        className: 'completed-location',
                        html: '<div style="background: #1141AF; border: 3px solid white; border-radius: 50%; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center;"><span style="color: white; font-size: 10px;">✓</span></div>',
                        iconSize: [16, 16],
                        iconAnchor: [8, 8]
                    });
                    marker = L.marker(location.coords, { icon: completedIcon });
                } else {
                    // Pending location marker
                    const pendingIcon = L.divIcon({
                        className: 'pending-location',
                        html: '<div style="background: #6B7280; border: 3px solid white; border-radius: 50%; width: 16px; height: 16px;"></div>',
                        iconSize: [16, 16],
                        iconAnchor: [8, 8]
                    });
                    marker = L.marker(location.coords, { icon: pendingIcon });
                }

                marker.addTo(map).bindPopup(\`
                    <div class="custom-popup">
                        <strong>\${location.name}</strong><br>
                        Status: \${location.status}<br>
                        Time: \${location.time}
                    </div>
                \`);
            });

            // Fit map to show the entire route
            map.fitBounds(route.getBounds(), { padding: [20, 20] });
        </script>
    </body>
    </html>
  `;

  const renderProgressStage = (stage: any, index: number) => {
    const isLast = index === deliveryStages.length - 1;

    return (
      <View key={stage.id} className="flex-row items-start">
        {/* Timeline indicator */}
        <View className="items-center mr-4">
          {stage.status === "completed" ? (
            <View className="w-6 h-6 bg-[#1141AF] rounded-full items-center justify-center">
              <Ionicons name="checkmark" size={16} color="white" />
            </View>
          ) : stage.status === "current" ? (
            <View className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full items-center justify-center">
              <View className="w-3 h-3 bg-gray-400 rounded-full" />
            </View>
          ) : (
            <View className="w-6 h-6 bg-gray-100 rounded-full items-center justify-center">
              <Ionicons name="location" size={14} color="#6B7280" />
            </View>
          )}
          {!isLast && (
            <View
              className={`w-[1px] h-8 mt-2 ${
                stage.status === "completed" ? "bg-[#1141AF]" : "bg-gray-200"
              }`}
            />
          )}
        </View>

        {/* Stage details */}
        <View className="flex-1 pb-4">
          <Text className="text-gray-900 font-medium text-base">
            {stage.name}
          </Text>
          <Text className="text-gray-500 text-sm">{stage.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" />

        {/* Header */}
        <View
          className="bg-white flex-row items-center justify-between px-6 py-4 border-b border-gray-200"
          style={{ paddingTop: insets.top + 16 }}
        >
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <Ionicons name="arrow-back" size={24} color="#000000" />
          </TouchableOpacity>
          <Text className="text-black text-lg font-bold">Order #AB12345</Text>
          <View className="w-10" />
        </View>

        {/* Map */}
        <View className="flex-1">
          <WebView
            ref={webViewRef}
            source={{ html: mapHtml }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            scalesPageToFit={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            style={{ flex: 1 }}
            allowsInlineMediaPlayback={true}
            mediaPlaybackRequiresUserAction={false}
            mixedContentMode="compatibility"
            originWhitelist={["*"]}
          />
        </View>

        {/* Bottom Sheet */}
        <Animated.View
          className="absolute left-0 right-0 bg-white rounded-t-3xl"
          style={{
            height: sheetHeight,
            bottom: 0,
            transform: [{ translateY }],
          }}
        >
          <PanGestureHandler
            onGestureEvent={onGestureEvent}
            onHandlerStateChange={onHandlerStateChange}
          >
            <View className="w-full py-3 items-center">
              <View className="w-12 h-1 bg-gray-300 rounded-full" />
            </View>
          </PanGestureHandler>

          <ScrollView
            className="px-6 pb-6"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: insets.bottom + 20 }}
          >
            {/* Order Status */}
            <View className="flex-row items-center justify-between mb-4">
              <View className="flex-1">
                <Text className="text-black text-xl font-bold mb-1">
                  Your Package is on the way
                </Text>
                <Text className="text-gray-500 text-sm">
                  Arrive at pickup point in 5 minutes • 5 Km
                </Text>
              </View>
              <TouchableOpacity className="p-2">
                <Ionicons name="heart-outline" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Order Summary */}
            <TouchableOpacity className="bg-gray-50 rounded-xl p-4 mb-4">
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-black font-bold text-base">
                    Order #AB12345
                  </Text>
                  <Text className="text-gray-500 text-sm">5 KG • Banana</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </View>
            </TouchableOpacity>

            {/* Driver Info */}
            <View className="flex-row items-center mb-6">
              <Image
                source={{
                  uri: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
                }}
                className="w-12 h-12 rounded-full mr-4"
              />
              <View className="flex-1">
                <Text className="text-black font-bold text-base">
                  Abel Mola
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="star" size={16} color="#F59E0B" />
                  <Text className="text-gray-600 text-sm ml-1">4.1</Text>
                </View>
              </View>
              <TouchableOpacity className="w-10 h-10 bg-[#1141AF] rounded-full items-center justify-center mr-2">
                <Ionicons name="call" size={20} color="white" />
              </TouchableOpacity>
              <TouchableOpacity className="w-10 h-10 bg-[#1141AF] rounded-full items-center justify-center">
                <Ionicons name="chatbubble" size={20} color="white" />
              </TouchableOpacity>
            </View>

            {/* Delivery Progress */}
            <View className="mb-6">
              <Text className="text-black font-bold text-lg mb-4">
                Delivery Progress
              </Text>
              {deliveryStages.map((stage, index) =>
                renderProgressStage(stage, index)
              )}
            </View>

            {/* Cancel Order Button */}
            <TouchableOpacity
              className="bg-red-500 rounded-xl py-4 items-center"
              onPress={() => setShowCancelModal(true)}
            >
              <Text className="text-white font-bold text-lg">Cancel Order</Text>
            </TouchableOpacity>
          </ScrollView>
        </Animated.View>
      </View>

      {/* Cancel Order Modal */}
      <CancelOrderModal
        visible={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleOrderCancellation}
      />
    </GestureHandlerRootView>
  );
}
