export type User = {
  id: number;
  email: string | null;
  name: string;
  nickname?: string | null;
  profileImageUrl?: string | null;
  roleCode?: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
};