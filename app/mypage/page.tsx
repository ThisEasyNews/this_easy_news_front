'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  User,
  Settings,
  Bell,
  Bookmark,
  ChevronRight,
  Edit2,
  Check,
  X,
  Newspaper,
  Layers,
  LogOut,
} from 'lucide-react';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useAuth } from '../_providers/AuthProvider';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// 아직 API 연결 전이므로 유지
const SUBSCRIBED_PUBLISHERS = [
  { id: 1, name: '중앙일보', logo: 'https://images.unsplash.com/photo-1661956602116-aa6865609028?w=100&h=100&fit=crop' },
  { id: 2, name: '한국경제', logo: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=100&h=100&fit=crop' },
  { id: 3, name: '매일경제', logo: 'https://images.unsplash.com/photo-1611974715853-2b8ef9674299?w=100&h=100&fit=crop' },
];

const SUBSCRIBED_CATEGORIES = [
  { id: 'tech', name: 'IT/테크', color: 'bg-blue-500/20 text-blue-400' },
  { id: 'economy', name: '경제', color: 'bg-emerald-500/20 text-emerald-400' },
  { id: 'society', name: '사회', color: 'bg-purple-500/20 text-purple-400' },
];

type EditForm = {
  name: string;
  email: string;
};

export default function MyPagePage() {
  const { user, isAuthenticated, isLoading, refreshAuth } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'settings'>('subscriptions');
  const [editForm, setEditForm] = useState<EditForm>({ name: '', email: '' });

  useEffect(() => {
    if (!user) return;

    setEditForm({
      name: user.nickname || user.name || '',
      email: user.email || '',
    });
  }, [user]);

  const displayName = useMemo(() => {
    if (!user) return '';
    return user.nickname || user.name || '사용자';
  }, [user]);

  const displayEmail = useMemo(() => {
    if (!user) return '';
    return user.email || '이메일 정보 없음';
  }, [user]);

  const displayAvatar = useMemo(() => {
    if (!user?.profileImageUrl) {
      return 'https://images.unsplash.com/photo-1668707490307-3d95fb1d2c14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwcm9maWxlJTIwcGVyc29uJTIwZGFyayUyMG1vZGUlMjBhdmF0YXJ8ZW58MXx8fHwxNzczMjA0Mjk2fDA&ixlib=rb-4.1.0&q=80&w=1080';
    }
    return user.profileImageUrl;
  }, [user]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!BASE_URL) {
      alert('NEXT_PUBLIC_API_URL 값이 없습니다.');
      return;
    }

    try {
      setIsSaving(true);

      // 백엔드 프로필 수정 API가 아직 없으면 이 부분은 주석 처리하고
      // setIsEditing(false)만 해도 됨
      const response = await fetch(`${BASE_URL}/api/users/me`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: editForm.name,
          email: editForm.email,
          nickname: editForm.name,
        }),
      });

      if (!response.ok) {
        throw new Error('프로필 수정에 실패했습니다.');
      }

      await refreshAuth();
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert('프로필 수정 API가 아직 없으면 이 기능은 잠시 보류하세요.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    if (!BASE_URL) {
      alert('NEXT_PUBLIC_API_URL 값이 없습니다.');
      return;
    }

    try {
      await fetch(`${BASE_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
    } catch (error) {
      console.error('logout error:', error);
    } finally {
      window.location.href = '/';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-8 pb-12">
        <section className="rounded-2xl border border-gray-800/50 bg-[#1F2937]/50 p-6">
          <p className="text-sm text-gray-400">사용자 정보를 불러오는 중...</p>
        </section>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="space-y-8 pb-12">
        <section className="rounded-2xl border border-gray-800/50 bg-[#1F2937]/50 p-6">
          <h2 className="text-xl font-bold text-white">로그인이 필요합니다</h2>
          <p className="mt-2 text-sm text-gray-400">
            마이페이지는 로그인 후 사용할 수 있어요.
          </p>
          <button
            onClick={() => {
              window.location.href = '/login';
            }}
            className="mt-4 rounded-xl bg-[#3B82F6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#2563eb]"
          >
            로그인하러 가기
          </button>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      <section className="rounded-2xl border border-gray-800/50 bg-[#1F2937]/50 p-6">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-[#3B82F6]/30 transition-colors group-hover:border-[#3B82F6]">
              <ImageWithFallback
                src={displayAvatar}
                alt={displayName}
                className="h-full w-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 rounded-full border border-[#111827] bg-[#3B82F6] p-1.5 text-white shadow-lg">
              <Edit2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="flex-1">
            {!isEditing ? (
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="flex items-center gap-2 text-xl font-bold">
                    {displayName}
                    <span className="rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/10 px-2 py-0.5 text-[10px] font-bold uppercase text-[#3B82F6]">
                      PRO
                    </span>
                  </h2>
                  <p className="mt-0.5 text-sm text-gray-400">{displayEmail}</p>
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-800 hover:text-white"
                >
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleUpdateProfile} className="space-y-3">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-[#111827] px-3 py-1.5 text-sm outline-none focus:border-[#3B82F6]"
                  placeholder="이름"
                  autoFocus
                />
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-[#111827] px-3 py-1.5 text-sm outline-none focus:border-[#3B82F6]"
                  placeholder="이메일"
                />
                <div className="flex gap-2 pt-1">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex items-center gap-1.5 rounded-md bg-[#3B82F6] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#3B82F6]/90 disabled:opacity-60"
                  >
                    <Check className="h-3.5 w-3.5" />
                    {isSaving ? '저장 중...' : '저장'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEditForm({
                        name: user.nickname || user.name || '',
                        email: user.email || '',
                      });
                      setIsEditing(false);
                    }}
                    className="flex items-center gap-1.5 rounded-md bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-300 hover:bg-gray-700"
                  >
                    <X className="h-3.5 w-3.5" />
                    취소
                  </button>
                </div>
              </form>
            )}
            {!isEditing && (
              <p className="mt-3 flex items-center gap-1.5 text-[11px] text-gray-500">
                <Bookmark className="h-3 w-3" />
                로그인된 계정으로 이용 중
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="flex rounded-xl border border-gray-800/30 bg-[#1F2937]/30 p-1">
        <button
          onClick={() => setActiveTab('subscriptions')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
            activeTab === 'subscriptions'
              ? 'bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/20'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Bell className="h-4 w-4" /> 구독 관리
        </button>
        <button
          onClick={() => setActiveTab('settings')}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-medium transition-all ${
            activeTab === 'settings'
              ? 'bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/20'
              : 'text-gray-400 hover:text-gray-200'
          }`}
        >
          <Settings className="h-4 w-4" /> 앱 설정
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'subscriptions' ? (
          <motion.div
            key="subscriptions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-200">
                  <Layers className="h-4 w-4 text-[#3B82F6]" /> 구독 중인 카테고리
                </h3>
                <button className="text-[11px] text-gray-500 hover:text-[#3B82F6]">편집하기</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {SUBSCRIBED_CATEGORIES.map((cat) => (
                  <span
                    key={cat.id}
                    className={`rounded-full border border-white/5 px-3 py-1.5 text-xs font-medium shadow-sm ${cat.color}`}
                  >
                    {cat.name}
                  </span>
                ))}
                <button className="rounded-full border border-dashed border-gray-700 bg-gray-800/50 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:border-gray-500">
                  + 카테고리 추가
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 text-sm font-bold text-gray-200">
                  <Newspaper className="h-4 w-4 text-[#3B82F6]" /> 구독 중인 언론사
                </h3>
                <button className="text-[11px] text-gray-500 hover:text-[#3B82F6]">편집하기</button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {SUBSCRIBED_PUBLISHERS.map((pub) => (
                  <div
                    key={pub.id}
                    className="group flex items-center justify-between rounded-xl border border-gray-800/50 bg-[#1F2937]/40 p-3 transition-colors hover:bg-[#1F2937]/60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded-lg bg-gray-800">
                        <ImageWithFallback src={pub.logo} alt={pub.name} className="h-full w-full object-cover" />
                      </div>
                      <span className="text-sm font-medium text-gray-200">{pub.name}</span>
                    </div>
                    <button className="p-1.5 text-gray-600 opacity-0 transition-opacity hover:text-red-400 group-hover:opacity-100">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button className="flex items-center justify-center gap-2 rounded-xl border border-dashed border-gray-800 p-3 text-sm text-gray-500 transition-all hover:border-[#3B82F6]/50 hover:text-[#3B82F6]">
                  언론사 더 찾아보기 <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="settings"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-2"
          >
            {[
              { icon: Bell, label: '푸시 알림 설정', value: '켬' },
              { icon: User, label: '개인정보 처리방침', value: '' },
              { icon: Settings, label: '버전 정보', value: 'v1.0.4' },
            ].map((item, idx) => (
              <button
                key={idx}
                className="group flex w-full items-center justify-between rounded-xl border border-gray-800/30 bg-[#1F2937]/20 p-4 transition-colors hover:bg-[#1F2937]/40"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-gray-800/50 p-2 transition-colors group-hover:bg-[#3B82F6]/10 group-hover:text-[#3B82F6]">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm text-gray-300">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{item.value}</span>
                  <ChevronRight className="h-4 w-4 text-gray-700" />
                </div>
              </button>
            ))}

            <button
              onClick={handleLogout}
              className="mt-4 flex w-full items-center gap-3 p-4 text-sm text-red-400/80 hover:text-red-400"
            >
              <LogOut className="h-4 w-4" /> 로그아웃
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}