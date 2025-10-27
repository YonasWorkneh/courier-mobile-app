import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useLogin } from "../../hooks/useAuth";

export default function SignInScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const router = useRouter();

  const { login, isLoading, error, isSuccess } = useLogin();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email?.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password?.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = () => {
    if (!validateForm()) {
      return;
    }

    // Clear any existing errors before attempting login
    setErrors({});
    login({ email: email.trim(), password });
  };

  useEffect(() => {
    if (isSuccess) {
      Toast.show({
        type: "success",
        text1: "Login Successful",
        text2: "Welcome back!",
      });
      // Navigate to main app after successful login
      router.replace("/(tabs)");
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (error) {
      const errorMessage =
        error.message || "Invalid credentials. Please try again.";

      // Set field-specific errors if available
      if (error.message) {
        if (error.message.toLowerCase().includes("email")) {
          setErrors({ email: error.message });
        } else if (error.message.toLowerCase().includes("password")) {
          setErrors({ password: error.message });
        } else {
          setErrors({ email: error.message });
        }
      }

      Toast.show({
        type: "error",
        text1: "Login Failed",
        text2: errorMessage,
      });
    }
  }, [error]);

  // Clear errors when user starts typing
  useEffect(() => {
    if (email && errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  }, [email, errors.email]);

  useEffect(() => {
    if (password && errors.password) {
      setErrors((prev) => ({ ...prev, password: undefined }));
    }
  }, [password, errors.password]);

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
          <TouchableOpacity onPress={() => router.back()}>
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
                errors.email
                  ? "border-red-500"
                  : focusedInput === "email"
                    ? "border-[#1141AF]"
                    : "border-gray-200"
              }`}
            >
              <Ionicons
                name="mail-outline"
                size={20}
                color={errors.email ? "#EF4444" : "#9CA3AF"}
              />
              <TextInput
                placeholder="Enter Email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) {
                    setErrors((prev) => ({ ...prev, email: undefined }));
                  }
                }}
                onFocus={() => setFocusedInput("email")}
                onBlur={() => setFocusedInput(null)}
                keyboardType="email-address"
                autoCapitalize="none"
                className="flex-1 ml-3 text-gray-900"
              />
            </View>
            {errors.email && (
              <Text className="text-red-500 text-sm mt-1 ml-1">
                {errors.email}
              </Text>
            )}
          </View>

          {/* Password Input */}
          <View className="mb-6">
            <Text className="text-black font-semibold text-base mb-2">
              Password
            </Text>
            <View
              className={`bg-white border rounded-xl px-4 py-3 flex-row items-center ${
                errors.password
                  ? "border-red-500"
                  : focusedInput === "password"
                    ? "border-[#1141AF]"
                    : "border-gray-200"
              }`}
            >
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={errors.password ? "#EF4444" : "#9CA3AF"}
              />
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor="#9CA3AF"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  if (errors.password) {
                    setErrors((prev) => ({ ...prev, password: undefined }));
                  }
                }}
                onFocus={() => setFocusedInput("password")}
                onBlur={() => setFocusedInput(null)}
                secureTextEntry={!showPassword}
                className="flex-1 ml-3 text-gray-900"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                className="ml-2"
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text className="text-red-500 text-sm mt-1 ml-1">
                {errors.password}
              </Text>
            )}
          </View>

          {/* Sign In Button */}
          <TouchableOpacity
            onPress={handleSignIn}
            className="bg-[#1141AF] rounded-xl py-4 mb-6"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? (
              <View className="flex-row items-center justify-center">
                <ActivityIndicator size="small" color="white" />
                <Text className="text-white font-bold text-lg ml-2">
                  Signing In...
                </Text>
              </View>
            ) : (
              <Text className="text-white font-bold text-lg text-center">
                Sign In
              </Text>
            )}
          </TouchableOpacity>

          {/* Navigation to Sign Up */}
          <View className="flex-row justify-center mb-6">
            <Text className="text-gray-600 text-base">
              Don&apos;t have an account?{" "}
              <Text
                className="text-[#1141AF] font-semibold"
                onPress={() => router.push("/(auth)/signup")}
              >
                Sign Up
              </Text>
            </Text>
          </View>

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
