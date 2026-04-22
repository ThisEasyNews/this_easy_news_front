'use client';

import GuestHomePageContent from './GuestHomePageContent';
import MemberHomePageContent from './MemberHomePageContent';
import { useAuth } from '../../_providers/AuthProvider';

export default function HomePageContent() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-500">로딩 중...</p>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <GuestHomePageContent />;
  }

  return <MemberHomePageContent />;
}