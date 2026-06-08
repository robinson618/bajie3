<template>
  <div>
    <!-- Hero 轮播图区域 -->
    <section class="relative h-[500px] lg:h-[600px] bg-dark flex items-center justify-center overflow-hidden">
      <div class="relative w-full h-full">
        <!-- 轮播幻灯片 -->
        <div
          v-for="(banner, index) in banners"
          :key="banner.id"
          v-show="currentSlide === index"
          class="absolute inset-0 flex items-center justify-center transition-opacity duration-500"
          :class="currentSlide === index ? 'opacity-100' : 'opacity-0'"
        >
          <div class="absolute inset-0">
            <img :src="banner.image" class="w-full h-full object-cover opacity-60" :alt="banner.title" />
            <div class="absolute inset-0 bg-gradient-to-r from-primary/40 to-secondary/40"></div>
          </div>
          <div class="relative container mx-auto text-center px-4">
            <h2 class="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white mb-4" v-html="banner.title"></h2>
            <p v-if="banner.subtitle" class="text-gray-300 text-lg max-w-2xl mx-auto mb-8">{{ banner.subtitle }}</p>
            <div v-if="banner.link" class="flex flex-wrap justify-center gap-4">
              <a
                :href="banner.link"
                class="px-6 py-3 text-white rounded-md flex items-center gap-2 transition-all duration-300 hover:scale-105"
                style="background: linear-gradient(45deg, #578DFF, #1E50A0)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                了解更多
              </a>
            </div>
          </div>
        </div>

        <!-- 默认静态轮播（无数据时） -->
        <div
          v-if="banners.length === 0"
          class="absolute inset-0 flex items-center justify-center"
        >
          <div class="absolute inset-0 bg-gradient-to-br from-primary/80 to-dark"></div>
          <div class="relative container mx-auto text-center px-4">
            <h2 class="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white mb-4">
              链接<span class="text-white">具身智能</span>·赋能机器人生态
            </h2>
            <p class="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
              集云端仿真、开源开发、技术交流、项目孵化、需求对接于一体，服务全品类机器人开发者
            </p>
            <div class="flex flex-wrap justify-center gap-4">
              <router-link
                to="/docs"
                class="px-6 py-3 text-white rounded-md flex items-center gap-2 transition-all duration-300 hover:scale-105"
                style="background: linear-gradient(45deg, #578DFF, #1E50A0)"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                进入开发者平台
              </router-link>
              <router-link
                to="/discussions"
                class="px-6 py-3 border border-white/30 text-white rounded-md hover:bg-white/10 flex items-center gap-2 transition-all duration-300 hover:scale-105"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                技术讨论
              </router-link>
            </div>
          </div>
        </div>

        <!-- 轮播控制 -->
        <template v-if="banners.length > 1">
          <button
            class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            @click="prevSlide"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button
            class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
            @click="nextSlide"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
          <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
            <button
              v-for="(_, index) in banners"
              :key="index"
              class="w-3 h-3 rounded-full transition-all duration-300"
              :class="currentSlide === index ? 'bg-white' : 'bg-white/50 hover:bg-white/80'"
              @click="goToSlide(index)"
            ></button>
          </div>
        </template>
      </div>
    </section>

    <!-- 资讯区域 -->
    <section class="py-[70px] bg-white">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-sm mb-4 text-neutral">
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
            前沿资讯
          </span>
          <h3 class="text-3xl font-bold text-dark mb-4">前沿资讯</h3>
          <p class="text-neutral max-w-2xl mx-auto">实时同步具身智能领域前沿技术动态与行业资讯</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <router-link
            v-for="item in newsList"
            :key="item.id"
            :to="`/news/${item.id}`"
            class="rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group bg-white"
          >
            <img :src="item.cover_image || 'https://picsum.photos/600/338'" class="w-full aspect-video object-cover" :alt="item.title" />
            <div class="p-6 pt-4">
              <h4 class="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">{{ item.title }}</h4>
              <p class="text-neutral text-sm mb-4 min-h-[40px]">{{ item.summary || '' }}</p>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-400">{{ formatDate(item.created_at) }}</span>
                <span class="text-xs text-primary group-hover:translate-x-1 transition-transform">
                  <svg class="w-3 h-3 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  查看详情
                </span>
              </div>
            </div>
          </router-link>
        </div>
        <div v-if="newsList.length === 0" class="text-center py-10 text-neutral">
          <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/></svg>
          <p>暂无资讯</p>
        </div>
        <div class="text-center mt-10">
          <router-link to="/news" class="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02]">
            <span>查看更多内容</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </router-link>
        </div>
      </div>
    </section>

    <!-- 活动区域 -->
    <section class="py-[70px] bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="text-center mb-12">
          <span class="inline-block px-4 py-1.5 bg-gray-100 rounded-full text-sm mb-4 text-neutral">
            <svg class="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            活动广场
          </span>
          <h3 class="text-3xl font-bold text-dark mb-4">最新活动</h3>
          <p class="text-neutral max-w-2xl mx-auto">参与线上线下活动，与行业专家面对面交流</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="rounded-lg border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group bg-white"
          >
            <div class="relative">
              <img :src="activity.image || 'https://picsum.photos/600/300'" class="w-full h-40 object-cover" :alt="activity.title" />
              <span
                v-if="activity.status === 'live'"
                class="absolute top-3 left-3 text-xs bg-secondary text-white px-2 py-1 rounded-full animate-pulse"
              >直播中</span>
              <span
                v-else-if="activity.status === 'ongoing'"
                class="absolute top-3 left-3 text-xs bg-red-500 text-white px-2 py-1 rounded-full"
              >进行中</span>
            </div>
            <div class="p-5">
              <h4 class="font-semibold mb-2 group-hover:text-primary transition-colors">{{ activity.title }}</h4>
              <p class="text-neutral text-sm">{{ activity.description }}</p>
              <div class="flex justify-between items-center mt-3">
                <span class="text-xs text-neutral">
                  <svg class="w-3 h-3 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  {{ activity.date }}
                </span>
                <span class="text-xs px-3 py-1 text-white rounded-md" :class="activity.status === 'live' ? 'bg-secondary' : 'bg-primary'">
                  {{ activity.status === 'live' ? '预约直播' : '立即报名' }}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div v-if="activities.length === 0" class="text-center py-10 text-neutral">
          <svg class="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          <p>暂无活动</p>
        </div>
      </div>
    </section>

    <!-- 统计数字区域 -->
    <section class="py-[70px] bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_40%,rgba(22,93,255,0.3),transparent_50%)]"></div>
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(123,97,255,0.25),transparent_50%)]"></div>
      <div class="container mx-auto px-4 relative">
        <div class="text-center mb-12">
          <h3 class="text-3xl font-bold text-white mb-4">平台数据</h3>
          <p class="text-gray-400 max-w-2xl mx-auto">持续增长的社区生态</p>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div class="text-center bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div class="text-4xl font-bold text-white mb-2">{{ stats.users }}+</div>
            <div class="text-gray-400 text-sm">注册用户</div>
          </div>
          <div class="text-center bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div class="text-4xl font-bold text-white mb-2">{{ stats.news }}+</div>
            <div class="text-gray-400 text-sm">技术资讯</div>
          </div>
          <div class="text-center bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div class="text-4xl font-bold text-white mb-2">{{ stats.skills }}+</div>
            <div class="text-gray-400 text-sm">Skill应用</div>
          </div>
          <div class="text-center bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            <div class="text-4xl font-bold text-white mb-2">{{ stats.apps }}+</div>
            <div class="text-gray-400 text-sm">应用实例</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部 CTA 区域 -->
    <section class="py-[70px] bg-white">
      <div class="container mx-auto px-4 text-center">
        <h3 class="text-3xl font-bold text-dark mb-4">加入八界开发者社区</h3>
        <p class="text-neutral max-w-2xl mx-auto mb-8">与全品类机器人开发者一起，共同推动具身智能产业发展</p>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/register"
            class="px-8 py-4 bg-primary text-white rounded-md hover:bg-primary/90 transition-all duration-300 hover:scale-[1.02] shadow-lg shadow-primary/30 font-medium"
          >
            立即注册
          </router-link>
          <router-link
            to="/docs"
            class="px-8 py-4 border-2 border-primary text-primary rounded-md hover:bg-primary/5 transition-all duration-300 hover:scale-[1.02] font-medium"
          >
            查看文档
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { commonApi } from '@/api/common';
import { newsApi } from '@/api/news';

interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  image: string;
  link?: string;
}

interface NewsItem {
  id: number;
  title: string;
  summary?: string;
  cover_image?: string;
  created_at: string;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  image?: string;
  date: string;
  status: string;
}

const banners = ref<Banner[]>([]);
const newsList = ref<NewsItem[]>([]);
const activities = ref<Activity[]>([]);
const currentSlide = ref(0);
const stats = ref({
  users: 5000,
  news: 200,
  skills: 80,
  apps: 120,
});

let autoPlayInterval: ReturnType<typeof setInterval> | null = null;

function nextSlide() {
  if (banners.value.length <= 1) return;
  currentSlide.value = (currentSlide.value + 1) % banners.value.length;
}

function prevSlide() {
  if (banners.value.length <= 1) return;
  currentSlide.value = (currentSlide.value - 1 + banners.value.length) % banners.value.length;
}

function goToSlide(index: number) {
  currentSlide.value = index;
  resetAutoPlay();
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayInterval = setInterval(nextSlide, 5000);
}

function stopAutoPlay() {
  if (autoPlayInterval) {
    clearInterval(autoPlayInterval);
    autoPlayInterval = null;
  }
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

function formatDate(dateStr: string) {
  if (!dateStr) return '';
  return dateStr.split('T')[0] || dateStr.split(' ')[0] || '';
}

onMounted(async () => {
  try {
    const [bannersRes, newsRes, statsRes]: any[] = await Promise.allSettled([
      commonApi.getBanners(),
      newsApi.getList(1, 4),
      commonApi.getStats(),
    ]);

    if (bannersRes.status === 'fulfilled' && bannersRes.value?.success) {
      banners.value = bannersRes.value.data || [];
      if (banners.value.length > 1) startAutoPlay();
    }

    if (newsRes.status === 'fulfilled' && newsRes.value?.success) {
      newsList.value = newsRes.value.data?.list || newsRes.value.data || [];
    }

    if (statsRes.status === 'fulfilled' && statsRes.value?.success) {
      stats.value = { ...stats.value, ...statsRes.value.data };
    }
  } catch {
    // 使用默认数据
  }
});

onUnmounted(() => {
  stopAutoPlay();
});
</script>
