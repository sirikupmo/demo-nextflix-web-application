// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

/**
 * Service responsible for user authentication and JWT token generation.
 * Simulates user data storage and validation.
 */

@Injectable()
export class AuthService {
  // Mock user data acting as a simple Data Layer for demonstration
  private readonly users = [
    {
      id: 1,
      email: 'user@example.com',
      password: '123456', // In a real app, this would be hashed
    }
  ];

  constructor(private readonly jwtService: JwtService) {}

  /**
   * Validates user credentials against mock data.
   * In a real application, this would interact with a database or user service.
   * @param email - User's email.
   * @param password - User's password.
   * @returns The user object if credentials are valid, otherwise null.
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = this.users.find(u => u.email === email);

    // In a real application, compare hashed passwords here (e.g., using bcrypt)
    if (user && user.password === password) {
      // Destructure to exclude password from the returned user object
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /**
   * Generates a JWT access token for a validated user.
   * @param user - The validated user object.
   * @returns An object containing the access token.
   */
  async login(user: any) {
    // The payload for the JWT token.
    // It's good practice to include minimal, non-sensitive user data here.
    const payload = { email: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }
}