// src/auth/auth.controller.ts
import { Controller, Post, Body, HttpCode, HttpStatus, UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

/**
 * Controller for authentication-related endpoints.
 * Handles the 'auth/login' API route.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user login.
   * Validates the request body and returns a JWT token upon successful authentication.
   * @param loginDto - The login credentials (email and password).
   * @returns An object containing the access token and user details.
   * @throws UnauthorizedException if credentials are invalid.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK) // Ensure successful login returns 200 OK
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true })) // Apply validation pipe
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }
}