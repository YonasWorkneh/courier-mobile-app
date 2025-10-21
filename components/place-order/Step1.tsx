import React from "react";
import { View } from "react-native";
import { FormData } from "../../types/place-order";
import { DropdownField } from "../forms/DropdownField";

interface Step1Props {
  formData: {
    serviceType: string;
    collectionType: string;
    senderEntry: string;
  };
  errors: {
    serviceType?: string;
    collectionType?: string;
    senderEntry?: string;
  };
  showDropdown: string | null;
  onFieldChange: (field: keyof FormData, value: string | boolean) => void;
  onToggleDropdown: (field: string) => void;
}

const serviceTypes = ["Standard", "Same day", "Overnight"];
const collectionTypes = ["Pickup", "Drop-off"];
const senderEntries = ["Individual", "Corporate"];

export const Step1: React.FC<Step1Props> = ({
  formData,
  errors,
  showDropdown,
  onFieldChange,
  onToggleDropdown,
}) => {
  return (
    <View className="flex-1">
      <DropdownField
        label="Service Type"
        value={formData.serviceType}
        placeholder="Standard, Same day, Overnight"
        icon="cube-outline"
        options={serviceTypes}
        error={errors.serviceType}
        isOpen={showDropdown === "serviceType"}
        onToggle={() => onToggleDropdown("serviceType")}
        onSelect={(value) => onFieldChange("serviceType", value)}
      />

      <DropdownField
        label="Courier Collection Type"
        value={formData.collectionType}
        placeholder="Pickup, Drop-off"
        icon="folder-outline"
        options={collectionTypes}
        error={errors.collectionType}
        isOpen={showDropdown === "collectionType"}
        onToggle={() => onToggleDropdown("collectionType")}
        onSelect={(value) => onFieldChange("collectionType", value)}
      />

      <DropdownField
        label="Sender Entry"
        value={formData.senderEntry}
        placeholder="Individual, Corporate"
        icon="person-outline"
        options={senderEntries}
        error={errors.senderEntry}
        isOpen={showDropdown === "senderEntry"}
        onToggle={() => onToggleDropdown("senderEntry")}
        onSelect={(value) => onFieldChange("senderEntry", value)}
      />
    </View>
  );
};
