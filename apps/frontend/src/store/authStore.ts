// apps/frontend/src/store/authStore.ts
import { create } from 'zustand';
import { MeResponseDto, UserDto } from '@/domain/dtos/auth.dto';


// Define the shape of the user data in the store
interface UserState {
  id: string;
  email: string;
  profiles?: MeResponseDto['profiles']; // profiles is part of UserState
}

// Define the shape of the authentication state
interface AuthState {
  user: UserState | null; // User data will be null initially, populated by getMe
  isLoading: boolean; // True when any auth operation (login, initializeAuth) is in progress
  error: string | null;
  isLoggedIn: boolean; // Derived state: true if user and token exist

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  // After login, we only set the token and a basic user (without profiles initially)
  setLoginSuccess: (user: UserDto) => void;
  // This action will update the user object in the store with the full MeResponseDto user and profiles
  setAuthData: (user: UserDto, profiles: MeResponseDto['profiles']) => void;
  logout: () => void;
  resetState: () => void;
}

/**
 * Zustand store for authentication state management.
 * Simplified logic for `setLoginSuccess` and new `setAuthData` for full user info.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,

  setLoading: (loading) => set({ isLoading: loading, error: null }),
  setError: (error) => set({ error, isLoading: false }),
  setLoginSuccess: (user) => {
    const basicUser: UserState = { id: user.id, email: user.email };
    set({
      user: basicUser,
      isLoading: false,
      error: null,
      isLoggedIn: true,
    });
  },
  setAuthData: (user, profiles) => {
    const fullUser: UserState = { ...user, profiles };
    set({
      user: fullUser,
      isLoading: false,
      error: null,
      isLoggedIn: true,
    });
  },
  logout: () => {
    set({
      user: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
    });
  },
  resetState: () => set({
    user: null,
    isLoading: false,
    error: null,
    isLoggedIn: false,
  }),
}));