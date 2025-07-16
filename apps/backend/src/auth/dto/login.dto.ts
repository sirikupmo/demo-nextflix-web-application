// src/auth/dto/login.dto.ts
import { IsEmail, IsString, MinLength } from 'class-validator';

/**
 * DTO for the login request body.
 * Contains validation rules for email and password.
 */
export class LoginDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}