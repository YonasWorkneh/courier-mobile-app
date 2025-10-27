import { z } from "zod";

// Enums aligned with your UI labels
export const serviceTypeEnum = z.enum([
  "STANDARD",
  "EXPRESS",
  "SAME_DAY",
  "OVERNIGHT",
]);
export const collectionTypeEnum = z.enum(["PICKUP", "DROPOFF"]);
export const shipmentTypeEnum = z.enum(["PARCEL", "COURIER"]);
export const destinationEnum = z.enum(["TOWN", "INTERNATIONAL", "REGIONAL"]);

// Base schema
export const placeOrderSchema = z
  .object({
    serviceType: serviceTypeEnum,
    collectionType: collectionTypeEnum,
    senderEntry: z.string().min(1, "Please select a sender entity"),

    shipmentType: shipmentTypeEnum,
    destination: destinationEnum,
    categories: z.array(z.string()).min(1, "Select at least one category"),

    quantity: z
      .string()
      .min(1, "Please enter quantity")
      .refine((v) => Number(v) > 0, "Quantity must be greater than 0"),
    weight: z
      .string()
      .min(1, "Please enter weight")
      .refine((v) => Number(v) > 0, "Weight must be greater than 0"),
    length: z.string().optional(),
    width: z.string().optional(),
    height: z.string().optional(),
    fragile: z.boolean(),
    unusualItem: z.boolean().optional(),

    name: z.string().min(1, "Please enter name"),
    email: z
      .string()
      .min(1, "Please enter email")
      .email("Please enter a valid email"),
    phoneNumber: z
      .string()
      .min(1, "Please enter phone number")
      .regex(/^\+?[0-9]{9,15}$/i, "Enter a valid phone number"),
    pickupAddress: z.string().min(1, "Please enter pickup address"),

    receiverName: z.string().min(1, "Please enter receiver name"),
    receiverEmail: z
      .string()
      .min(1, "Please enter receiver email")
      .email("Please enter a valid email"),
    receiverPhoneNumber: z
      .string()
      .min(1, "Please enter receiver phone number")
      .regex(/^\+?[0-9]{9,15}$/i, "Enter a valid phone number"),
    deliveryAddress: z.string().min(1, "Please enter delivery address"),

    paymentMethod: z.string().min(1),
  })
  .superRefine((data, ctx) => {
    // Dimensions required for International or National (your code also mentions Regional in some places)
    if (
      data.destination === "INTERNATIONAL" ||
      data.destination === "REGIONAL"
    ) {
      const fields: [keyof typeof data, string][] = [
        ["length", "Please enter length"],
        ["width", "Please enter width"],
        ["height", "Please enter height"],
      ];
      fields.forEach(([field, message]) => {
        const v = (data[field] as unknown as string) || "";
        if (!v || v.trim() === "") {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message,
          });
        } else if (Number(v) <= 0) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: [field],
            message: `${String(field)} must be greater than 0`,
          });
        }
      });
    }
  });

// Step field groupings for targeted validation
export const step1Fields = [
  "serviceType",
  "collectionType",
  "senderEntry",
] as const;
export const step2Fields = [
  "shipmentType",
  "destination",
  "categories",
] as const;
export const step3Fields = [
  "quantity",
  "weight",
  "length",
  "width",
  "height",
  "fragile",
  "unusualItem",
] as const;
export const step4Fields = [
  "name",
  "email",
  "phoneNumber",
  "pickupAddress",
] as const;
export const step5Fields = [
  "receiverName",
  "receiverEmail",
  "receiverPhoneNumber",
  "deliveryAddress",
] as const;

export type PlaceOrderSchema = z.infer<typeof placeOrderSchema>;
