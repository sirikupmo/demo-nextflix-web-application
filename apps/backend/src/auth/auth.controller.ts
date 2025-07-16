// src/auth/auth.controller.ts
import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Request, UsePipes, ValidationPipe, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
/**
 * Controller for authentication-related endpoints.
 * Handles the 'auth/login' API route.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

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

  /**
   * Retrieves the authenticated user's own data and their list of profiles.
   * This endpoint requires a valid JWT token.
   * @param req - The request object, containing user details from the JWT payload.
   * @returns An object containing the user's details and their profiles.
   */
  @UseGuards(JwtAuthGuard) // Protect this endpoint with JWT authentication
  @Get('me')
  async getMe(@Request() req: any) {
    // req.user contains the payload returned by JwtStrategy.validate()
    const userId = req.user.userId;
    const data = await this.authService.getMe(userId);
    return data;
  }
}