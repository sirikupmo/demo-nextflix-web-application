// apps/frontend/src/domain/dtos/auth.dto.ts
/**
 * DTO for the login request payload.
 */
export interface LoginRequestDto {
  email: string;
  password: string;
}

/**
 * DTO for the user object returned in login and me responses.
 * 'roles' property has been removed.
 */
export interface UserDto {
  id: string;
  email: string;
}

/**
 * DTO for the login response payload.
 * Uses the updated UserDto.
 */
export interface LoginResponseDto {
  access_token: string;
  user: UserDto; // Now uses UserDto
}

/**
 * DTO for the /auth/me response payload.
 * Uses the updated UserDto and includes profiles.
 */
export interface MeResponseDto {
  user: UserDto; // Now uses UserDto
  profiles: {
    id: string;
    userId: string;
    name: string;
    avatarUrl: string;
  }[];
}