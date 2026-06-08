<template>
  <div class="min-h-screen flex flex-col bg-light text-dark">
    <!-- 顶部导航栏 -->
    <header class="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div class="container mx-auto flex items-center justify-between h-16 px-4">
        <div class="flex items-center gap-8 flex-shrink-0">
          <!-- 移动端菜单按钮 -->
          <button class="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors" @click="mobileMenuOpen = true">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <!-- Logo -->
          <router-link to="/" class="hidden md:flex items-center gap-2">
            <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-sm">八</span>
            </div>
            <h1 class="text-lg font-bold text-dark">八界</h1>
          </router-link>
          <!-- 桌面端导航 -->
          <nav class="hidden md:flex items-center gap-1 text-sm">
            <template v-for="menu in navMenus" :key="menu.id">
              <router-link
                v-if="!menu.children?.length"
                :to="menu.url"
                class="px-4 py-5 hover:text-primary transition-colors"
                :class="isActive(menu.url) ? 'text-primary border-b-2 border-primary' : 'text-dark'"
              >
                {{ menu.title }}
              </router-link>
              <div v-else class="relative group">
                <a class="flex items-center gap-1 px-4 py-5 hover:text-primary transition-colors cursor-pointer" :class="isGroupActive(menu.children) ? 'text-primary' : 'text-dark'">
                  {{ menu.title }}
                  <svg class="w-3 h-3 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </a>
                <div class="absolute top-full left-0 min-w-48 bg-white rounded-lg shadow-xl border border-gray-100 py-2 opacity-0 invisible transition-all duration-200 group-hover:opacity-100 group-hover:visible">
                  <router-link
                    v-for="child in menu.children"
                    :key="child.id"
                    :to="child.url"
                    class="block px-4 py-2 hover:bg-gray-50 transition-colors text-dark"
                  >
                    {{ child.title }}
                  </router-link>
                </div>
              </div>
            </template>
          </nav>
        </div>

        <!-- 移动端 Logo -->
        <router-link to="/" class="md:hidden flex items-center gap-2">
          <div class="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xs">八</span>
          </div>
          <h1 class="text-base font-bold truncate">八界</h1>
        </router-link>

        <!-- 右侧按钮 -->
        <div class="flex items-center gap-3 flex-shrink-0">
          <template v-if="userStore.isLoggedIn">
            <router-link to="/admin" class="hidden md:block text-sm px-4 py-2 text-primary hover:bg-primary/5 rounded-lg transition-colors">
              管理后台
            </router-link>
            <button @click="handleLogout" class="text-sm px-4 py-2 text-neutral hover:text-dark transition-colors">退出</button>
          </template>
          <template v-else>
            <router-link to="/login" class="hidden md:block text-sm px-4 py-2 text-primary hover:bg-primary/5 rounded-lg transition-colors">登录</router-link>
            <router-link to="/register" class="hidden md:block text-sm px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors font-medium">注册</router-link>
          </template>
        </div>
      </div>
    </header>

    <!-- 移动端侧边栏 -->
    <Teleport to="body">
      <div v-if="mobileMenuOpen" class="fixed inset-0 z-50">
        <div class="fixed inset-0 bg-black/50" @click="mobileMenuOpen = false"></div>
        <div class="fixed top-0 left-0 w-72 h-full bg-white shadow-xl transform transition-transform duration-300">
          <div class="p-4 border-b border-gray-100 flex items-center justify-between">
            <span class="font-bold text-lg">导航菜单</span>
            <button class="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-lg" @click="mobileMenuOpen = false">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <nav class="p-4 space-y-1">
            <template v-for="menu in navMenus" :key="menu.id">
              <router-link
                v-if="!menu.children?.length"
                :to="menu.url"
                class="block px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors"
                @click="mobileMenuOpen = false"
              >
                {{ menu.title }}
              </router-link>
              <template v-else>
                <button class="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors" @click="toggleMobileSub(menu.id)">
                  <span>{{ menu.title }}</span>
                  <svg class="w-4 h-4 text-gray-400 transition-transform" :class="mobileExpanded === menu.id ? 'rotate-90' : ''" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </button>
                <div v-show="mobileExpanded === menu.id" class="bg-gray-50 rounded-lg mx-2 overflow-hidden">
                  <router-link
                    v-for="child in menu.children"
                    :key="child.id"
                    :to="child.url"
                    class="block px-6 py-2 hover:bg-gray-100 transition-colors"
                    @click="mobileMenuOpen = false"
                  >
                    {{ child.title }}
                  </router-link>
                </div>
              </template>
            </template>
          </nav>
          <div class="p-4 border-t border-gray-100 space-y-3">
            <template v-if="!userStore.isLoggedIn">
              <router-link to="/login" class="block w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center" @click="mobileMenuOpen = false">登录</router-link>
              <router-link to="/register" class="block w-full px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center" @click="mobileMenuOpen = false">注册</router-link>
            </template>
            <template v-else>
              <router-link to="/admin" class="block w-full px-4 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center" @click="mobileMenuOpen = false">管理后台</router-link>
              <button @click="handleLogout" class="block w-full px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-center">退出登录</button>
            </template>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- 主内容区 -->
    <main class="flex-1 pt-16">
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="bg-dark text-white pt-16 pb-10">
      <div class="container mx-auto px-4">
        <div class="flex flex-col lg:flex-row justify-between items-start gap-8 mb-8">
          <!-- Logo & Slogan -->
          <div class="w-full lg:w-auto">
            <div class="flex items-center gap-2 mb-2">
              <div class="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span class="text-white font-bold text-sm">八</span>
              </div>
              <h2 class="text-lg font-bold">八界</h2>
            </div>
            <p class="text-gray-400 text-sm mb-4">链接开发者·赋能具身智能产业</p>
          </div>

          <!-- 导航链接 -->
          <div class="flex flex-wrap gap-6 w-full lg:w-auto">
            <div>
              <h4 class="font-semibold mb-3 text-sm">快速导航</h4>
              <ul class="space-y-2 text-gray-400 text-sm">
                <li><router-link to="/" class="hover:text-white transition-colors">首页</router-link></li>
                <li><router-link to="/news" class="hover:text-white transition-colors">前沿资讯</router-link></li>
                <li><router-link to="/apps" class="hover:text-white transition-colors">应用实例</router-link></li>
                <li><router-link to="/skills" class="hover:text-white transition-colors">Skill应用市场</router-link></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-3 text-sm">开发者平台</h4>
              <ul class="space-y-2 text-gray-400 text-sm">
                <li><router-link to="/docs" class="hover:text-white transition-colors">文档中心</router-link></li>
                <li><router-link to="/open-source" class="hover:text-white transition-colors">开源中心</router-link></li>
                <li><router-link to="/faq" class="hover:text-white transition-colors">常见问题</router-link></li>
                <li><router-link to="/discussions" class="hover:text-white transition-colors">技术讨论</router-link></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-3 text-sm">创作者中心</h4>
              <ul class="space-y-2 text-gray-400 text-sm">
                <li><router-link to="/apps" class="hover:text-white transition-colors">应用实例</router-link></li>
                <li><router-link to="/skills" class="hover:text-white transition-colors">Skill应用市场</router-link></li>
              </ul>
            </div>
          </div>

          <!-- 联系方式 -->
          <div class="w-full lg:w-auto">
            <h4 class="font-semibold mb-3 text-sm">联系我们</h4>
            <ul class="space-y-3 text-gray-400">
              <li class="flex items-center gap-2 text-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                400-8078-999
              </li>
              <li class="flex items-center gap-2 text-sm">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                江苏省苏州市吴中区友翔路18号
              </li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2026 科沃斯八界 版权所有 | 苏ICP备12345678号</p>
        </div>
      </div>
    </footer>

    <!-- 右下角客服气泡 -->
    <div class="fixed bottom-8 right-8 z-50 cursor-pointer group" @click="showTechSupport = true">
      <div class="relative">
        <div class="absolute -top-12 -left-10 bg-white text-dark text-sm px-4 py-2 rounded-lg shadow-lg border border-gray-200 transition-all duration-300 opacity-0 group-hover:opacity-100">
          技术咨询
          <div class="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white border-r border-b border-gray-200"></div>
        </div>
        <div class="transition-all duration-300 group-hover:scale-110">
          <div class="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <div class="w-14 h-14 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          </div>
        </div>
      </div>
    </div>

    <!-- 技术咨询弹窗 -->
    <Teleport to="body">
      <div v-if="showTechSupport" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" @click.self="showTechSupport = false">
        <div class="bg-white rounded-xl w-full max-w-sm shadow-xl p-6 relative">
          <button class="absolute right-4 top-4 w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors" @click="showTechSupport = false">
            <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <div class="text-center">
            <h3 class="text-xl font-bold mb-4">技术咨询</h3>
            <div class="w-48 h-48 mx-auto mb-4 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
              <span class="text-gray-400 text-sm">企业微信二维码</span>
            </div>
            <p class="text-neutral text-sm mb-2">扫码添加企业微信</p>
            <p class="text-primary text-sm font-medium flex items-center justify-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              400-807-8999
            </p>
            <p class="text-gray-400 text-xs mt-4">工作时间：周一至周五 9:00-18:00</p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { commonApi } from '@/api/common';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const mobileMenuOpen = ref(false);
