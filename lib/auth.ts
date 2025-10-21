import {
  LoginCredentials,
  LoginResponse,
  RegisterData,
  RegisterResponse,
} from "@/types/auth";
import { api } from "./api";

export const registerUser = async (
  userData: RegisterData
): Promise<RegisterResponse> => {
  const response = await api.post("/auth/register", userData);
  return response.data;
};

export const loginUser = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", credentials);
  return response.data;
};
