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
      },
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
   * Fetches the authenticated user's details and profiles.
   * @param token - The JWT authentication token.
   * @returns The user details and profiles.
   * @throws An error if the API call fails or returns an error status.
   */
  async getMe(token: string): Promise<MeResponseDto> {
    const response = await fetch(`/api/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
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
}