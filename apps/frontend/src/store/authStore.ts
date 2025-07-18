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
  token: string | null;
  isLoading: boolean; // True when any auth operation (login, initializeAuth) is in progress
  error: string | null;
  isLoggedIn: boolean; // Derived state: true if user and token exist

  // Actions
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  // After login, we only set the token and a basic user (without profiles initially)
  setLoginSuccess: (token: string, user: UserDto) => void;
  // This action will update the user object in the store with the full MeResponseDto user and profiles
  setAuthData: (token: string, user: UserDto, profiles: MeResponseDto['profiles']) => void;
  logout: () => void;
  resetState: () => void;
}

/**
 * Zustand store for authentication state management.
 * Simplified logic for `setLoginSuccess` and new `setAuthData` for full user info.
 */
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isLoggedIn: false, // Initial state

  setLoading: (loading) => set({ isLoading: loading, error: null }),
  setError: (error) => set({ error, isLoading: false }),
  setLoginSuccess: (token, user) => {
    localStorage.setItem('authToken', token);
    // After initial login, we set a basic user object without profiles.
    // Profiles will be loaded by initializeAuth.
    const basicUser: UserState = { id: user.id, email: user.email };
    set({
      token,
      user: basicUser,
      isLoading: false,
      error: null,
      isLoggedIn: true,
    });
  },
  setAuthData: (token, user, profiles) => {
    localStorage.setItem('authToken', token); // Ensure token is in localStorage
    const fullUser: UserState = { ...user, profiles };
    set({
      token,
      user: fullUser,
      isLoading: false,
      error: null,
      isLoggedIn: true,
    });
  },
  logout: () => {
    localStorage.removeItem('authToken');
    set({
      user: null,
      token: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
    });
  },
  resetState: () => set({
    user: null,
    token: null,
    isLoading: false,
    error: null,
    isLoggedIn: false,
  }),
}));