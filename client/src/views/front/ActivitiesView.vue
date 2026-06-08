<template>
  <div>
    <!-- Banner -->
    <section class="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-r from-[#0F172A] to-[#1E50A0]">
      <div class="max-w-[1280px] mx-auto px-4 relative z-10 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-2 text-white">活动</h2>
        <p class="text-gray-300">参与线上线下活动，与行业专家面对面交流</p>
      </div>
    </section>

    <!-- 活动列表 -->
    <section class="py-10">
      <div class="max-w-[1280px] mx-auto px-4">
        <!-- 面包屑 -->
        <div class="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <router-link to="/" class="hover:text-[#1E50A0] transition-colors">首页</router-link>
          <i class="fa fa-chevron-right text-xs"></i>
          <span>活动</span>
        </div>

        <!-- 加载中 -->
        <div v-if="loading" class="text-center py-20">
          <div class="inline-block w-8 h-8 border-4 border-[#1E50A0] border-t-transparent rounded-full animate-spin"></div>
          <p class="mt-4 text-gray-400">加载中...</p>
        </div>

        <!-- 活动卡片 -->
        <div v-else-if="activities.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="activity in activities"
            :key="activity.id"
            class="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div class="relative">
              <img
                :src="activity.image || 'https://picsum.photos/600/300'"
                :alt="activity.title"
                class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span
                v-if="activity.status === 'live'"
                class="absolute top-3 left-3 text-xs bg-red-500 text-white px-2 py-1 rounded-full animate-pulse"
              >直播中</span>
              <span
                v-else-if="activity.status === 'ongoing'"
                class="absolute top-3 left-3 text-xs bg-green-500 text-white px-2 py-1 rounded-full"
              >进行中</span>
              <span
                v-else-if="activity.status === 'upcoming'"
                class="absolute top-3 left-3 text-xs bg-blue-500 text-white px-2 py-1 rounded-full"
              >即将开始</span>
              <span
                v-else
                class="absolute top-3 left-3 text-xs bg-gray-500 text-white px-2 py-1 rounded-full"
              >已结束</span>
            </div>
            <div class="p-5">
              <h4 class="font-semibold mb-2 group-hover:text-[#1E50A0] transition-colors line-clamp-1">{{ activity.title }}</h4>
              <p class="text-gray-500 text-sm mb-3 line-clamp-2">{{ activity.description }}</p>
              <div class="flex items-center gap-4 text-xs text-gray-400">
                <span class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                  {{ activity.date }}
                </span>
                <span v-if="activity.location" class="flex items-center gap-1">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {{ activity.location }}
                </span>
              </div>
              <div v-if="activity.participants" class="mt-2 text-xs text-gray-400">
                {{ activity.participants }} 人参与
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div v-else class="text-center py-20">
          <svg class="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          <p class="text-gray-400">暂无活动</p>
        </div>

        <!-- 分页 -->
        <div v-if="total > pageSize" class="flex justify-center items-center gap-2 mt-10">
          <button
            :disabled="page <= 1"
            @click="page--; loadActivities()"
            class="px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            上一页
          </button>
          <span class="text-sm text-gray-500">{{ page }} / {{ totalPages }}</span>
          <button
            :disabled="page >= totalPages"
            @click="page++; loadActivities()"
            class="px-4 py-2 rounded-lg border border-gray-200 text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            下一页
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { activitiesApi } from '@/api/activities';

interface Activity {
  id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  date: string;
  location?: string;
  image?: string;
  participants: number;
}

const activities = ref<Activity[]>([]);
const loading = ref(true);
const page = ref(1);
const pageSize = 9;
const total = ref(0);

const totalPages = computed(() => Math.ceil(total.value / pageSize));

async function loadActivities() {
  loading.value = true;
  try {
    const res: any = await activitiesApi.getList(page.value, pageSize);
    if (res.success) {
      activities.value = res.data?.items || res.data || [];
      total.value = res.data?.total || 0;
    }
  } catch {
    activities.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadActivities();
});
</script>
