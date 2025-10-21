// Export all authentication hooks
export { useAuthState as useAuth } from "./useAuthState";
export { useLogin } from "./useLogin";
export { useLogout } from "./useLogout";
export { useRegister } from "./useRegister";

// Re-export types for convenience
export type { AuthError, LoginCredentials, RegisterData } from "../types/auth";
