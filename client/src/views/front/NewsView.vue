<template>
  <div>
    <!-- Banner -->
    <section class="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-r from-[#0F172A] to-[#1E50A0]">
      <div class="max-w-[1280px] mx-auto px-4 relative z-10 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-2 text-white">前沿资讯</h2>
        <p class="text-gray-300">实时同步具身智能领域前沿技术动态与行业资讯</p>
      </div>
    </section>

    <!-- 分类筛选 + 列表 -->
    <section class="py-10">
      <div class="max-w-[1280px] mx-auto px-4">
        <!-- 面包屑 -->
        <div class="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <router-link to="/" class="hover:text-[#1E50A0] transition-colors">首页</router-link>
          <i class="fa fa-chevron-right text-xs"></i>
          <span>前沿资讯</span>
        </div>

        <!-- 分类标签 -->
        <div class="flex items-center gap-3 mb-8">
          <button
            v-for="cat in categories"
            :key="cat"
            @click="activeCategory = cat"
            :class="[
              'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
              activeCategory === cat
                ? 'bg-[#1E50A0] text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            ]"
          >
            {{ cat }}
          </button>
        </div>

        <!-- 资讯卡片网格 -->
        <div v-if="newsList.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="item in newsList"
            :key="item.id"
            :to="`/news/${item.id}`"
            class="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <div class="aspect-[21/9] bg-gradient-to-br from-blue-100 to-blue-200 relative overflow-hidden">
              <img
                :src="item.cover_image || 'https://picsum.photos/400/200'"
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div class="p-4">
              <h4 class="font-semibold mb-2 line-clamp-1 group-hover:text-[#1E50A0] transition-colors">{{ item.title }}</h4>
              <p class="text-sm text-[#64748B] mb-3 line-clamp-2">{{ item.summary || item.content || '精彩内容，点击查看详情' }}</p>
              <div class="flex items-center justify-between text-xs text-gray-400">
                <span>{{ formatDate(item.created_at) }}</span>
                <span><i class="fa fa-eye mr-1"></i>{{ formatViews(item.views || 0) }}</span>
              </div>
            </div>
          </router-link>
        </div>

        <!-- 空状态 -->
        <div v-else-if="!loading" class="text-center py-12 text-gray-500">暂无资讯</div>

        <!-- 加载中 -->
        <div v-if="loading" class="text-center py-10 text-gray-500">
          <i class="fa fa-spinner fa-spin text-2xl mb-2"></i>
          <p>加载中...</p>
        </div>

        <!-- 分页 -->
        <div v-if="total > pageSize" class="flex justify-center items-center gap-2 mt-8">
          <button
            @click="currentPage--"
            :disabled="currentPage <= 1"
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            上一页
          </button>
          <span class="text-sm text-gray-500">{{ currentPage }} / {{ totalPages }}</span>
          <button
            @click="currentPage++"
            :disabled="currentPage >= totalPages"
            class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            下一页
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { newsApi } from '@/api'

const categories = ref<string[]>(['全部'])
const activeCategory = ref('全部')
const newsList = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = 9
const total = ref(0)
const totalPages = ref(1)

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  if (diffDays === 0) return '今天'
  if (diffDays === 1) return '昨天'
  if (diffDays < 7) return `${diffDays}天前`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`
  return `${Math.floor(diffDays / 365)}年前`
}

function formatViews(views: number) {
  if (views >= 10000) return (views / 10000).toFixed(1) + 'w'
  if (views >= 1000) return (views / 1000).toFixed(1) + 'k'
  return views
}

async function fetchNews() {
  loading.value = true
  try {
    const cat = activeCategory.value === '全部' ? undefined : activeCategory.value
    const res: any = await newsApi.getList(currentPage.value, pageSize, cat)
    if (res.success) {
      newsList.value = res.data?.list || res.data || []
      total.value = res.data?.total || newsList.value.length
      totalPages.value = Math.ceil(total.value / pageSize) || 1
    }
  } catch (e) {
    console.error('加载资讯失败:', e)
  } finally {
    loading.value = false
  }
}

watch(activeCategory, () => {
  currentPage.value = 1
  fetchNews()
})

watch(currentPage, () => {
  fetchNews()
})

onMounted(() => {
  fetchNews()
})
</script>
