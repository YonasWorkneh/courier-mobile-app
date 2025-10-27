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

const serviceTypes = [
  { label: "Standard", value: "STANDARD" },
  { label: "Same Day", value: "SAME_DAY" },
  { label: "Overnight", value: "OVERNIGHT" },
  { label: "Express", value: "EXPRESS" },
];
const collectionTypes = [
  { label: "Pickup", value: "PICKUP" },
  { label: "Dropoff", value: "DROPOFF" },
];
const senderEntries = [
  { label: "Individual", value: "INDIVIDUAL" },
  { label: "Corporate", value: "CORPORATE" },
];

export const Step1: React.FC<Step1Props> = ({
  formData,
  errors,
  showDropdown,
  onFieldChange,
  onToggleDropdown,
}) => {
  const serviceTypeLabel = serviceTypes.find(
    (type) => type.value === formData.serviceType
  )?.label;
  const collectionTypeLabel = collectionTypes.find(
    (type) => type.value === formData.collectionType
  )?.label;
  const senderEntryLabel = senderEntries.find(
    (type) => type.value === formData.senderEntry
  )?.label;

  return (
    <View className="flex-1">
      <DropdownField
        label="Service Type"
        value={serviceTypeLabel || undefined}
        placeholder="Standard, Same Day, Overnight, Express"
        icon="cube-outline"
        options={serviceTypes}
        error={errors.serviceType}
        isOpen={showDropdown === "serviceType"}
        onToggle={() => onToggleDropdown("serviceType")}
        onSelect={(value) => onFieldChange("serviceType", value)}
      />

      <DropdownField
        label="Courier Collection Type"
        value={collectionTypeLabel || undefined}
        placeholder="Pickup, Drop-off"
        icon="folder-outline"
        options={collectionTypes}
        error={errors.collectionType}
        isOpen={showDropdown === "collectionType"}
        onToggle={() => onToggleDropdown("collectionType")}
        onSelect={(value) => onFieldChange("collectionType", value)}
      />

      <DropdownField
        label="Sender Entity"
        value={senderEntryLabel || undefined}
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
