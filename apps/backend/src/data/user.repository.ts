// src/data/user.repository.ts
import { Injectable } from '@nestjs/common';

/**
 * Interface for a User entity, representing the structure of user data.
 * This can be extended as needed.
 */
export interface User {
  id: string; // User ID can be a number or string
  email: string;
  password?: string; // Password might be optional if not always fetched or for security
}

/**
 * UserRepository acts as the Data Layer for user-related operations.
 * Currently, it uses a hardcoded array to simulate a data source.
 * In a real application, this would interact with a database or external user service.
 */
@Injectable()
export class UserRepository {
  // Mock user data simulating a JSON response from an external source
  private readonly mockUsers: User[] = [
    {
      id: 'user1',
      email: 'user@example.com',
      password: '123456', // In a real app, this would be hashed and stored securely
    },
    {
      id: 'user2',
      email: 'user2@example.com',
      password: '123456',
    }
  ];

  /**
   * Finds a user by their email address.
   * Simulates fetching a user record from a data source.
   * @param email - The email of the user to find.
   * @returns The user object if found, otherwise undefined.
   */
  async findByEmail(email: string): Promise<User | undefined> {
    // In a real scenario, this would be a database query or an API call
    return this.mockUsers.find(user => user.email === email);
  }

  /**
   * Finds a user by their ID.
   * Simulates fetching a user record from a data source.
   * @param id - The ID of the user to find.
   * @returns The user object if found, otherwise undefined.
   */
  async findById(id: string): Promise<User | undefined> {
    // In a real scenario, this would be a database query or an API call
    return this.mockUsers.find(user => user.id === id);
  }

  // You could add more methods here like createUser, updateUser, deleteUser etc.
}