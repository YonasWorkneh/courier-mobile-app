import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // ✅ Safely access backend message

    const backendMessage = error.response?.data?.message || error.message;

    // Handle unauthorized
    if (error.response?.status === 401) {
      await AsyncStorage.multiRemove(["accessToken", "refreshToken", "user"]);
      // You can trigger logout navigation here if needed
    }

    // ✅ Re-throw a clean error with backend message
    return Promise.reject({
      message: backendMessage,
      status: error.response?.status,
      data: error.response?.data,
    });
  }
);

export default api;
