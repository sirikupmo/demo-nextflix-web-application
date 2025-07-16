// src/data/profile.repository.ts
import { Injectable } from '@nestjs/common';

/**
 * Interface for a Profile entity.
 * Defines the structure of a user's profile.
 */
export interface Profile {
  id: string;
  userId: string; // Links to the User ID
  name: string;
  avatarUrl: string;
}

/**
 * ProfileRepository acts as the Data Layer for profile-related operations.
 * It uses a hardcoded array to simulate a data source (like a database or external API).
 * Only read operations are supported.
 */
@Injectable()
export class ProfileRepository {
  // Mock profile data
  private profiles: Profile[] = [
    { id: 'p1', userId: 'user1', name: 'A', avatarUrl: 'https://placehold.co/100x100/FF5733/FFFFFF?text=MP' },
    { id: 'p2', userId: 'user1', name: 'B', avatarUrl: 'https://placehold.co/100x100/33FF57/FFFFFF?text=GP' },
    { id: 'p3', userId: 'user1', name: 'C', avatarUrl: 'https://placehold.co/100x100/3357FF/FFFFFF?text=AP' },
    { id: 'p4', userId: 'user2', name: 'D', avatarUrl: 'https://placehold.co/100x100/A020F0/FFFFFF?text=WP' },
    { id: 'p5', userId: 'user2', name: 'F', avatarUrl: 'https://placehold.co/100x100/FFD700/000000?text=RP' },
    { id: 'p6', userId: 'user2', name: 'G', avatarUrl: 'https://placehold.co/100x100/808080/FFFFFF?text=G1' },
    { id: 'p7', userId: 'user2', name: 'H', avatarUrl: 'https://placehold.co/100x100/800080/FFFFFF?text=G2' },
  ];

  /**
   * Finds all profiles belonging to a specific user.
   * @param userId - The ID of the user.
   * @returns An array of profiles for the given user.
   */
  async findAllByUserId(userId: string): Promise<Profile[]> {
    return this.profiles.filter(profile => profile.userId === userId);
  }

  /**
   * Finds a specific profile by its ID and ensures it belongs to the given user.
   * @param id - The ID of the profile.
   * @param userId - The ID of the user who owns the profile.
   * @returns The profile object if found and owned by the user, otherwise undefined.
   */
  async findById(id: string, userId: string): Promise<Profile | undefined> {
    return this.profiles.find(profile => profile.id === id && profile.userId === userId);
  }
}