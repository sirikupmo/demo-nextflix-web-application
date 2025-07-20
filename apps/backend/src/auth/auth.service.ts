// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository, User } from '../data/user.repository';
import { ProfileService } from '../profile/profile.service';
import { Profile } from '../data/profile.repository';
import { JwtPayload } from './jwt.strategy';
/**
 * Service responsible for user authentication and JWT token generation.
 * Simulates user data storage and validation.
 */

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
    private readonly profileService: ProfileService,
  ) { }

  /**
   * Validates user credentials against mock data.
   * In a real application, this would interact with a database or user service.
   * @param email - User's email.
   * @param password - User's password.
   * @returns The user object (without password) if credentials are valid, otherwise null.
   */
  async validateUser(email: string, password: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.userRepository.findByEmail(email);

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
   * @param user - The validated user object (without password).
   * @returns An object containing the access token and user details.
   */
  async login(user: Omit<User, 'password'>, isWebClient: boolean) {
    // The payload for the JWT token.
    // It's good practice to include minimal, non-sensitive user data here.
    const payload: JwtPayload = { email: user.email, sub: user.id };
    let expiresIn: string;
    if (isWebClient) {
      expiresIn = process.env.JWT_EXPIRATION_TIME_SHOPT_LIVED || '15m' // Short-lived token for cookie-based web clients
    } else {
      expiresIn = process.env.JWT_EXPIRATION_TIME_LONG_LIVED || '60m'; // Longer-lived token for API clients (e.g., Postman)
    }

    const access_token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET || 'dev-secret',
      expiresIn: expiresIn,
    });

    const expiresInSeconds = this.parseExpiresInToSeconds(expiresIn);
    const expiresAt = new Date(Date.now() + expiresInSeconds * 1000);

    return {
      access_token: access_token,
      expires_at: expiresAt.getTime(),
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  /**
   * Retrieves the authenticated user's details and their associated profiles.
   * @param userId - The ID of the authenticated user.
   * @returns An object containing user details and a list of profiles.
   * @throws NotFoundException if the user is not found (though unlikely after JWT validation).
   */
  async getMe(userId: string): Promise<{ user: Omit<User, 'password'>; profiles: Profile[] }> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      // This case should ideally not happen if JWT validation is successful
      throw new UnauthorizedException('User not found.');
    }

    // Exclude password from the user object before returning
    const { password, ...userWithoutPassword } = user;

    const profiles = await this.profileService.getProfiles(userId);

    return {
      user: userWithoutPassword,
      profiles: profiles,
    };
  }

  private parseExpiresInToSeconds(expiresIn: string): number {
    const unit = expiresIn.slice(-1);
    const value = parseInt(expiresIn.slice(0, -1), 10);
    
    switch(unit) {
      case 's': return value; // วินาที
      case 'm': return value * 60; // นาที
      case 'h': return value * 60 * 60; // ชั่วโมง
      case 'd': return value * 60 * 60 * 24; // วัน
      default: return parseInt(expiresIn, 10) || 0; // ถ้าไม่มีหน่วย ให้ถือว่าเป็นวินาที
    }
  }
}

