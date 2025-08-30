import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-07010df2`;

interface FoodItem {
  id: string;
  name: string;
  level: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

class ApiClient {
  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${publicAnonKey}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Error: ${response.status} - ${errorText}`);
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }

  // Leftover food API methods
  async getLeftoverFoods(): Promise<FoodItem[]> {
    try {
      return await this.request('/leftovers');
    } catch (error) {
      console.error('Error fetching leftover foods:', error);
      return [];
    }
  }

  async createLeftoverFood(food: { name: string; level: number; description: string }): Promise<FoodItem> {
    return this.request('/leftovers', {
      method: 'POST',
      body: JSON.stringify(food),
    });
  }

  async updateLeftoverFood(id: string, updates: Partial<{ name: string; level: number; description: string }>): Promise<FoodItem> {
    return this.request(`/leftovers/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    });
  }

  async deleteLeftoverFood(id: string): Promise<void> {
    return this.request(`/leftovers/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient();
export type { FoodItem };