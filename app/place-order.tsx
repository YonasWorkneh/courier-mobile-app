import {
  AntDesign,
  FontAwesome5,
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MapSelection from "../components/map-selection";

interface FormData {
  serviceType: string;
  collectionType: string;
  senderEntry: string;
  // Step 2 fields
  shipmentType: string;
  destination: string;
  categories: string[];
  // Step 3 fields
  quantity: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  fragile: boolean;
  unusualItem: boolean;
  // Step 4 fields (sender info)
  name: string;
  email: string;
  phoneNumber: string;
  pickupAddress: string;
  // Step 5 fields (receiver info)
  receiverName: string;
  receiverEmail: string;
  receiverPhoneNumber: string;
  deliveryAddress: string;
  // Payment method
  paymentMethod: string;
}

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
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [showDropdown, setShowDropdown] = useState<string | null>(null);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const [showSummary, setShowSummary] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showPickupMap, setShowPickupMap] = useState(false);
  const [showDeliveryMap, setShowDeliveryMap] = useState(false);

  const serviceTypes = ["Standard", "Same day", "Overnight"];
  const collectionTypes = ["Pickup", "Drop-off"];
  const senderEntries = ["Individual", "Corporate"];
  const destinations = ["Town", "Regional", "International"];
  const categoryOptions = [
    {
      id: "Document",
      icon: "document-text-outline",
      selected: true,
    },
    {
      id: "Food Items",
      specialIcon: (
        <Image
          source={
            formData.categories?.includes("Food Items")
              ? require("../assets/images/food-box.png")
              : require("../assets/images/food-box-black.png")
          }
          className={`${
            formData.categories?.includes("Food Items")
              ? "w-10 h-10"
              : "w-8 h-8"
          }`}
          resizeMode="contain"
        />
      ),
      selected: true,
    },
    {
      id: "Grocery",
      selected: false,
      specialIcon: (
        <FontAwesome5
          name="shopping-cart"
          size={18}
          color={formData.categories?.includes("Grocery") ? "#fff" : "#1141AF"}
        />
      ),
    },
    {
      id: "Medication",
      selected: false,
      specialIcon: (
        <MaterialIcons
          name="medical-services"
          size={18}
          color={
            formData.categories?.includes("Medication") ? "#fff" : "#1141AF"
          }
        />
      ),
    },
    { id: "Electronics", icon: "phone-portrait-outline", selected: false },
    { id: "Cakes, Flowers, Delicates", icon: "gift-outline", selected: false },
    {
      id: "Household items",
      specialIcon: (
        <MaterialCommunityIcons
          name="toolbox"
          size={24}
          color={formData.categories?.includes("Other") ? "#fff" : "#1141AF"}
        />
      ),
      selected: false,
    },
    {
      id: "Fashion items",
      specialIcon: (
        <View className="relative rounded-full items-center justify-center text-[#1141AF]">
          <MaterialCommunityIcons
            name="redhat"
            size={24}
            color={`${formData.categories?.includes("Fashion items") ? "#fff" : "#1141AF"}`}
          />
          <MaterialCommunityIcons
            name="sunglasses"
            size={15}
            color={`${formData.categories?.includes("Fashion items") ? "#fff" : "#1141AF"}`}
            className="absolute -bottom-2 -right-0"
          />
        </View>
      ),
      selected: false,
    },
    { id: "Clothes", icon: "shirt-outline", selected: false },
    { id: "E-Commerce", icon: "pricetag-outline", selected: false },
  ];

  const paymentMethods = [
    { id: "CBE", name: "CBE", icon: require("../assets/images/cbe.png") },
    {
      id: "Abyssinia",
      name: "Abyssinia",
      icon: require("../assets/images/abysnnia.png"),
    },
    {
      id: "Dashen",
      name: "Dashin",
      icon: require("../assets/images/dashen.png"),
    },
    {
      id: "Awash",
      name: "Awash",
      icon: require("../assets/images/awash.png"),
    },
    {
      id: "Telebirr",
      name: "Telebirr",
      icon: require("../assets/images/telebirr.png"),
    },
    {
      id: "Wallet",
      name: "Wallet (In-App Balance)",
      icon: require("../assets/images/wallet.png"),
    },
    {
      id: "COD",
      name: "Cash on Delivery (COD)",
      icon: require("../assets/images/cod.png"),
    },
  ];

  const renderProgressIndicator = () => (
    <View className="flex-row items-center justify-center mb-8">
      {[1, 2, 3, 4, 5].map((step, index) => (
        <View key={step} className="flex-row items-center">
          <View
            className={`w-8 h-8 rounded-full items-center justify-center ${
              step <= currentStep ? "bg-[#1141AF]" : "bg-gray-200"
            }`}
          >
            <Text
              className={`font-bold text-sm ${
                step <= currentStep ? "text-white" : "text-gray-500"
              }`}
            >
              {step}
            </Text>
          </View>
          {index < 4 && (
            <View
              className={`w-8 h-[1px] mx-2 ${
                step < currentStep ? "bg-[#1141AF]" : "bg-gray-200"
              }`}
            />
          )}
        </View>
      ))}
    </View>
  );

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
    if (showConfirmation) {
      setShowConfirmation(false);
    } else if (showBookingConfirmation) {
      setShowBookingConfirmation(false);
    } else if (showPayment) {
      setShowPayment(false);
    } else if (showSummary) {
      setShowSummary(false);
    } else if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      router.back();
    }
  };

  const handleConfirmOrder = () => {
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowBookingConfirmation(true);
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
    setShowPayment(false);
    setShowBookingConfirmation(false);
    setShowConfirmation(false);

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

  const handleProceedToCompletion = () => {
    setShowConfirmation(true);
  };

  const selectOption = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setShowDropdown(null);
    // Clear error when user selects an option
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const toggleCategory = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories?.includes(categoryId)
        ? prev.categories.filter((id) => id !== categoryId)
        : [...prev.categories, categoryId],
    }));
  };

  const renderCheckboxField = (
    label: string,
    field: keyof FormData,
    isChecked: boolean
  ) => (
    <TouchableOpacity
      onPress={() => setFormData((prev) => ({ ...prev, [field]: !isChecked }))}
      className="flex-row items-center mb-4"
    >
      <View
        className={`w-6 h-6 border-2 rounded items-center justify-center mr-3 ${
          isChecked
            ? "bg-[#1141AF] border-[#1141AF]"
            : "border-[#1141AF] bg-white"
        }`}
      >
        {isChecked && <Ionicons name="checkmark" size={16} color="white" />}
      </View>
      <Text className="text-black font-medium text-base">{label}</Text>
    </TouchableOpacity>
  );

  const renderDropdownField = (
    label: string,
    field: keyof FormData,
    placeholder: string,
    icon: string,
    options: string[]
  ) => (
    <View className="mb-6">
      <Text className="text-black font-semibold text-sm mb-2">{label}</Text>
      <TouchableOpacity
        onPress={() => setShowDropdown(showDropdown === field ? null : field)}
        className={`bg-white border rounded-xl px-4 py-4 flex-row items-center ${
          errors[field]
            ? "border-red-500"
            : showDropdown === field
              ? "border-[#1141AF]"
              : "border-gray-200"
        }`}
      >
        <Ionicons name={icon as any} size={20} color="#1141AF" />
        <Text
          className={`flex-1 ml-3 ${
            formData[field] ? "text-gray-900" : "text-gray-500"
          }`}
        >
          {formData[field] || placeholder}
        </Text>
        <Ionicons
          name={showDropdown === field ? "chevron-up" : "chevron-down"}
          size={20}
          color="#9CA3AF"
        />
      </TouchableOpacity>

      {/* Dropdown Options */}
      {showDropdown === field && (
        <View className="bg-white border border-gray-200 rounded-xl mt-1">
          {options.map((option, index) => (
            <TouchableOpacity
              key={option}
              onPress={() => selectOption(field, option)}
              className={`px-4 py-3 ${
                index !== options.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <Text className="text-gray-900">{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {errors[field] && (
        <Text className="text-red-500 text-sm mt-1">{errors[field]}</Text>
      )}
    </View>
  );

  const renderInputField = (
    label: string,
    field: keyof FormData,
    placeholder: string,
    icon: string | React.ReactNode,
    keyboardType: any = "default"
  ) => (
    <View className="mb-4">
      <Text className="text-black font-semibold text-sm mb-2">{label}</Text>
      <View
        className={`bg-white border rounded-xl px-4 py-3 flex-row items-center ${
          errors[field]
            ? "border-red-500"
            : focusedInput === field
              ? "border-[#1141AF]"
              : "border-gray-200"
        }`}
      >
        {typeof icon === "string" ? (
          <Ionicons name={icon as any} size={20} color="#1141AF" />
        ) : (
          icon
        )}
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          value={
            typeof formData[field] === "string" ? formData[field] || "" : ""
          }
          onChangeText={(text) => {
            setFormData((prev) => ({ ...prev, [field]: text }));
            if (errors[field]) {
              setErrors((prev) => ({ ...prev, [field]: undefined }));
            }
          }}
          onFocus={() => setFocusedInput(field)}
          onBlur={() => setFocusedInput(null)}
          keyboardType={keyboardType}
          className="flex-1 ml-3 text-gray-900"
        />
      </View>
      {errors[field] && (
        <Text className="text-red-500 text-sm mt-1">{errors[field]}</Text>
      )}
    </View>
  );

  const renderStep2 = () => (
    <View className="flex-1">
      {/* Shipment Type */}
      <View className="mb-8">
        <Text className="text-black font-semibold text-sm mb-4">
          Shipment Type
        </Text>
        <View className="flex-1 flex-row gap-8">
          <TouchableOpacity
            onPress={() =>
              setFormData((prev) => ({ ...prev, shipmentType: "Parcel" }))
            }
            className={`flex-row gap-2 border rounded-xl p-4 !py-0 items-center justify-center ${
              formData.shipmentType === "Parcel"
                ? "border-[#1141AF] bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <FontAwesome5 name="envelope" size={18} color="#1141AF" />

            <Text
              className={`font-semibold text-sm ${
                formData.shipmentType === "Parcel"
                  ? "text-[#1141AF]"
                  : "text-gray-700"
              }`}
            >
              Parcel-Envelope
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() =>
              setFormData((prev) => ({ ...prev, shipmentType: "Courier" }))
            }
            className={`flex-1 flex-row gap-2 border rounded-xl p-4 py-6 items-center justify-center ${
              formData.shipmentType === "Courier"
                ? "border-[#1141AF] bg-blue-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <FontAwesome5 name="box-open" size={18} color="#1141AF" />
            <Text
              className={`font-semibold text-sm ${
                formData.shipmentType === "Courier"
                  ? "text-[#1141AF]"
                  : "text-gray-700"
              }`}
            >
              Parcel- Box
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Destination */}
      {renderDropdownField(
        "Destination",
        "destination",
        "Town, Region, International",
        "location-outline",
        destinations
      )}

      {/* Categories */}
      <View className="mb-8">
        <Text className="text-black font-semibold text-sm mb-4">
          Categories
        </Text>
        <View className="flex-row flex-wrap gap-3">
          {categoryOptions.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => toggleCategory(category.id)}
              className={`border border-gray-200 rounded-full px-3 py-2 flex-row items-center ${
                formData.categories?.includes(category.id)
                  ? "bg-[#1141AF] "
                  : "bg-white !border-[#1141AF]"
              }`}
            >
              <View
                className={`w-8 h-8 rounded-full items-center justify-center mr-3 text-blue-500`}
              >
                {category.specialIcon ? (
                  category.specialIcon
                ) : (
                  <Ionicons
                    name={category.icon as any}
                    size={16}
                    color={
                      formData.categories?.includes(category.id)
                        ? "#fff"
                        : "#1141AF"
                    }
                  />
                )}
              </View>
              <Text
                className={`font-medium text-sm ${
                  formData.categories?.includes(category.id)
                    ? "text-[#fff]"
                    : "text-gray-700"
                }`}
              >
                {category.id}
              </Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            onPress={() => toggleCategory("Other")}
            className={`border border-gray-200 rounded-full px-6 py-2 flex-row items-center ${
              formData.categories?.includes("Other")
                ? "bg-[#1141AF] "
                : "bg-white !border-[#1141AF]"
            }`}
          >
            <Text
              className={`font-medium text-sm 
                 ${
                   formData.categories?.includes("Other")
                     ? "text-[#fff]"
                     : "text-gray-700"
                 }`}
            >
              Other
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderStep3 = () => {
    const showDimensions =
      formData.destination === "International" ||
      formData.destination === "Regional";

    return (
      <View className="flex-1">
        {/* Quantity */}
        {renderInputField(
          "Quantity",
          "quantity",
          "Quantity",
          <FontAwesome6 name="hashtag" size={20} color="#1141AF" />,
          "numeric"
        )}

        {/* Weight */}
        {renderInputField(
          "Weight",
          "weight",
          "Weight",
          <FontAwesome5 name="weight" size={20} color="#1141AF" />,
          "numeric"
        )}

        {/* Dimensions - only show if International or National */}
        {showDimensions && (
          <>
            {/* Length */}
            {renderInputField(
              "Length",
              "length",
              "Length",
              <FontAwesome5 name="ruler" size={20} color="#1141AF" />,
              "numeric"
            )}

            {/* Width */}
            {renderInputField(
              "Width",
              "width",
              "Width",
              <AntDesign name="column-width" size={20} color="#1141AF" />,
              "numeric"
            )}

            {/* Height */}
            {renderInputField(
              "Height",
              "height",
              "Height",
              <AntDesign name="column-height" size={24} color="#1141AF" />,
              "numeric"
            )}
          </>
        )}

        {/* Checkboxes */}
        <View className="mt-6">
          {renderCheckboxField("Fragile", "fragile", formData.fragile)}
          {renderCheckboxField(
            "Unusual item",
            "unusualItem",
            formData.unusualItem
          )}
        </View>
      </View>
    );
  };

  const renderStep4 = () => (
    <View className="flex-1">
      {/* Sender Information Header */}
      <View className="mb-6">
        <Text className="text-black text-2xl font-bold">
          Sender Information
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          Please provide your contact details and pickup address
        </Text>
      </View>

      {/* Name */}
      {renderInputField(
        "Name",
        "name",
        "Sender Name",
        <Ionicons name="person-outline" size={20} color="#1141AF" />
      )}

      {/* Email */}
      {renderInputField(
        "Email",
        "email",
        "Sender Email",
        <Ionicons name="mail-outline" size={20} color="#1141AF" />,
        "email-address"
      )}

      {/* Phone Number */}
      {renderInputField(
        "Phone Number",
        "phoneNumber",
        "Sender Phone Number",
        <Ionicons name="call-outline" size={20} color="#1141AF" />,
        "phone-pad"
      )}

      {/* Pickup Address */}
      <View className="mb-4">
        <Text className="text-black font-bold text-base mb-2">
          Pickup Address
        </Text>
        <View
          className={`bg-white border rounded-xl px-4 py-3 flex-row items-center ${
            errors.pickupAddress
              ? "border-red-500"
              : focusedInput === "pickupAddress"
                ? "border-[#1141AF]"
                : "border-gray-200"
          }`}
        >
          <Ionicons name="location-outline" size={20} color="#1141AF" />
          <TextInput
            placeholder="Search address"
            placeholderTextColor="#9CA3AF"
            value={formData.pickupAddress || ""}
            onChangeText={(text) => {
              setFormData((prev) => ({ ...prev, pickupAddress: text }));
              if (errors.pickupAddress) {
                setErrors((prev) => ({ ...prev, pickupAddress: undefined }));
              }
            }}
            onFocus={() => setFocusedInput("pickupAddress")}
            onBlur={() => setFocusedInput(null)}
            className="flex-1 ml-3 text-gray-900"
          />
          <TouchableOpacity
            onPress={() => setShowPickupMap(true)}
            className="flex-row items-center bg-[#1141AF] px-3 py-2 rounded-lg"
          >
            <Ionicons name="map-outline" size={16} color="white" />
            <Text className="text-white text-xs font-medium ml-1">Map</Text>
          </TouchableOpacity>
        </View>
        {errors.pickupAddress && (
          <Text className="text-red-500 text-sm mt-1">
            {errors.pickupAddress}
          </Text>
        )}
      </View>
    </View>
  );

  const renderStep5 = () => (
    <View className="flex-1">
      {/* Receiver Information Header */}
      <View className="mb-6">
        <Text className="text-black text-2xl font-bold">
          Receiver Information
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          Please provide the receiver&apos;s contact details and delivery
          address
        </Text>
      </View>

      {/* Receiver Name */}
      {renderInputField(
        "Name",
        "receiverName",
        "Receiver Name",
        <Ionicons name="person-outline" size={20} color="#1141AF" />
      )}

      {/* Receiver Email */}
      {renderInputField(
        "Email",
        "receiverEmail",
        "Receiver Email",
        <Ionicons name="mail-outline" size={20} color="#1141AF" />,
        "email-address"
      )}

      {/* Receiver Phone Number */}
      {renderInputField(
        "Phone Number",
        "receiverPhoneNumber",
        "Receiver Phone Number",
        <Ionicons name="call-outline" size={20} color="#1141AF" />,
        "phone-pad"
      )}

      {/* Delivery Address */}
      <View className="mb-4">
        <Text className="text-black font-bold text-base mb-2">
          Delivery Address
        </Text>
        <View
          className={`bg-white border rounded-xl px-4 py-3 flex-row items-center ${
            errors.deliveryAddress
              ? "border-red-500"
              : focusedInput === "deliveryAddress"
                ? "border-[#1141AF]"
                : "border-gray-200"
          }`}
        >
          <Ionicons name="location-outline" size={20} color="#1141AF" />
          <TextInput
            placeholder="Search address"
            placeholderTextColor="#9CA3AF"
            value={formData.deliveryAddress || ""}
            onChangeText={(text) => {
              setFormData((prev) => ({ ...prev, deliveryAddress: text }));
              if (errors.deliveryAddress) {
                setErrors((prev) => ({ ...prev, deliveryAddress: undefined }));
              }
            }}
            onFocus={() => setFocusedInput("deliveryAddress")}
            onBlur={() => setFocusedInput(null)}
            className="flex-1 ml-3 text-gray-900"
          />
          <TouchableOpacity
            onPress={() => setShowDeliveryMap(true)}
            className="flex-row items-center bg-[#1141AF] px-3 py-2 rounded-lg"
          >
            <Ionicons name="map-outline" size={16} color="white" />
            <Text className="text-white text-xs font-medium ml-1">Map</Text>
          </TouchableOpacity>
        </View>
        {errors.deliveryAddress && (
          <Text className="text-red-500 text-sm mt-1">
            {errors.deliveryAddress}
          </Text>
        )}
      </View>
    </View>
  );

  const renderOrderSummary = () => (
    <View className="flex-1">
      {/* Pickup and Delivery Locations */}
      <View className="mb-6">
        <View className="flex-row items-start">
          {/* Visual Route */}
          <View className="items-center mr-4">
            <View className="w-4 h-4 border-2 border-[#1141AF] rounded-full" />
            <View className="w-[1px] h-8 border-l border-dashed border-gray-300 my-2" />
            <Ionicons name="location" size={20} color="#1141AF" />
          </View>

          {/* Location Names */}
          <View className="flex-1 gap-[32px]">
            <Text className="text-gray-900 text-sm font-medium mb-2">
              {formData.pickupAddress || "Piassa"}
            </Text>
            <Text className="text-gray-900 text-sm font-medium">
              {formData.deliveryAddress || "Bole Medhanilem"}
            </Text>
          </View>
        </View>

        {/* Divider */}
        <View className="h-[1px] bg-gray-200 my-4" />
      </View>

      {/* Order Details */}
      <View className="flex gap-2">
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Created on</Text>
          <Text className="text-gray-900 font-medium">Oct 2, 2:15 PM</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Service Type</Text>
          <Text className="text-gray-900 font-medium">
            {formData.serviceType}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Courier Collection Type</Text>
          <Text className="text-gray-900 font-medium">
            {formData.collectionType}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Sender Entry</Text>
          <Text className="text-gray-900 font-medium">
            {formData.senderEntry}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Shipment Type</Text>
          <Text className="text-gray-900 font-medium">
            {formData.shipmentType}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Destination</Text>
          <Text className="text-gray-900 font-medium">
            {formData.destination}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Categories</Text>
          <Text className="text-gray-900 font-medium">
            {formData.categories?.join(", ")}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Fragile</Text>
          <Text className="text-gray-900 font-medium">
            {formData.fragile ? "Yes" : "No"}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Weight</Text>
          <Text className="text-gray-900 font-medium">
            {formData.weight || "0"} KG
          </Text>
        </View>

        {(formData.destination === "International" ||
          formData.destination === "Regional") && (
          <View className="flex-row justify-between items-center">
            <Text className="text-gray-600">Dimensions</Text>
            <Text className="text-gray-900 font-medium">
              {formData.length || "0"} x {formData.width || "0"} x{" "}
              {formData.height || "0"} cm
            </Text>
          </View>
        )}

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Distance</Text>
          <Text className="text-gray-900 font-medium">5 Km</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Sender</Text>
          <Text className="text-gray-900 font-medium">{formData.name}</Text>
        </View>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Receiver</Text>
          <Text className="text-gray-900 font-medium">
            {formData.receiverName}
          </Text>
        </View>
      </View>

      {/* Pricing Breakdown */}
      <View className="mt-8 pt-4 border-t border-gray-200">
        {/* Base Price */}
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-600 text-base">Base Delivery Fee</Text>
          <Text className="text-gray-900 text-base font-medium">
            ETB 2,000.00
          </Text>
        </View>

        {/* VAT */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-gray-600 text-base">VAT (15%)</Text>
          <Text className="text-gray-900 text-base font-medium">
            ETB 300.00
          </Text>
        </View>

        {/* Total */}
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-900 text-lg font-bold">Total</Text>
          <Text className="text-[#1141AF] text-lg font-bold">ETB 2,300.00</Text>
        </View>

        {/* VAT Note */}
        <View className="mt-2">
          <Text className="text-gray-500 text-xs text-center">
            *VAT included in total amount
          </Text>
        </View>
      </View>
    </View>
  );

  const renderPaymentMethods = () => (
    <View className="flex-1">
      <Text className="text-black font-bold text-lg mb-6">Payment method</Text>

      <View className="space-y-4">
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            onPress={() =>
              setFormData((prev) => ({ ...prev, paymentMethod: method.id }))
            }
            className="flex-row items-center justify-between py-4"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 rounded-full items-center justify-center mr-4 bg-gray-50">
                <Image
                  source={method.icon}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
              <Text className="text-gray-900 font-medium text-base">
                {method.name}
              </Text>
            </View>

            <View
              className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
                formData.paymentMethod === method.id
                  ? "border-[#1141AF] bg-[#1141AF]"
                  : "border-gray-300"
              }`}
            >
              {formData.paymentMethod === method.id && (
                <View className="w-2 h-2 rounded-full bg-white" />
              )}
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderBookingConfirmationPage = () => (
    <View className="flex-1 items-center justify-center px-6">
      {/* Success Icon - Wavy Blue Circle */}
      <Image
        source={require("../assets/images/subtract.png")}
        className="w-32 h-32 mb-8"
        resizeMode="contain"
      />

      {/* Confirmation Content */}
      <View className="items-center mb-8">
        <Text className="text-black text-2xl font-bold mb-4">
          Booking Confirmation
        </Text>

        <Text className="text-gray-600 text-base text-center mb-2">
          Your delivery has been created successfully.
        </Text>

        <Text className="text-gray-600 text-base text-center mb-6">
          You gained 10 points
        </Text>

        <View className="flex-row items-center mb-8">
          <Text className="text-gray-600 text-base">Your Payment Code:</Text>
          <Text className="text-[#1141AF] text-base font-bold ml-2">
            #AB12345
          </Text>
        </View>
      </View>
    </View>
  );

  const renderBookingConfirmation = () => (
    <View className="flex-1 items-center justify-center px-6">
      {/* Success Icon */}
      <Image
        source={require("../assets/images/success.png")}
        className="w-36 h-36 mb-8"
        resizeMode="contain"
      />

      {/* Confirmation Content */}
      <View className="items-center mb-8">
        <Text className="text-black text-2xl font-bold mb-4">
          Payment Completed
        </Text>

        <Text className="text-gray-600 text-base text-center mb-6">
          You have completed payment and you can proceed
        </Text>

        {/* QR Code */}
        <View className="w-32 h-32 rounded-lg items-center justify-center mb-6">
          <Image
            source={require("../assets/images/qrsample.jpg")}
            className="w-40 h-40"
            resizeMode="contain"
          />
        </View>

        <View className="flex-row items-center mb-8">
          <Text className="text-gray-600 text-base">Your Track Number:</Text>
          <Text className="text-[#1141AF] text-base font-bold ml-2">
            #AB12345
          </Text>
        </View>
      </View>
    </View>
  );

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

        {!showSummary &&
          !showPayment &&
          !showBookingConfirmation &&
          !showConfirmation &&
          renderProgressIndicator()}
      </View>

      {/* Scrollable Content */}
      <ScrollView
        className="flex-1 px-6"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        {showConfirmation ? (
          renderBookingConfirmation()
        ) : showBookingConfirmation ? (
          renderBookingConfirmationPage()
        ) : showPayment ? (
          renderPaymentMethods()
        ) : showSummary ? (
          renderOrderSummary()
        ) : (
          <>
            {/* Content based on current step */}
            {currentStep === 1 && (
              <View className="flex-1">
                {renderDropdownField(
                  "Service Type",
                  "serviceType",
                  "Standard, Same day, Overnight",
                  "cube-outline",
                  serviceTypes
                )}

                {renderDropdownField(
                  "Courier Collection Type",
                  "collectionType",
                  "Pickup, Drop-off",
                  "folder-outline",
                  collectionTypes
                )}

                {renderDropdownField(
                  "Sender Entry",
                  "senderEntry",
                  "Individual, Corporate",
                  "person-outline",
                  senderEntries
                )}
              </View>
            )}

            {currentStep === 2 && renderStep2()}

            {currentStep === 3 && renderStep3()}

            {currentStep === 4 && renderStep4()}

            {currentStep === 5 && renderStep5()}
          </>
        )}
      </ScrollView>

      {/* Fixed Next Button positioned above tabs */}
      <View
        className="px-6 pb-4 bg-white"
        style={{ paddingBottom: insets.bottom + 16 }}
      >
        {showConfirmation ? (
          <View className="flex gap-4">
            {/* Track Your Order Button */}
            <TouchableOpacity
              onPress={handleTrackOrder}
              className="bg-[#1141AF] rounded-2xl py-4"
            >
              <Text className="text-white font-bold text-lg text-center">
                Track Your order
              </Text>
            </TouchableOpacity>

            {/* Back to Home Button */}
            <TouchableOpacity
              onPress={handleBackToHome}
              className="bg-white border-2 border-gray-300 rounded-2xl py-4"
            >
              <Text className="text-[#1141AF] font-bold text-lg text-center">
                Back to Home
              </Text>
            </TouchableOpacity>
          </View>
        ) : showBookingConfirmation ? (
          <TouchableOpacity
            onPress={handleProceedToCompletion}
            className="bg-white border-2 border-[#1141AF] rounded-2xl py-4"
          >
            <Text className="text-[#1141AF] font-bold text-lg text-center">
              Back to Home
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={
              showPayment
                ? handlePaymentComplete
                : showSummary
                  ? handleConfirmOrder
                  : handleNext
            }
            className="bg-[#1141AF] rounded-2xl py-4"
          >
            <Text className="text-white font-bold text-lg text-center">
              {showPayment
                ? "Proceed to pay"
                : showSummary
                  ? "Confirm Order"
                  : currentStep === 5
                    ? "Complete"
                    : "Next"}
            </Text>
          </TouchableOpacity>
        )}
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
