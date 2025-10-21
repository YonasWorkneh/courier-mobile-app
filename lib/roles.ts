import { Role } from "../types/role";
import { api } from "./api";

export const getRoles = async (): Promise<Role[]> => {
  const response = await api.get("/roles");
  return response.data;
};
