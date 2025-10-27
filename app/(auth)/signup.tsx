import { useRoles } from "@/hooks/useRoles";
import { Role } from "@/types/role";
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
import { useRegister } from "../../hooks/useAuth";

// East African countries with their flags and dial codes
const countries = [
  { code: "ET", name: "Ethiopia", dialCode: "+251", flag: "🇪🇹" },
  { code: "KE", name: "Kenya", dialCode: "+254", flag: "🇰🇪" },
  { code: "UG", name: "Uganda", dialCode: "+256", flag: "🇺🇬" },
  { code: "TZ", name: "Tanzania", dialCode: "+255", flag: "🇹🇿" },
  { code: "RW", name: "Rwanda", dialCode: "+250", flag: "🇷🇼" },
  { code: "BI", name: "Burundi", dialCode: "+257", flag: "🇧🇮" },
  { code: "SS", name: "South Sudan", dialCode: "+211", flag: "🇸🇸" },
  { code: "SO", name: "Somalia", dialCode: "+252", flag: "🇸🇴" },
  { code: "DJ", name: "Djibouti", dialCode: "+253", flag: "🇩🇯" },
  { code: "ER", name: "Eritrea", dialCode: "+291", flag: "🇪🇷" },
];

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "ET",
    name: "Ethiopia",
    dialCode: "+251",
    flag: "🇪🇹",
  });
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    password?: string;
    phone?: string;
    terms?: string;
  }>({});
  const router = useRouter();

  const { register, isLoading, error, isSuccess } = useRegister();
  const { roles, isLoadingRoles } = useRoles();
  console.log("roles", roles);

  const customerRole = roles?.find(
    (role: Role) => role.name.toLowerCase() === "customer"
  );
  console.log(customerRole);

  const validateForm = () => {
    const newErrors: {
      fullName?: string;
      email?: string;
      password?: string;
      phone?: string;
      terms?: string;
    } = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    }

    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = () => {
    if (!validateForm()) {
      return;
    }

    // Check if roles are loaded, if not use fallback
    if (!customerRole && roles?.length === 0) {
      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: "Unable to load user roles. Please try again.",
      });
      return;
    }

    // Use dynamic customer role ID or fallback to hardcoded ID
    const roleId = customerRole?.id ?? "cmgzw1bdm0000f73oogrss9bh";

    register({
      name: fullName.trim(),
      email: email.trim(),
      role: roleId,
      password,
      phone: `${selectedCountry.dialCode}${phone.trim()}`,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      Toast.show({
        type: "success",
        text1: "Registration Successful",
        text2: "Account created successfully!",
      });
      // Navigate to sign in page after successful registration
      router.replace("/(auth)/signin");
    }
  }, [isSuccess, router]);

  useEffect(() => {
    if (error) {
      // Extract the actual error message from the backend response
      const errorMessage =
        error.message || "Something went wrong. Please try again.";

      Toast.show({
        type: "error",
        text1: "Registration Failed",
        text2: errorMessage,
      });
    }
  }, [error]);

  return (
    <View className="flex-1 bg-[#1141AF] pt-10">
      <StatusBar barStyle="light-content" />
      {/* Header with Background Image and Gradient */}
      <View className="h-60 mb-5">
        {/* Background Image */}
        <View className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
          <Image
            source={require("@/assets/images/bg.png")}
            style={{
              width: 300,
              height: 230,
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
            <Text className="text-white text-4xl font-bold mb-2">Register</Text>
            <Text className="text-white/80 text-lg">Create your account</Text>
          </View>
        </View>
      </View>

      {/* Content Form */}
      <ScrollView
        className="flex-1 bg-white rounded-t-[2rem] mt-[-20px]"
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 pt-8 pb-8">
          {/* Full Name Input */}
          <View className="mb-6">
            <Text className="text-black font-semibold text-base mb-2">
              Full Name
            </Text>
            <View
              className={`bg-white border rounded-xl px-4 py-3 flex-row items-center ${
                errors.fullName
                  ? "border-red-500"
                  : focusedInput === "fullName"
                    ? "border-[#1141AF]"
                    : "border-gray-200"
              }`}
            >
              <Ionicons
                name="person-outline"
                size={20}
                color={errors.fullName ? "#EF4444" : "#9CA3AF"}
              />
              <TextInput
                placeholder="Enter Full Name"
                placeholderTextColor="#9CA3AF"
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  if (errors.fullName) {
                    setErrors((prev) => ({ ...prev, fullName: undefined }));
                  }
                }}
                onFocus={() => setFocusedInput("fullName")}
                onBlur={() => setFocusedInput(null)}
                className="flex-1 ml-3 text-gray-900"
              />
            </View>
            {errors.fullName && (
              <Text className="text-red-500 text-sm mt-1 ml-1">
                {errors.fullName}
              </Text>
            )}
          </View>

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

          {/* Phone Input */}
          <View className="mb-6 relative">
            <Text className="text-black font-semibold text-base mb-2">
              Phone Number
            </Text>
            <View
              className={`bg-white border rounded-xl px-4 py-3 flex-row items-center ${
                errors.phone
                  ? "border-red-500"
                  : focusedInput === "phone"
                    ? "border-[#1141AF]"
                    : "border-gray-200"
              }`}
            >
              <Ionicons
                name="call-outline"
                size={20}
                color={errors.phone ? "#EF4444" : "#9CA3AF"}
              />

              {/* Country Code Selector */}
              <TouchableOpacity
                onPress={() => setShowCountryPicker(!showCountryPicker)}
                className="flex-row items-center mr-3"
              >
                <Text className="text-gray-900 text-base mr-1">
                  {selectedCountry.flag}
                </Text>
                <Text className="text-gray-900 text-base mr-1">
                  {selectedCountry.dialCode}
                </Text>
                <Ionicons
                  name={showCountryPicker ? "chevron-up" : "chevron-down"}
                  size={16}
                  color="#9CA3AF"
                />
              </TouchableOpacity>

              {/* Divider */}
              <View className="w-px h-6 bg-gray-300 mr-3" />

              <TextInput
                placeholder="Enter Phone Number"
                placeholderTextColor="#9CA3AF"
                value={phone}
                onChangeText={(text) => {
                  setPhone(text);
                  if (errors.phone) {
                    setErrors((prev) => ({ ...prev, phone: undefined }));
                  }
                }}
                onFocus={() => setFocusedInput("phone")}
                onBlur={() => setFocusedInput(null)}
                keyboardType="phone-pad"
                className="flex-1 text-gray-900"
              />
            </View>
            {/* Country Dropdown */}
            {showCountryPicker && (
              <View className="bg-white border border-gray-200 rounded-xl mb-2 shadow-sm max-h-48 w-1/2 absolute top-[75px] left-0 z-10">
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  className="max-h-48"
                >
                  {countries.map((country) => (
                    <TouchableOpacity
                      key={country.code}
                      onPress={() => {
                        setSelectedCountry(country);
                        setShowCountryPicker(false);
                      }}
                      className={`flex-row items-center p-3 ${
                        selectedCountry.code === country.code
                          ? "bg-blue-50"
                          : ""
                      }`}
                    >
                      <Text className="text-xl mr-3">{country.flag}</Text>
                      <View className="flex-1">
                        <Text className="text-gray-900 font-medium">
                          {country.name}
                        </Text>
                        <Text className="text-gray-500 text-sm">
                          {country.dialCode}
                        </Text>
                      </View>
                      {selectedCountry.code === country.code && (
                        <Ionicons name="checkmark" size={20} color="#1141AF" />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
            {errors.phone && (
              <Text className="text-red-500 text-sm mt-1 ml-1">
                {errors.phone}
              </Text>
            )}
          </View>

          {/* Terms and Services */}
          <View className="mb-8">
            <View className="flex-row items-start">
              <TouchableOpacity
                className="mr-3 mt-1"
                onPress={() => {
                  setAgreeToTerms(!agreeToTerms);
                  if (errors.terms) {
                    setErrors((prev) => ({ ...prev, terms: undefined }));
                  }
                }}
              >
                <View
                  className={`w-5 h-5 border-2 rounded ${
                    agreeToTerms
                      ? "bg-[#1141AF] border-[#1141AF]"
                      : errors.terms
                        ? "border-red-500"
                        : "border-gray-300"
                  } items-center justify-center`}
                >
                  {agreeToTerms && (
                    <Ionicons name="checkmark" size={14} color="white" />
                  )}
                </View>
              </TouchableOpacity>
              <View className="flex-1">
                <Text className="text-gray-600 text-sm leading-5">
                  By tapping Sign Up, you have read and agree to the{" "}
                  <Text className="text-[#1141AF] font-semibold">
                    Terms and Services
                  </Text>
                </Text>
                <Text className="text-[#1141AF] font-semibold text-sm"></Text>
              </View>
            </View>
            {errors.terms && (
              <Text className="text-red-500 text-sm mt-1 ml-8">
                {errors.terms}
              </Text>
            )}
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            onPress={handleSignUp}
            className="bg-[#1141AF] rounded-xl py-4 mb-6"
            disabled={!agreeToTerms || isLoading || isLoadingRoles}
            style={{
              opacity: agreeToTerms && !isLoading && !isLoadingRoles ? 1 : 0.5,
            }}
          >
            {isLoading ? (
              <View className="flex-row items-center justify-center">
                <ActivityIndicator size="small" color="white" />
                <Text className="text-white font-bold text-lg ml-2">
                  {"Creating Account..."}
                </Text>
              </View>
            ) : (
              <Text className="text-white font-bold text-lg text-center">
                Sign Up
              </Text>
            )}
          </TouchableOpacity>

          {/* Navigation to Sign In */}
          <View className="flex-row justify-center mb-6">
            <Text className="text-gray-600 text-base">
              Already have an account?{" "}
              <Text
                className="text-[#1141AF] font-semibold"
                onPress={() => router.push("/(auth)/signin")}
              >
                Sign In
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
