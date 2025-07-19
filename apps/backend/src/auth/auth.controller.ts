// src/auth/auth.controller.ts
import { Controller, Get, Post, Body, HttpCode, HttpStatus, UseGuards, Request, Res, UsePipes, ValidationPipe, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Response } from 'express';
import { RefreshTokenInterceptor } from './refresh-token.interceptor';
/**
 * Controller for authentication-related endpoints.
 * Handles the 'auth/login' API route.
 */
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /**
   * Handles user login.
   * If X-Client-Type: web header is present, sets JWT as an HttpOnly cookie.
   * Otherwise, returns JWT in the response body.
   * @param loginDto - The login credentials (email and password).
   * @param res - The Express response object for setting cookies.
   * @param req - The Express request object to check headers.
   * @returns An object containing the access token and user details (for non-web clients).
   * @throws UnauthorizedException if credentials are invalid.
   */
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async login(@Body() loginDto: LoginDto, @Res({ passthrough: true }) res: Response, @Request() req: Request | any) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    

    // Check if the client is a web application based on a custom header
    const isWebClient = req.headers['x-client-type'] === 'web';
    const { access_token, user: userData } = await this.authService.login(user, isWebClient);
    
    if (isWebClient) {
      console.log('AuthController - Web client detected, setting JWT as HttpOnly cookie.');
      // Set JWT as an HttpOnly cookie for web clients
      res.cookie('jwt', access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Use secure in production (HTTPS)
        maxAge: process.env.COOKIE_MAX_AGE_MIN ? parseInt(process.env.COOKIE_MAX_AGE_MIN) * 60 * 1000 : 60 * 60 * 1000, 
        sameSite: 'lax', // Protect against CSRF
        path: '/', 
      });
      // For web clients, we don't return the token in the body, just a success message
      return { user: userData };
    } else {
      // For other clients (e.g., mobile apps), return the token in the body
      console.log('AuthController - Non-web client detected, returning JWT in response body.');
      return { access_token, user: userData };
    }
  }

  /**
   * Logs out the user by clearing the JWT cookie.
   * This endpoint is primarily for web clients.
   * @param res - The Express response object for clearing cookies.
   * @returns A success message.
   */
  @UseGuards(JwtAuthGuard) // Ensure only authenticated users can logout
  @UseInterceptors(RefreshTokenInterceptor)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/', 
    });
    return { message: 'Logout successful, JWT cookie cleared.' };
  }

  /**
   * Retrieves the authenticated user's own data and their list of profiles.
   * This endpoint requires a valid JWT token.
   * @param req - The request object, containing user details from the JWT payload.
   * @returns An object containing the user's details and their profiles.
   */
  @UseGuards(JwtAuthGuard) // Protect this endpoint with JWT authentication
  @UseInterceptors(RefreshTokenInterceptor) 
  @Get('me')
  async getMe(@Request() req: any) {
    // req.user contains the payload returned by JwtStrategy.validate()
    const userId = (req.user as any).userId;
    const data = await this.authService.getMe(userId);
    return data;
  }

  /**
   * A lightweight authenticated endpoint for client-side "keep-alive" pings.
   * Its primary purpose is to trigger the RefreshTokenMiddleware to refresh the JWT cookie.
   * @returns A simple success message.
   */
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(RefreshTokenInterceptor) 
  @Get('ping')
  @HttpCode(HttpStatus.OK)
  ping() {
    console.log('AuthController - Ping endpoint hit, session is active.');
    return { message: 'Auth session active.' };
  }
}