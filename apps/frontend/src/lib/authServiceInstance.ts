// apps/frontend/src/lib/authServiceInstance.ts
import { AuthService } from '@/domain/auth.service';

/**
 * Global singleton instance of AuthService.
 * This ensures that only one instance of AuthService is created and used throughout the application,
 * promoting consistency and avoiding unnecessary re-instantiations.
 */
export const authServiceInstance = new AuthService();
