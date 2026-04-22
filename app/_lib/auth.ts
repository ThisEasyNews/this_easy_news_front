import type { ApiResponse, User } from '../_types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchMe(): Promise<User | null> {
  if (!BASE_URL) {
    console.log('BASE_URL 없음');
    return null;
  }

  try {
    const response = await fetch(`${BASE_URL}/api/users/me`, {
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    });

    console.log('users/me status:', response.status);

    if (response.status === 401) {
      console.log('401이라서 null 반환');
      return null;
    }

    if (!response.ok) {
      console.log('response not ok');
      return null;
    }

    const result: ApiResponse<User> = await response.json();
    console.log('users/me result:', result);

    if (!result.success) {
      console.log('success false');
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('fetchMe error:', error);
    return null;
  }
}