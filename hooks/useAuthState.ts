import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { User } from "../types/auth";

// Custom hook for authentication state management
export const useAuthState = () => {
  // Get current user
  const getUserQuery = useQuery<User | null>({
    queryKey: ["auth", "user"],
    queryFn: async () => {
      const userData = await AsyncStorage.getItem("user");
      return userData ? JSON.parse(userData) : null;
    },
    staleTime: Infinity,
  });

  // Check if user has access token
  const getAccessTokenQuery = useQuery<string | null>({
    queryKey: ["auth", "accessToken"],
    queryFn: async () => {
      return await AsyncStorage.getItem("accessToken");
    },
    staleTime: Infinity,
  });

  // Check if user has refresh token
  const getRefreshTokenQuery = useQuery<string | null>({
    queryKey: ["auth", "refreshToken"],
    queryFn: async () => {
      return await AsyncStorage.getItem("refreshToken");
    },
    staleTime: Infinity,
  });

  return {
    user: getUserQuery.data,
    accessToken: getAccessTokenQuery.data,
    refreshToken: getRefreshTokenQuery.data,
    isAuthenticated: !!getUserQuery.data && !!getAccessTokenQuery.data,
    isLoading: getUserQuery.isLoading || getAccessTokenQuery.isLoading,
    isError: getUserQuery.isError || getAccessTokenQuery.isError,
  };
};
