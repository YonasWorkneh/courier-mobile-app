import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PlaceOrderSchema, placeOrderSchema } from "../schemas/placeOrder";

export const usePlaceOrderForm = (defaultValues: Partial<PlaceOrderSchema>) => {
  const form = useForm<PlaceOrderSchema>({
    resolver: zodResolver(placeOrderSchema),
    defaultValues: {
      paymentMethod: "BANK",
      ...defaultValues,
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return form;
};
