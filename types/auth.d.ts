export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  role: string;
  password: string;
  phone: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  branchId: string | null;
  createdAt: string;
  updatedAt: string;
  emailVerified: boolean;
  roleId: string | null;
  isStaff: boolean;
  isSuperAdmin: boolean;
  customerType: string | null;
  role?: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  data: User;
}

export interface AuthError {
  message: string;
  status?: number;
}
