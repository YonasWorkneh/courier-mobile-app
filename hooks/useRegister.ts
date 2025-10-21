import { registerUser } from "@/lib/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthError, RegisterData, RegisterResponse } from "../types/auth";

// Custom hook for register functionality
export const useRegister = () => {
  const queryClient = useQueryClient();

  const registerMutation = useMutation<
    RegisterResponse,
    AuthError,
    RegisterData
  >({
    mutationFn: registerUser,
    onSuccess: async (data) => {
      // Store user data in AsyncStorage (no tokens for register)
      await AsyncStorage.setItem("user", JSON.stringify(data.data));

      // Update query cache
      queryClient.setQueryData(["auth", "user"], data.data);
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const register = (userData: RegisterData) => {
    return registerMutation.mutate(userData);
  };

  return {
    register,
    isLoading: registerMutation.isPending,
    error: registerMutation.error,
    isSuccess: registerMutation.isSuccess,
    isError: registerMutation.isError,
    reset: registerMutation.reset,
  };
};
