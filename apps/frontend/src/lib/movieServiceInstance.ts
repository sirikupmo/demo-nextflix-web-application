// apps/frontend/src/lib/movieServiceInstance.ts
import { MovieService } from '@/domain/movie.service';
/**
 * Global singleton instance of MovieService.
 * This ensures that only one instance of MovieService is created and used throughout the application,
 * promoting consistency and avoiding unnecessary re-instantiations.
 */
export const movieServiceInstance = new MovieService();