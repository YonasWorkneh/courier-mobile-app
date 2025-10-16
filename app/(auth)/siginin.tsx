import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

interface RegisterScreenProps {
  onBack: () => void;
  onSignUp: () => void;
}

export default function RegisterScreen({
  onBack,
  onSignUp,
}: RegisterScreenProps) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const handleSignUp = () => {
    // Add validation logic here
    onSignUp();
  };

  return (
    <View className="flex-1 bg-[#1141AF] pt-10">
      <StatusBar barStyle="light-content" />
      {/* Header with Background Image and Gradient */}
      <View className="h-60 mb-10">
        {/* Background Image */}
        <View className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <Image
            source={require("@/assets/images/bg.png")}
            style={{
              width: 300,
              height: 200,
            }}
          />
        </View>
        <View className="absolute top-0 left-0 right-0 bottom-0 bg-[#1141AF] opacity-75" />

        {/* Content */}
        <View className="px-6 pt-4 pb-8 relative z-10 h-full justify-between">
          {/* Back Button */}
          <TouchableOpacity onPress={onBack}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>

          {/* Title and Subtitle */}
          <View>
            <Text className="text-white text-4xl font-bold mb-2">Sign In</Text>
            <Text className="text-white/80 text-lg">Welcome back</Text>
          </View>
        </View>
      </View>

      {/* Content Form */}
      <ScrollView
        className="flex-1 bg-white rounded-t-[2rem] mt-[-20px]"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-8 pb-8">
          {/* Email Input */}
          <View className="mb-6">
            <Text className="text-black font-semibold text-base mb-2">
              Email
            </Text>
            <View
              className={`bg-white border rounded-xl px-4 py-3 flex-row items-center ${
                focusedInput === "email"
                  ? "border-[#1141AF]"
                  : "border-gray-200"
              }`}
            >
              <Ionicons name="mail-outline" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="Enter Email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 ml-3 text-gray-900"
              />
            </View>
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-black font-semibold text-base mb-2">
              Password
            </Text>
            <View
              className={`bg-white border rounded-xl px-4 py-3 flex-row items-center ${
                focusedInput === "password"
                  ? "border-[#1141AF]"
                  : "border-gray-200"
              }`}
            >
              <Ionicons name="lock-closed-outline" size={20} color="#9CA3AF" />
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={setPassword}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
                secureTextEntry
                className="flex-1 ml-3 text-gray-900"
              />
            </View>
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            className="bg-[#1141AF] rounded-xl py-4 mb-6"
            disabled={!agreeToTerms}
            style={{ opacity: agreeToTerms ? 1 : 0.5 }}
          >
            <Text className="text-white font-bold text-lg text-center">
              Sign In
            </Text>
          </TouchableOpacity>

          {/* Social Login Separator */}
          <View className="flex-row items-center mb-6">
            <View className="flex-1 h-px bg-gray-200" />
            <Text className="mx-4 text-gray-500 font-medium">Or</Text>
            <View className="flex-1 h-px bg-gray-200" />
          </View>

          {/* Social Login Buttons */}
          <View className="flex-row justify-center gap-4">
            <TouchableOpacity className="w-14 h-14 bg-white border border-gray-200 rounded-full items-center justify-center">
              <Image
                source={require("@/assets/images/google.png")}
                className="w-8 h-8"
                style={{ width: 28, height: 28 }}
              />
            </TouchableOpacity>

            <TouchableOpacity className="w-14 h-14 bg-white border border-gray-200 rounded-full items-center justify-center">
              <Ionicons name="logo-apple" size={28} color="black" />
            </TouchableOpacity>

            <TouchableOpacity className="w-14 h-14 bg-white border border-gray-200 rounded-full items-center justify-center">
              <View className="w-8 h-8 bg-blue-600 rounded-full items-center justify-center">
                <Text className="text-white font-bold text-[24px]">f</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
