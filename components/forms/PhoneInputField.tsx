import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

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

interface PhoneInputFieldProps {
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  focused: boolean;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  showProfileBadge?: boolean;
}

export const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  label,
  value,
  placeholder,
  error,
  focused,
  onChangeText,
  onFocus,
  onBlur,
  showProfileBadge = false,
}) => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "ET",
    name: "Ethiopia",
    dialCode: "+251",
    flag: "🇪🇹",
  });
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneChange = (text: string) => {
    setPhoneNumber(text);
    // Combine country code with phone number
    const fullNumber = `${selectedCountry.dialCode}${text}`;
    onChangeText(fullNumber);
  };

  const handleCountrySelect = (country: (typeof countries)[0]) => {
    setSelectedCountry(country);
    setShowCountryPicker(false);
    // Update the full number with new country code
    const fullNumber = `${country.dialCode}${phoneNumber}`;
    onChangeText(fullNumber);
  };

  return (
    <View className="mb-6 relative">
      <View className="flex-row items-center mb-2">
        <Text className="text-black font-semibold text-base">{label}</Text>
      </View>
      <View
        className={`bg-white border rounded-xl px-4 py-3 flex-row items-center ${
          error
            ? "border-red-500"
            : focused
              ? "border-[#1141AF]"
              : "border-gray-200"
        }`}
      >
        <Ionicons
          name="call-outline"
          size={20}
          color={error ? "#EF4444" : "#9CA3AF"}
        />

        {/* Country Code Selector */}
        <TouchableOpacity
          onPress={() => setShowCountryPicker(!showCountryPicker)}
          className="flex-row items-center mr-3"
          activeOpacity={0.7}
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
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={phoneNumber}
          onChangeText={handlePhoneChange}
          onFocus={onFocus}
          onBlur={onBlur}
          keyboardType="phone-pad"
          className="flex-1 text-gray-900"
        />
      </View>

      {/* Country Dropdown */}
      {showCountryPicker && (
        <View className="bg-white border border-gray-200 rounded-xl mb-2 shadow-sm max-h-48 w-1/2 absolute top-[75px] left-0 z-10">
          <ScrollView showsVerticalScrollIndicator={false} className="max-h-48">
            {countries.map((country) => (
              <TouchableOpacity
                key={country.code}
                onPress={() => handleCountrySelect(country)}
                className={`flex-row items-center p-3 ${
                  selectedCountry.code === country.code ? "bg-blue-50" : ""
                }`}
                activeOpacity={0.7}
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

      {error && <Text className="text-red-500 text-sm mt-1 ml-1">{error}</Text>}
    </View>
  );
};
