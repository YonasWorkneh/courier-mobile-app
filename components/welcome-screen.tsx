import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface WelcomeScreenProps {
  onServiceSelect: (service: "courier" | "food-delivery") => void;
}

export default function WelcomeScreen({ onServiceSelect }: WelcomeScreenProps) {
  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      <StatusBar barStyle="dark-content" />

      {/* Welcome Header */}
      <View className="items-center mt-10">
        <Text className="text-3xl font-bold text-[var(--primary)] mb-2">
          Welcome
        </Text>
        <Text className="text-gray-700 text-center mb-4 text-xl mt-2">
          Fast, secure, and reliable parcel delivery
        </Text>
        <Text className="text-base text-gray-700 text-center font-bold mt-4">
          Please choose the service you want.
        </Text>
      </View>

      {/* Service Selection Cards */}
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          marginTop: 40,
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Courier Service Card */}

        <TouchableOpacity
          className="bg-white rounded-2xl shadow-md shadow-black/10 mx-2.5"
          onPress={() => onServiceSelect("courier")}
          activeOpacity={0.8}
        >
          <ImageBackground
            source={require("../assets/images/delivery-man.png")}
            className="w-full h-60 rounded-2xl overflow-hidden"
            resizeMode="contain" // "cover" ensures it fills the container
          >
            {/* You can overlay content on top */}
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                paddingTop: 40,
                paddingBottom: 16,
                paddingHorizontal: 16,
              }}
            >
              <Text className="text-white font-extrabold text-2xl">
                Courier Service
              </Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>

        {/* Food Delivery & Ride Service Card */}
        <TouchableOpacity
          className="bg-white rounded-2xl shadow-md shadow-black/10 mx-2.5"
          onPress={() => onServiceSelect("food-delivery")}
          activeOpacity={0.8}
        >
          <ImageBackground
            source={require("../assets/images/food-delivery.jpg")}
            className="w-full h-60 rounded-2xl overflow-hidden relative"
            resizeMode="contain"
          >
            <LinearGradient
              colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)"]}
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                paddingTop: 40,
                paddingBottom: 16,
                paddingHorizontal: 16,
              }}
            >
              <Text className="text-white font-extrabold text-2xl">
                Food Delivery & Ride Service
              </Text>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
