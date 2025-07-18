// apps/frontend/src/domain/auth.service.ts
import { AuthRepository } from '@/data/auth.repository';
import { useAuthStore } from '@/store/authStore';
import { LoginRequestDto } from './dtos/auth.dto';

/**
 * AuthService handles the business logic for authentication.
 * It interacts with the AuthRepository (Data Layer) and updates the AuthStore (State Management).
 * This is part of the Domain Layer.
 */
export class AuthService {
  private authRepository: AuthRepository;

  constructor() {
    this.authRepository = new AuthRepository();
  }

  /**
   * Handles the user login process.
   * Sets loading state, calls the repository, updates success/error state.
   * NOTE: This method now ONLY performs login and sets basic user info.
   * It does NOT fetch user profiles immediately. Profiles will be fetched
   * when accessing protected routes via initializeAuth.
   * @param credentials - User's email and password.
   */
  async login(credentials: LoginRequestDto): Promise<void> {
    const { setLoading, setError, setLoginSuccess } = useAuthStore.getState();
    setLoading(true);

    try {
      const loginResponse = await this.authRepository.login(credentials);
      console.log('AuthService - Login API Response (processed):', loginResponse);

      setLoginSuccess(loginResponse.user);

    } catch (error: unknown) { // Changed to unknown
      console.error('AuthService - Login error caught:', error);
      // Safely access error message
      setError((error as Error).message || 'An unknown error occurred during login.');
    } finally {
      setLoading(false);
      console.log('AuthService - Login process finished.');
    }
  }

  /**
   * Handles the user logout process.
   * Clears authentication data from the store.
   */
  async logout(): Promise<void> {
    const { logout: storeLogout, setError } = useAuthStore.getState();
    try {
      await this.authRepository.logout(); // Call backend to clear cookie
      storeLogout(); // Clear frontend state
      console.log('Frontend and Backend logout successful.');
    } catch (error: unknown) {
      console.error('AuthService - Logout error caught:', error);
      setError((error as Error).message || 'An unknown error occurred during logout.');
      storeLogout(); // Still clear frontend state even if backend fails to ensure consistency
    }
  }

  /**
   * Attempts to re-authenticate the user using a stored token (e.g., on page reload or accessing protected route).
   * Fetches user data and profiles if a valid token is found.
   * This method is crucial for protected routes and is the ONLY place fetching /auth/me.
   *
   * This method is now designed to be called repeatedly by protected layouts.
   * It will always perform the /auth/me API call if a token is found,
   * ensuring user data (including profiles) is always fresh.
   */
  async initializeAuth(): Promise<void> {
    const { isLoading, setLoading, setError, setAuthData, logout } = useAuthStore.getState();

    // Prevent re-running if already loading
    if (isLoading) {
      console.log('initializeAuth: Already loading. Skipping.');
      return;
    }

    setLoading(true); // Set loading state for the check

    try {
      console.log('initializeAuth: Token found, fetching /auth/me...');
      const meData = await this.authRepository.getMe();

      // *** ADDED ROBUST CHECKS HERE ***
      if (!meData || !meData.user || !meData.profiles) {
        console.error('initializeAuth: Incomplete or malformed meData received:', meData);
        throw new Error('Invalid or incomplete user data received from /auth/me API');
      }

      // console.log('initializeAuth: meData fetched and validated:', meData);

      // Set all authentication data (token, user, profiles) in one go
      setAuthData(meData.user, meData.profiles);
      
    } catch (error: unknown) { // Changed to unknown
      // console.error('AuthService - initializeAuth error caught:', error);
      logout(); // Clear invalid token
      // Safely access error message
      setError((error as Error).message || 'Session expired. Please log in again.');
    } finally {
      setLoading(false); // Clear loading state
      console.log('initializeAuth: Auth check finished.');
    }
  }
}