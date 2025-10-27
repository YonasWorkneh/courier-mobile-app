import { transformFormDataToOrderRequest } from "@/utils/orderUtils";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import MapSelection from "../components/map-selection";
import { OrderSummary } from "../components/place-order/OrderSummary";
import { ProgressIndicator } from "../components/place-order/ProgressIndicator";
import { Step1 } from "../components/place-order/Step1";
import { Step2 } from "../components/place-order/Step2";
import { Step3 } from "../components/place-order/Step3";
import { Step4 } from "../components/place-order/Step4";
import { Step5 } from "../components/place-order/Step5";
import { useAuthState } from "../hooks/useAuthState";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { usePlaceOrderForm } from "../hooks/usePlaceOrderForm";
import {
  PlaceOrderSchema,
  step1Fields,
  step2Fields,
  step3Fields,
  step4Fields,
  step5Fields,
} from "../schemas/placeOrder";

export default function AddOrderScreen() {
  const insets = useSafeAreaInsets();
  const [currentStep, setCurrentStep] = useState(1);
  const createOrderMutation = useCreateOrder();
  const { isAuthenticated, isLoading, user } = useAuthState();

  // Initialize React Hook Form with user defaults
  const form = usePlaceOrderForm({
    name: user?.name || "",
    email: user?.email || "",
    phoneNumber: user?.phone || "",
  });

  const {
    trigger,
    handleSubmit,
    formState: { errors },
    setValue,
    register,
    control,
  } = form;

  // UI state only
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showPickupMap, setShowPickupMap] = useState(false);
  const [showDeliveryMap, setShowDeliveryMap] = useState(false);

  // register form fields
  useEffect(() => {
    register("serviceType");
    register("collectionType");
    register("senderEntry");
    register("shipmentType");
    register("destination");
    register("categories");
    register("quantity");
    register("weight");
    register("length");
    register("width");
    register("height");
    register("fragile");
    register("unusualItem");
    register("name");
    register("email");
    register("phoneNumber");
    register("pickupAddress");
    register("receiverName");
    register("receiverEmail");
    register("receiverPhoneNumber");
    register("deliveryAddress");
    register("paymentMethod");
  }, [register]);

  // Watch form values for UI
  const formData = useWatch({ control });

  // Update form with user data when available
  useEffect(() => {
    if (user && isAuthenticated) {
      setValue("name", user.name || "", { shouldValidate: false });
      setValue("email", user.email || "", { shouldValidate: false });
      setValue("phoneNumber", user.phone || "", { shouldValidate: false });
    }
  }, [user, isAuthenticated, setValue]);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login-to-order");
    }
  }, [isAuthenticated, isLoading]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <View className="flex-1 bg-white items-center justify-center">
        <Text className="text-lg text-gray-600">Loading...</Text>
      </View>
    );
  }

  // Don't render if not authenticated (will redirect)
  if (!isAuthenticated) {
    return null;
  }

  // React Hook Form validation per step
  const validateCurrentStep = async () => {
    const fieldsByStep: Record<number, (keyof PlaceOrderSchema)[]> = {
      1: [...step1Fields],
      2: [...step2Fields],
      3: [...step3Fields],
      4: [...step4Fields],
      5: [...step5Fields],
    };
    const fields = fieldsByStep[currentStep];
    return await trigger(fields as any);
  };

  const handleNext = async () => {
    const valid = await validateCurrentStep();
    if (valid) {
      if (currentStep < 5) {
        setCurrentStep(currentStep + 1);
      } else if (currentStep === 5) {
        setShowSummary(true);
      }
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

  // React Hook Form submit handler - just navigate to payment methods
  const onValidSubmit = async (values: any) => {
    try {
      const customerId = user?.id;
      if (!customerId) {
        Toast.show({
          type: "error",
          text1: "Please login to continue",
        });
        return;
      }

      // Store form data for payment method selection
      // We'll create the order after payment method is selected
      const orderRequest = transformFormDataToOrderRequest(
        values as any,
        customerId
      );

      // Navigate to payment methods with order data
      router.push({
        pathname: "/payment-methods",
        params: { orderData: JSON.stringify(orderRequest) },
      });
    } catch (error) {
      console.error("Failed to prepare order:", error);
      Toast.show({
        type: "error",
        text1: "Order Preparation Failed",
        text2: "Failed to prepare order. Please try again.",
      });
    }
  };

  const handlePickupLocationSelect = (
    address: string,
    coordinates: { latitude: number; longitude: number }
  ) => {
    setValue("pickupAddress", address as any, { shouldValidate: false });
  };

  const handleDeliveryLocationSelect = (
    address: string,
    coordinates: { latitude: number; longitude: number }
  ) => {
    setValue("deliveryAddress", address as any, { shouldValidate: false });
  };

  const handleFieldChange = (
    field: keyof PlaceOrderSchema,
    value: string | boolean
  ) => {
    setValue(field, value as any, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setShowDropdown(null);
  };

  const handleToggleDropdown = (field: string) => {
    setShowDropdown(showDropdown === field ? null : field);
  };

  const handleSelectCategory = (categoryId: string) => {
    // Single category selection - replace the entire array with just the selected category
    setValue("categories", [categoryId] as any, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };
  const onError = (errors: any) => {
    console.log("errors", errors);

    // Iterate over all errors and show toast messages
    Object.keys(errors).forEach((fieldName) => {
      const error = errors[fieldName];
      if (error?.message) {
        Toast.show({
          type: "error",
          text1: "Validation Error",
          text2: `${fieldName}: ${error.message}`,
        });
      }
    });
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
            formData={{
              serviceType: formData.serviceType || "",
              collectionType: formData.collectionType || "",
              senderEntry: formData.senderEntry || "",
            }}
            errors={{
              serviceType: errors.serviceType?.message,
              collectionType: errors.collectionType?.message,
              senderEntry: errors.senderEntry?.message,
            }}
            showDropdown={showDropdown}
            onFieldChange={handleFieldChange}
            onToggleDropdown={handleToggleDropdown}
          />
        );
      case 2:
        return (
          <Step2
            formData={{
              shipmentType: formData.shipmentType || "",
              destination: formData.destination || "",
              categories: formData.categories || [],
            }}
            errors={{
              destination: errors.destination?.message,
            }}
            showDropdown={showDropdown}
            onFieldChange={handleFieldChange}
            onToggleDropdown={handleToggleDropdown}
            onSelectCategory={handleSelectCategory}
          />
        );
      case 3:
        return (
          <Step3
            formData={{
              quantity: formData.quantity || "",
              weight: formData.weight || "",
              length: formData.length || "",
              width: formData.width || "",
              height: formData.height || "",
              fragile: formData.fragile || false,
              unusualItem: formData.unusualItem || false,
              destination: formData.destination || "",
            }}
            errors={{
              quantity: errors.quantity?.message,
              weight: errors.weight?.message,
              length: errors.length?.message,
              width: errors.width?.message,
              height: errors.height?.message,
            }}
            focusedInput={focusedInput}
            onFieldChange={handleFieldChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        );
      case 4:
        return (
          <Step4
            formData={{
              name: formData.name || "",
              email: formData.email || "",
              phoneNumber: formData.phoneNumber || "",
              pickupAddress: formData.pickupAddress || "",
            }}
            errors={{
              name: errors.name?.message,
              email: errors.email?.message,
              phoneNumber: errors.phoneNumber?.message,
              pickupAddress: errors.pickupAddress?.message,
            }}
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
            formData={{
              receiverName: formData.receiverName || "",
              receiverEmail: formData.receiverEmail || "",
              receiverPhoneNumber: formData.receiverPhoneNumber || "",
              deliveryAddress: formData.deliveryAddress || "",
            }}
            errors={{
              receiverName: errors.receiverName?.message,
              receiverEmail: errors.receiverEmail?.message,
              receiverPhoneNumber: errors.receiverPhoneNumber?.message,
              deliveryAddress: errors.deliveryAddress?.message,
            }}
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
          <TouchableOpacity
            onPress={handleBack}
            className="p-2 rounded-full"
            style={{
              backgroundColor: "transparent",
            }}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-black text-3xl font-bold">Add Order</Text>
          <TouchableOpacity
            className="p-2 rounded-full"
            activeOpacity={0.7}
            style={{ backgroundColor: "transparent" }}
          >
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
          <OrderSummary
            formData={{
              pickupAddress: formData.pickupAddress || "",
              deliveryAddress: formData.deliveryAddress || "",
              serviceType: formData.serviceType || "",
              collectionType: formData.collectionType || "",
              senderEntry: formData.senderEntry || "",
              shipmentType: formData.shipmentType || "",
              destination: formData.destination || "",
              categories: formData.categories || [],
              fragile: formData.fragile || false,
              quantity: formData.quantity || "",
              weight: formData.weight || "",
              length: formData.length,
              width: formData.width,
              height: formData.height,
              name: formData.name || "",
              receiverName: formData.receiverName || "",
            }}
          />
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
          onPress={
            showSummary
              ? () => handleSubmit(onValidSubmit, onError)()
              : handleNext
          }
          className="bg-[#1141AF] rounded-2xl py-4"
          // disabled={createOrderMutation.isPending}
          activeOpacity={0.8}
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
