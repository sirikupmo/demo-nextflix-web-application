// apps/backend/src/auth/refresh-token.interceptor.ts
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.strategy';
import { Request, Response } from 'express';

/**
 * RefreshTokenInterceptor is responsible for re-issuing a JWT cookie
 * on every successful authenticated request that originated from a web client (via cookie).
 * This implements a sliding session with a 1-hour inactivity timeout.
 *
 * This Interceptor runs AFTER Guards (like JwtAuthGuard), so req.user is available.
 */
@Injectable()
export class RefreshTokenInterceptor implements NestInterceptor {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const res = context.switchToHttp().getResponse<Response>();

    if ((req as any).user && (req as any).tokenExtractedFrom === 'cookie') {
      return next.handle().pipe(
        tap(() => {
          const userPayload: JwtPayload = {
            email: (req as any).user.email,
            sub: (req as any).user.userId,
          };

          const newToken = this.jwtService.sign(userPayload, {
            secret: process.env.JWT_SECRET || 'dev-secret',
            expiresIn: process.env.JWT_EXPIRATION_TIME_SHOPT_LIVED || '15m', // Internal JWT expiration (e.g., 15 minutes)
          });

          res.cookie('jwt', newToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure in production (HTTPS)
            maxAge: process.env.COOKIE_MAX_AGE_MIN ? parseInt(process.env.COOKIE_MAX_AGE_MIN) * 60 * 1000 : 60 * 60 * 1000,  // 1 hour in milliseconds (resets on every valid request)
            sameSite: 'lax', // Protect against CSRF
            path: '/', 
          });
          console.log('JWT cookie refreshed by Interceptor!');
        }),
      );
    } else {
      return next.handle();
    }
  }
}