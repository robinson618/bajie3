<template>
  <div class="min-h-screen flex bg-gray-50">
    <!-- 左侧边栏 -->
    <aside
      class="fixed top-0 left-0 h-full bg-dark text-white transition-all duration-300 z-40 flex flex-col"
      :class="sidebarCollapsed ? 'w-16' : 'w-60'"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center px-4 border-b border-white/10 flex-shrink-0">
        <div class="flex items-center gap-2 overflow-hidden">
          <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <span class="text-white font-bold text-sm">八</span>
          </div>
          <h1 v-show="!sidebarCollapsed" class="text-lg font-bold whitespace-nowrap">八界管理</h1>
        </div>
      </div>

      <!-- 菜单 -->
      <nav class="flex-1 py-4 overflow-y-auto">
        <ul class="space-y-1 px-2">
          <li v-for="item in menuItems" :key="item.path">
            <router-link
              :to="item.path"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm"
              :class="isActive(item.path) ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'"
              :title="sidebarCollapsed ? item.title : ''"
            >
              <span class="w-5 h-5 flex-shrink-0 flex items-center justify-center" v-html="item.icon"></span>
              <span v-show="!sidebarCollapsed" class="whitespace-nowrap">{{ item.title }}</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- 折叠按钮 -->
      <div class="p-3 border-t border-white/10 flex-shrink-0">
        <button
          class="w-full flex items-center justify-center py-2 rounded-lg hover:bg-white/5 transition-colors text-gray-400"
          @click="sidebarCollapsed = !sidebarCollapsed"
        >
          <svg class="w-5 h-5 transition-transform" :class="sidebarCollapsed ? 'rotate-180' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/></svg>
        </button>
      </div>
    </aside>

    <!-- 主内容区 -->
    <div class="flex-1 flex flex-col transition-all duration-300" :class="sidebarCollapsed ? 'ml-16' : 'ml-60'">
      <!-- 顶部栏 -->
      <header class="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 sticky top-0 z-30">
        <!-- 面包屑 -->
        <div class="flex items-center gap-2 text-sm text-neutral">
          <router-link to="/admin" class="hover:text-primary transition-colors">首页</router-link>
          <template v-if="currentMenuItem">
            <svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            <span class="text-dark">{{ currentMenuItem.title }}</span>
          </template>
        </div>

        <!-- 用户信息 -->
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-2 text-sm">
            <div class="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <svg class="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
            </div>
            <span class="text-dark font-medium">{{ userStore.user?.username || '管理员' }}</span>
          </div>
          <button
            @click="handleLogout"
            class="text-sm text-neutral hover:text-red-500 transition-colors flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            退出
          </button>
        </div>
      </header>

      <!-- 主内容 -->
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const sidebarCollapsed = ref(false);

const menuItems = [
  { title: '仪表盘', path: '/admin', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>' },
  { title: '资讯管理', path: '/admin/news', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>' },
  { title: '技能管理', path: '/admin/skills', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>' },
  { title: '应用管理', path: '/admin/apps', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>' },
  { title: '讨论管理', path: '/admin/discussions', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>' },
  { title: '文档管理', path: '/admin/documents', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>' },
  { title: 'FAQ管理', path: '/admin/faq', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3m.01 4h.01"/></svg>' },
  { title: '开源管理', path: '/admin/open-source', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>' },
  { title: '轮播图管理', path: '/admin/banners', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8m-4-4v4"/><circle cx="12" cy="10" r="2"/></svg>' },
  { title: '用户管理', path: '/admin/users', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87m-4-12a4 4 0 010 7.75"/></svg>' },
  { title: '站点配置', path: '/admin/site', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>' },
  { title: '导航菜单', path: '/admin/nav-menus', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>' },
  { title: 'Footer', path: '/admin/footer', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 15h18"/></svg>' },
  { title: '页面管理', path: '/admin/pages', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 8a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zm10 0a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z"/></svg>' },
  { title: 'SEO配置', path: '/admin/seo', icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>' },
];

const currentMenuItem = computed(() => {
  return menuItems.find((item) => item.path === route.path);
});

function isActive(path: string) {
  if (path === '/admin') return route.path === '/admin';
  return route.path.startsWith(path);
}

function handleLogout() {
  userStore.logout();
  router.push('/login');
}
</script>
