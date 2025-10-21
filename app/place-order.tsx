import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapSelection from "../components/map-selection";
import { OrderSummary } from "../components/place-order/OrderSummary";
import { ProgressIndicator } from "../components/place-order/ProgressIndicator";
import { Step1 } from "../components/place-order/Step1";
import { Step2 } from "../components/place-order/Step2";
import { Step3 } from "../components/place-order/Step3";
import { Step4 } from "../components/place-order/Step4";
import { Step5 } from "../components/place-order/Step5";
import { FormData } from "../types/place-order";

export default function AddOrderScreen() {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    serviceType: "",
    collectionType: "",
    senderEntry: "",
    // Step 2 fields
    shipmentType: "Parcel",
    destination: "",
    categories: ["Document"],
    // Step 3 fields
    quantity: "",
    weight: "",
    length: "",
    width: "",
    height: "",
    fragile: false,
    unusualItem: false,
    // Step 4 fields (sender info)
    name: "",
    email: "",
    phoneNumber: "",
    pickupAddress: "",
    // Step 5 fields (receiver info)
    receiverName: "",
    receiverEmail: "",
    receiverPhoneNumber: "",
    deliveryAddress: "",
    // Payment method
    paymentMethod: "CBE",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showPickupMap, setShowPickupMap] = useState(false);
  const [showDeliveryMap, setShowDeliveryMap] = useState(false);

  const validateForm = () => {
    const newErrors: Partial<FormData> = {};

    if (currentStep === 1) {
      if (!formData.serviceType) {
        newErrors.serviceType = "Please select a service type";
      }
      if (!formData.collectionType) {
        newErrors.collectionType = "Please select a collection type";
      }
      if (!formData.senderEntry) {
        newErrors.senderEntry = "Please select a sender entry type";
      }
    } else if (currentStep === 2) {
      if (!formData.destination) {
        newErrors.destination = "Please select a destination";
      }
    } else if (currentStep === 3) {
      if (!formData.quantity) {
        newErrors.quantity = "Please enter quantity";
      }
      if (!formData.weight) {
        newErrors.weight = "Please enter weight";
      }
      // Only validate dimensions if destination is International or National
      if (
        formData.destination === "International" ||
        formData.destination === "National"
      ) {
        if (!formData.length) {
          newErrors.length = "Please enter length";
        }
        if (!formData.width) {
          newErrors.width = "Please enter width";
        }
        if (!formData.height) {
          newErrors.height = "Please enter height";
        }
      }
    } else if (currentStep === 4) {
      if (!formData.name) {
        newErrors.name = "Please enter name";
      }
      if (!formData.email) {
        newErrors.email = "Please enter email";
      }
      if (!formData.phoneNumber) {
        newErrors.phoneNumber = "Please enter phone number";
      }
      if (!formData.pickupAddress) {
        newErrors.pickupAddress = "Please enter pickup address";
      }
    } else if (currentStep === 5) {
      if (!formData.receiverName) {
        newErrors.receiverName = "Please enter receiver name";
      }
      if (!formData.receiverEmail) {
        newErrors.receiverEmail = "Please enter receiver email";
      }
      if (!formData.receiverPhoneNumber) {
        newErrors.receiverPhoneNumber = "Please enter receiver phone number";
      }
      if (!formData.deliveryAddress) {
        newErrors.deliveryAddress = "Please enter delivery address";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      } else if (currentStep === 5) {
        setShowSummary(true);
      }
      setErrors({});
    }
  };

  const handleBack = () => {
    if (showSummary) {
      setShowSummary(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleConfirmOrder = () => {
    router.push("/payment-methods");
  };

  const handleBackToHome = () => {
    // Reset all form data and states to initial values
    setCurrentStep(1);
    setFormData({
      serviceType: "",
      collectionType: "",
      senderEntry: "",
      // Step 2 fields
      shipmentType: "Parcel",
      destination: "",
      categories: ["Document", "Food Items"],
      // Step 3 fields
      quantity: "",
      weight: "",
      length: "",
      width: "",
      height: "",
      fragile: false,
      unusualItem: false,
      // Step 4 fields (sender info)
      name: "",
      email: "",
      phoneNumber: "",
      pickupAddress: "",
      // Step 5 fields (receiver info)
      receiverName: "",
      receiverEmail: "",
      receiverPhoneNumber: "",
      deliveryAddress: "",
      // Payment method
      paymentMethod: "CBE",
    });
    setErrors({});
    setShowDropdown(null);
    setFocusedInput(null);
    setShowSummary(false);

    router.back();
  };

  const handleTrackOrder = () => {
    // Navigate to track page
    router.push("/(tabs)/track");
  };

  const handlePickupLocationSelect = (
    address: string,
    coordinates: { latitude: number; longitude: number }
  ) => {
    setFormData((prev) => ({ ...prev, pickupAddress: address }));
  };

  const handleDeliveryLocationSelect = (
    address: string,
    coordinates: { latitude: number; longitude: number }
  ) => {
    setFormData((prev) => ({ ...prev, deliveryAddress: address }));
  };

  const handleFieldChange = (
    field: keyof FormData,
    value: string | boolean
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setShowDropdown(null);
    // Clear error when user selects an option
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleToggleDropdown = (field: string) => {
    setShowDropdown(showDropdown === field ? null : field);
  };

  const handleToggleCategory = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories?.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const handleFocus = (field: string) => {
    setFocusedInput(field);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            formData={formData}
            errors={errors}
            showDropdown={showDropdown}
            onFieldChange={handleFieldChange}
            onToggleDropdown={handleToggleDropdown}
          />
        );
      case 2:
        return (
          <Step2
            formData={formData}
            errors={errors}
            showDropdown={showDropdown}
            onFieldChange={handleFieldChange}
            onToggleDropdown={handleToggleDropdown}
            onToggleCategory={handleToggleCategory}
          />
        );
      case 3:
        return (
          <Step3
            formData={formData}
            errors={errors}
            focusedInput={focusedInput}
            onFieldChange={handleFieldChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        );
      case 4:
        return (
          <Step4
            formData={formData}
            errors={errors}
            focusedInput={focusedInput}
            onFieldChange={handleFieldChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMapPress={() => setShowPickupMap(true)}
          />
        );
      case 5:
        return (
          <Step5
            formData={formData}
            errors={errors}
            focusedInput={focusedInput}
            onFieldChange={handleFieldChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMapPress={() => setShowDeliveryMap(true)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View className="px-6 py-4" style={{ paddingTop: insets.top + 16 }}>
        <View className="flex-row items-center justify-between mb-6">
          <TouchableOpacity onPress={handleBack} className="p-2">
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-black text-3xl font-bold">Add Order</Text>
          <TouchableOpacity className="p-2">
            <View className="w-8 h-8 border border-[#1141AF] rounded-full items-center justify-center">
              <Ionicons name="archive-outline" size={16} color="#1141AF" />
            </View>
          </TouchableOpacity>
        </View>

        {!showSummary && <ProgressIndicator currentStep={currentStep} />}
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {showSummary ? (
          <OrderSummary formData={formData} />
        ) : (
          renderCurrentStep()
        )}
      </ScrollView>

      {/* Fixed Next Button positioned above tabs */}
      <View
        className="px-6 pb-4 bg-white"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        <TouchableOpacity
          onPress={showSummary ? handleConfirmOrder : handleNext}
          className="bg-[#1141AF] rounded-2xl py-4"
        >
          <Text className="text-white font-bold text-lg text-center">
            {showSummary
              ? "Confirm Order"
              : currentStep === 5
                ? "Complete"
                : "Next"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Map Selection Modals */}
      <MapSelection
        visible={showPickupMap}
        onClose={() => setShowPickupMap(false)}
        onLocationSelect={handlePickupLocationSelect}
        title="Select Pickup Location"
      />

      <MapSelection
        visible={showDeliveryMap}
        onClose={() => setShowDeliveryMap(false)}
        onLocationSelect={handleDeliveryLocationSelect}
        title="Select Delivery Location"
      />
    </View>
  );
}
