// ❌ 'use client' 제거

import VisitorHomeContent from './VisitorHomeContent';
import MemberHomeContent from './MemberHomeContent';

// 지금은 백엔드 없으니까 강제로 false
const isAuthenticated = false;

export default function HomePageContent() {
  if (!isAuthenticated) {
    return <VisitorHomeContent />;
  }

  return <MemberHomeContent />;
}