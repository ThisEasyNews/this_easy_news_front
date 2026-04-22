import type { User } from '../_types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchMe(): Promise<User | null> {
  if (!BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL 값이 없습니다.');
  }

  const response = await fetch(`${BASE_URL}/api/users/me`, {
    method: 'GET',
    credentials: 'include',
    cache: 'no-store',
  });

  if (response.status === 401) {
    return null;
  }

  if (!response.ok) {
    throw new Error('사용자 정보를 불러오지 못했습니다.');
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.message || '사용자 정보 조회 실패');
  }

  return result.data;
}