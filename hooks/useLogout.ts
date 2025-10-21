import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthError } from "../types/auth";

// Frontend-only logout function with simulated delay
const logoutUser = async (): Promise<void> => {
  // Simulate backend processing time
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Clear AsyncStorage
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("refreshToken");
  await AsyncStorage.removeItem("user");
};

// Custom hook for logout functionality
export const useLogout = () => {
  const queryClient = useQueryClient();

  const logoutMutation = useMutation<void, AuthError, void>({
    mutationFn: logoutUser,
    onSuccess: async () => {
      // Clear query cache to reset all auth-related state
      queryClient.clear();

      // Reset all auth-related queries to ensure fresh state
      queryClient.removeQueries({ queryKey: ["auth"] });
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.removeQueries({ queryKey: ["accessToken"] });
      queryClient.removeQueries({ queryKey: ["refreshToken"] });

      // Invalidate auth queries to trigger refetch with null values
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "accessToken"] });
      queryClient.invalidateQueries({ queryKey: ["auth", "refreshToken"] });
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  const logout = () => {
    return logoutMutation.mutate();
  };

  return {
    logout,
    isLoading: logoutMutation.isPending,
    error: logoutMutation.error,
    isSuccess: logoutMutation.isSuccess,
    isError: logoutMutation.isError,
    reset: logoutMutation.reset,
  };
};
