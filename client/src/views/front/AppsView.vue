<template>
  <div>
    <!-- Banner -->
    <section class="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-r from-[#0F172A] to-[#1E50A0]">
      <div class="max-w-[1280px] mx-auto px-4 relative z-10 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-2 text-white">应用实例</h2>
        <p class="text-gray-300">探索八界机器人应用实例</p>
      </div>
    </section>

    <!-- 列表 -->
    <section class="py-10">
      <div class="max-w-[1280px] mx-auto px-4">
        <!-- 面包屑 -->
        <div class="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <router-link to="/" class="hover:text-[#1E50A0] transition-colors">首页</router-link>
          <i class="fa fa-chevron-right text-xs"></i>
          <span>应用实例</span>
        </div>

        <!-- 应用卡片网格 -->
        <div v-if="appsList.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="app in appsList"
            :key="app.id"
            :to="`/apps/${app.id}`"
            class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group block"
          >
            <div class="h-48 relative overflow-hidden">
              <img
                :src="app.coverImage || 'https://picsum.photos/600/300'"
                :alt="app.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div v-if="app.video" class="absolute inset-0 bg-black/20 flex items-center justify-center">
                <i class="fa fa-play-circle text-5xl text-white/80 group-hover:text-white transition-colors"></i>
              </div>
            </div>
            <div class="p-5">
              <div class="flex items-center gap-2 mb-2">
                <h3 class="font-semibold text-[#0F172A]">{{ app.title }}</h3>
                <span class="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">{{ app.version || 'v1.0.0' }}</span>
              </div>
              <p class="text-sm text-[#64748B] mb-3 truncate">{{ app.description || app.introduction || '' }}</p>
              <div class="flex items-center justify-between mb-3">
                <div class="flex items-center gap-4">
                  <div class="flex items-center gap-1.5">
                    <i class="fa fa-eye text-[#64748B] text-sm"></i>
                    <span class="text-xs text-[#64748B]">{{ app.views || 0 }}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <i class="fa fa-heart-o text-[#64748B] text-sm"></i>
                    <span class="text-xs text-[#64748B]">{{ app.likes || 0 }}</span>
                  </div>
                </div>
                <span class="text-xs text-gray-400">{{ formatDate(app.createdAt) }}</span>
              </div>
              <div v-if="parseTechStack(app.techStack).length" class="flex flex-wrap gap-2">
                <span v-for="t in parseTechStack(app.techStack)" :key="t" class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded">{{ t }}</span>
              </div>
            </div>
          </router-link>
        </div>

        <!-- 空状态 -->
        <div v-else-if="!loading" class="text-center py-12 text-gray-500">暂无应用实例</div>

        <!-- 加载中 -->
        <div v-if="loading" class="text-center py-10 text-gray-500">
          <i class="fa fa-spinner fa-spin text-2xl mb-2"></i>
          <p>加载中...</p>
        </div>

        <!-- 分页 -->
        <div v-if="total > pageSize" class="flex justify-center items-center gap-2 mt-8">
          <button @click="currentPage--" :disabled="currentPage <= 1" class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">上一页</button>
          <span class="text-sm text-gray-500">{{ currentPage }} / {{ totalPages }}</span>
          <button @click="currentPage++" :disabled="currentPage >= totalPages" class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">下一页</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { appsApi } from '@/api'

const appsList = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = 9
const total = ref(0)
const totalPages = ref(1)

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  return dateStr.split('T')[0] || dateStr.split(' ')[0] || ''
}

function parseTechStack(val: any): string[] {
  if (!val) return []
  if (typeof val === 'string') return val.split(',').map((s: string) => s.trim()).filter(Boolean)
  if (Array.isArray(val)) return val
  return []
}

async function fetchApps() {
  loading.value = true
  try {
    const res: any = await appsApi.getList(currentPage.value, pageSize)
    if (res.success) {
      appsList.value = res.data?.items || []
      total.value = res.data?.total || appsList.value.length
      totalPages.value = Math.ceil(total.value / pageSize) || 1
    }
  } catch (e) {
    console.error('加载应用实例失败:', e)
  } finally {
    loading.value = false
  }
}

watch(currentPage, () => { fetchApps() })

onMounted(() => {
  fetchApps()
})
</script>
