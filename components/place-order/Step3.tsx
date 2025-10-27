import { AntDesign, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import { FormData } from "../../types/place-order";
import { CheckboxField } from "../forms/CheckboxField";
import { InputField } from "../forms/InputField";

interface Step3Props {
  formData: {
    quantity: string;
    weight: string;
    length?: string;
    width?: string;
    height?: string;
    fragile: boolean;
    unusualItem?: boolean;
    destination: string;
  };
  errors: {
    quantity?: string;
    weight?: string;
    length?: string;
    width?: string;
    height?: string;
  };
  focusedInput: string | null;
  onFieldChange: (field: keyof FormData, value: string | boolean) => void;
  onFocus: (field: string) => void;
  onBlur: () => void;
}

export const Step3: React.FC<Step3Props> = ({
  formData,
  errors,
  focusedInput,
  onFieldChange,
  onFocus,
  onBlur,
}) => {
  const showDimensions =
    formData.destination === "INTERNATIONAL" ||
    formData.destination === "REGIONAL";

  return (
    <View className="flex-1">
      {/* Quantity */}
      <InputField
        label="Quantity"
        value={formData.quantity}
        placeholder="Quantity"
        icon={<FontAwesome6 name="hashtag" size={20} color="#1141AF" />}
        keyboardType="numeric"
        error={errors.quantity}
        focused={focusedInput === "quantity"}
        onChangeText={(text) => onFieldChange("quantity", text)}
        onFocus={() => onFocus("quantity")}
        onBlur={onBlur}
      />

      {/* Weight */}
      <InputField
        label="Weight"
        value={formData.weight}
        placeholder="Weight"
        icon={<FontAwesome5 name="weight" size={20} color="#1141AF" />}
        keyboardType="numeric"
        error={errors.weight}
        focused={focusedInput === "weight"}
        onChangeText={(text) => onFieldChange("weight", text)}
        onFocus={() => onFocus("weight")}
        onBlur={onBlur}
      />

      {/* Dimensions - only show if International or Regional */}
      {showDimensions && (
        <>
          {/* Length */}
          <InputField
            label="Length"
            value={formData.length || ""}
            placeholder="Length"
            icon={<FontAwesome5 name="ruler" size={20} color="#1141AF" />}
            keyboardType="numeric"
            error={errors.length}
            focused={focusedInput === "length"}
            onChangeText={(text) => onFieldChange("length", text)}
            onFocus={() => onFocus("length")}
            onBlur={onBlur}
          />

          {/* Width */}
          <InputField
            label="Width"
            value={formData.width || ""}
            placeholder="Width"
            icon={<AntDesign name="column-width" size={20} color="#1141AF" />}
            keyboardType="numeric"
            error={errors.width}
            focused={focusedInput === "width"}
            onChangeText={(text) => onFieldChange("width", text)}
            onFocus={() => onFocus("width")}
            onBlur={onBlur}
          />

          {/* Height */}
          <InputField
            label="Height"
            value={formData.height || ""}
            placeholder="Height"
            icon={<AntDesign name="column-height" size={24} color="#1141AF" />}
            keyboardType="numeric"
            error={errors.height}
            focused={focusedInput === "height"}
            onChangeText={(text) => onFieldChange("height", text)}
            onFocus={() => onFocus("height")}
            onBlur={onBlur}
          />
        </>
      )}

      {/* Checkboxes */}
      <View className="mt-6">
        <CheckboxField
          label="Fragile"
          checked={formData.fragile}
          onToggle={() => onFieldChange("fragile", !formData.fragile)}
        />
        <CheckboxField
          label="Unusual item"
          checked={formData.unusualItem || false}
          onToggle={() =>
            onFieldChange("unusualItem", !(formData.unusualItem || false))
          }
        />
      </View>
    </View>
  );
};
