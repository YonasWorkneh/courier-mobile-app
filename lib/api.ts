import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Update with your API URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    // Add auth token if available
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      await AsyncStorage.removeItem("user");
      // You might want to redirect to login or show a modal
    }
    return Promise.reject(error);
  }
);

export default api;
