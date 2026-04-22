export type User = {
  id: number;
  email: string | null;
  name: string;
  nickname?: string | null;
  profileImageUrl?: string | null;
  onboardingCompleted?: boolean;
};

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};