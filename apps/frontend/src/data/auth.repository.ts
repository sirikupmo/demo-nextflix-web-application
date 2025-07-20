// apps/frontend/src/data/auth.repository.ts
import { LoginRequestDto, LoginResponseDto, MeResponseDto } from '../domain/dtos/auth.dto';
/**
 * AuthRepository handles all direct API interactions related to authentication.
 * It's part of the Data Layer, responsible for fetching raw data from the backend.
 */
export class AuthRepository {
  /**
   * Sends a login request to the backend.
   * @param credentials - User's email and password.
   * @returns The login response data (token and user info).
   * @throws An error if the API call fails or returns an error status.
   */
  async login(credentials: LoginRequestDto): Promise<LoginResponseDto> {
    const response = await fetch(`/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Client-Type': 'web',
      },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Login failed');
    }
    const result = await response.json();
    return result;
  }

  /**
   * Sends a logout request to the backend to clear the JWT cookie.
   * Includes 'credentials: include' to ensure the cookie is sent for clearing.
   */
  async logout(): Promise<void> {
    const response = await fetch(`/api/auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Crucial for sending cookies to be cleared
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Logout API Error Response:', errorData);
      throw new Error(errorData.message || 'Logout failed on backend');
    }
    console.log('Backend logout successful.');
  }

  /**
   * Fetches the authenticated user's details and profiles.
   * @param token - The JWT authentication token.
   * @returns The user details and profiles.
   * @throws An error if the API call fails or returns an error status.
   */
  async getMe(): Promise<MeResponseDto> {
    const response = await fetch(`/api/auth/me`, {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch user data');
    }

    const result = await response.json();
    console.log('AuthRepository - getMe API Response:', result);
    // The backend returns { data: { user: ..., profiles: [...] }, message: ... }
    return result;
  }

  async ping(): Promise<void> {
    const response = await fetch(`/api/auth/ping`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Ping failed with status: ${response.status}`);
    }
  }
}