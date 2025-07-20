// apps/frontend/src/lib/useSessionKeepAlive.ts
'use client';

import { useEffect, useRef } from 'react';
import { authServiceInstance } from './authServiceInstance';
import { useAuthStore } from '@/store/authStore';

const PING_INTERVAL_MS = process.env.PING_INTERVAL_MIN ? parseInt(process.env.PING_INTERVAL_MIN) * 60 * 1000 : 10 * 60 * 1000; // Ping every 10 minutes (less than 15m JWT expiry)

/**
 * Custom hook to periodically send a "keep-alive" ping to the backend
 * to refresh the JWT cookie and prevent session expiration during inactivity.
 *
 * @param isActive - Boolean indicating if the user is currently active (e.g., watching a video).
 */
export const useSessionKeepAlive = (isActive: boolean) => {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const { isLoggedIn } = useAuthStore();
  const authService = authServiceInstance;

  useEffect(() => {
    if (isLoggedIn && isActive) {
      console.log('Starting session keep-alive pings...');

      // Send an immediate ping when starting
      authService.keepSessionAlive().catch((err) => {
        console.error('Initial keep-alive ping failed:', err);
        // Error handling for initial ping is done within authService.keepSessionAlive
      });

      // Set up the interval for periodic pings
      intervalRef.current = setInterval(() => {
        console.log('Sending session keep-alive ping...');
        authService.keepSessionAlive().catch((err) => {
          // Error handling for periodic pings is done within authService.keepSessionAlive
          // If 401, it will logout and set error in store.
          console.error('Periodic keep-alive ping failed:', err);
        });
      }, PING_INTERVAL_MS);
    } else {
      // Clear the interval if not logged in or not active
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log('Stopped session keep-alive pings.');
      }
    }

    // Cleanup function: clear interval when component unmounts or dependencies change
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        console.log('Cleanup: Cleared session keep-alive pings.');
      }
    };
  }, [isLoggedIn, isActive, authService]); // Depend on isLoggedIn, isActive, and authService

  // You might want to expose a function to manually trigger a ping if needed
  // For example, when a video starts playing immediately.
  const triggerPing = () => {
    if (isLoggedIn) {
      authService.keepSessionAlive().catch((err) => {
        console.error('Manual keep-alive ping failed:', err);
      });
    }
  };

  return { triggerPing };
};