const mobileExpanded = ref<number | null>(null);
const showTechSupport = ref(false);

interface NavItem {
  id: number;
  title: string;
  url: string;
  children?: NavItem[];
}

const navMenus = ref<NavItem[]>([]);

function isActive(path: string) {
  return route.path === path;
}

function isGroupActive(children: NavItem[]) {
  return children.some((c) => route.path.startsWith(c.url));
}

function toggleMobileSub(id: number) {
  mobileExpanded.value = mobileExpanded.value === id ? null : id;
}

function handleLogout() {
  userStore.logout();
  router.push('/');
}

onMounted(async () => {
  try {
    const res: any = await commonApi.getNavMenus();
    if (res.success && res.data) {
      navMenus.value = res.data;
    }
  } catch {
    navMenus.value = [
      { id: 1, title: '首页', url: '/' },
      { id: 2, title: '前沿资讯', url: '/news' },
      {
        id: 3,
        title: '开发者平台',
        url: '',
        children: [
          { id: 31, title: '文档中心', url: '/docs' },
          { id: 32, title: '开源中心', url: '/open-source' },
          { id: 33, title: '常见问题', url: '/faq' },
        ],
      },
      { id: 4, title: '应用实例', url: '/apps' },
      { id: 5, title: 'Skill应用市场', url: '/skills' },
    ];
  }
});
</script>
