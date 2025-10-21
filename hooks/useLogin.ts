import { loginUser } from "@/lib/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthError, LoginCredentials, LoginResponse } from "../types/auth";

// Custom hook for login functionality
export const useLogin = () => {
  const queryClient = useQueryClient();

  const loginMutation = useMutation<LoginResponse, AuthError, LoginCredentials>(
    {
      mutationFn: loginUser,
      onSuccess: async (data) => {
        // Store tokens in AsyncStorage
        await AsyncStorage.setItem("accessToken", data.data.tokens.accessToken);
        await AsyncStorage.setItem(
          "refreshToken",
          data.data.tokens.refreshToken
        );
        await AsyncStorage.setItem("user", JSON.stringify(data.data.user));

        // Update query cache
        queryClient.setQueryData(["auth", "user"], data.data.user);
        queryClient.setQueryData(
          ["auth", "accessToken"],
          data.data.tokens.accessToken
        );
        queryClient.setQueryData(
          ["auth", "refreshToken"],
          data.data.tokens.refreshToken
        );
      },
      onError: (error) => {
        // console.log(error);


        // console.error("Login failed:", error);
      },
    }
  );

  const login = (credentials: LoginCredentials) => {
    return loginMutation.mutate(credentials);
  };

  return {
    login,
    isLoading: loginMutation.isPending,
    error: loginMutation.error,
    isSuccess: loginMutation.isSuccess,
    isError: loginMutation.isError,
    reset: loginMutation.reset,
  };
};
