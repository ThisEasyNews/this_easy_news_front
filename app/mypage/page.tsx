'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
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
  LogOut
} from "lucide-react";
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';

// Mock data for initial state
const INITIAL_USER = {
  name: "김이지",
  email: "easy.kim@thisnews.com",
  avatar: "https://images.unsplash.com/photo-1668707490307-3d95fb1d2c14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwcm9maWxlJTIwcGVyc29uJTIwZGFyayUyMG1vZGUlMjBhdmF0YXJ8ZW58MXx8fHwxNzczMjA0Mjk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
  subscriptionDate: "2024.01.15",
};

const SUBSCRIBED_PUBLISHERS = [
  { id: 1, name: "중앙일보", logo: "https://images.unsplash.com/photo-1661956602116-aa6865609028?w=100&h=100&fit=crop" },
  { id: 2, name: "한국경제", logo: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=100&h=100&fit=crop" },
  { id: 3, name: "매일경제", logo: "https://images.unsplash.com/photo-1611974715853-2b8ef9674299?w=100&h=100&fit=crop" },
];

const SUBSCRIBED_CATEGORIES = [
  { id: "tech", name: "IT/테크", color: "bg-blue-500/20 text-blue-400" },
  { id: "economy", name: "경제", color: "bg-emerald-500/20 text-emerald-400" },
  { id: "society", name: "사회", color: "bg-purple-500/20 text-purple-400" },
];

export default function MyPagePage() {
  const [user, setUser] = useState(INITIAL_USER);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: user.name, email: user.email });
  const [activeTab, setActiveTab] = useState<"subscriptions" | "settings">("subscriptions");

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser({ ...user, ...editForm });
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Profile Section */}
      <section className="bg-[#1F2937]/50 rounded-2xl p-6 border border-gray-800/50">
        <div className="flex items-center gap-5">
          <div className="relative group">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#3B82F6]/30 group-hover:border-[#3B82F6] transition-colors">
              <ImageWithFallback
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            <button className="absolute bottom-0 right-0 bg-[#3B82F6] p-1.5 rounded-full text-white shadow-lg border border-[#111827]">
              <Edit2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex-1">
            {!isEditing ? (
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    {user.name}
                    <span className="px-2 py-0.5 bg-[#3B82F6]/10 text-[#3B82F6] text-[10px] font-bold rounded-full border border-[#3B82F6]/20 uppercase">
                      PRO
                    </span>
                  </h2>
                  <p className="text-sm text-gray-400 mt-0.5">{user.email}</p>
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-gray-500 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Settings className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleUpdateProfile} className="space-y-3">
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:border-[#3B82F6] outline-none"
                  placeholder="이름"
                  autoFocus
                />
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full bg-[#111827] border border-gray-700 rounded-lg px-3 py-1.5 text-sm focus:border-[#3B82F6] outline-none"
                  placeholder="이메일"
                />
                <div className="flex gap-2 pt-1">
                  <button 
                    type="submit"
                    className="bg-[#3B82F6] hover:bg-[#3B82F6]/90 text-white text-xs px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5"
                  >
                    <Check className="w-3.5 h-3.5" /> 저장
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-800 hover:bg-gray-700 text-gray-300 text-xs px-3 py-1.5 rounded-md font-medium flex items-center gap-1.5"
                  >
                    <X className="w-3.5 h-3.5" /> 취소
                  </button>
                </div>
              </form>
            )}
            {!isEditing && (
              <p className="text-[11px] text-gray-500 mt-3 flex items-center gap-1.5">
                <Bookmark className="w-3 h-3" /> {user.subscriptionDate} 부터 함께하는 중
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Toggle Tabs */}
      <div className="flex p-1 bg-[#1F2937]/30 rounded-xl border border-gray-800/30">
        <button
          onClick={() => setActiveTab("subscriptions")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === "subscriptions" 
            ? "bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/20" 
            : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Bell className="w-4 h-4" /> 구독 관리
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-lg transition-all ${
            activeTab === "settings" 
            ? "bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/20" 
            : "text-gray-400 hover:text-gray-200"
          }`}
        >
          <Settings className="w-4 h-4" /> 앱 설정
        </button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "subscriptions" ? (
          <motion.div
            key="subscriptions"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Categories */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#3B82F6]" /> 구독 중인 카테고리
                </h3>
                <button className="text-[11px] text-gray-500 hover:text-[#3B82F6]">편집하기</button>
              </div>
              <div className="flex flex-wrap gap-2">
                {SUBSCRIBED_CATEGORIES.map((cat) => (
                  <span 
                    key={cat.id} 
                    className={`px-3 py-1.5 rounded-full text-xs font-medium border border-white/5 shadow-sm ${cat.color}`}
                  >
                    {cat.name}
                  </span>
                ))}
                <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-gray-800/50 text-gray-500 border border-dashed border-gray-700 hover:border-gray-500 transition-colors">
                  + 카테고리 추가
                </button>
              </div>
            </div>

            {/* Publishers */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-200 flex items-center gap-2">
                  <Newspaper className="w-4 h-4 text-[#3B82F6]" /> 구독 중인 언론사
                </h3>
                <button className="text-[11px] text-gray-500 hover:text-[#3B82F6]">편집하기</button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {SUBSCRIBED_PUBLISHERS.map((pub) => (
                  <div 
                    key={pub.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#1F2937]/40 border border-gray-800/50 group hover:bg-[#1F2937]/60 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-800">
                        <ImageWithFallback src={pub.logo} alt={pub.name} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-sm font-medium text-gray-200">{pub.name}</span>
                    </div>
                    <button className="p-1.5 text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button className="flex items-center justify-center gap-2 p-3 rounded-xl border border-dashed border-gray-800 text-gray-500 text-sm hover:border-[#3B82F6]/50 hover:text-[#3B82F6] transition-all">
                   언론사 더 찾아보기 <ChevronRight className="w-4 h-4" />
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
              { icon: Bell, label: "푸시 알림 설정", value: "켬" },
              { icon: User, label: "개인정보 처리방침", value: "" },
              { icon: Settings, label: "버전 정보", value: "v1.0.4" },
            ].map((item, idx) => (
              <button 
                key={idx}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-[#1F2937]/20 border border-gray-800/30 hover:bg-[#1F2937]/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-gray-800/50 p-2 rounded-lg group-hover:bg-[#3B82F6]/10 group-hover:text-[#3B82F6] transition-colors">
                    <item.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-gray-300">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{item.value}</span>
                  <ChevronRight className="w-4 h-4 text-gray-700" />
                </div>
              </button>
            ))}
            
            <button className="w-full flex items-center gap-3 p-4 text-red-400/80 hover:text-red-400 text-sm mt-4">
              <LogOut className="w-4 h-4" /> 로그아웃
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
