<template>
  <div>
    <section class="py-10 bg-gray-50 min-h-screen">
      <div class="container mx-auto max-w-[1000px] px-4">
        <!-- 面包屑 -->
        <div class="mb-6">
          <nav class="flex items-center gap-2 text-sm">
            <router-link to="/" class="text-[#64748B] hover:text-[#1E50A0] transition-colors">首页</router-link>
            <i class="fa fa-chevron-right text-xs text-gray-400"></i>
            <router-link to="/news" class="text-[#64748B] hover:text-[#1E50A0] transition-colors">前沿资讯</router-link>
            <i class="fa fa-chevron-right text-xs text-gray-400"></i>
            <span class="text-gray-700">详情</span>
          </nav>
        </div>

        <div class="flex gap-6">
          <!-- 文章主体 -->
          <article class="flex-1 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <!-- 加载中 -->
            <div v-if="loading" class="flex items-center justify-center py-20">
              <i class="fa fa-spinner fa-spin text-3xl text-[#1E50A0]"></i>
            </div>

            <!-- 未找到 -->
            <div v-else-if="notFound" class="text-center py-20">
              <i class="fa fa-exclamation-circle text-5xl text-gray-300 mb-4"></i>
              <p class="text-gray-500">资讯不存在</p>
              <router-link to="/news" class="inline-block mt-4 px-6 py-2 bg-[#1E50A0] text-white rounded-lg hover:bg-[#174080] transition-colors">返回列表</router-link>
            </div>

            <template v-else-if="news">
              <div class="flex items-start justify-between mb-4">
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-3">
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">{{ news.category || '未分类' }}</span>
                    <span class="text-[#64748B] text-sm">发布于 {{ news.created_at }}</span>
                  </div>
                  <h1 class="text-2xl font-bold mb-4">{{ news.title }}</h1>
                </div>
              </div>

              <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100 text-[#64748B] text-sm">
                <span>{{ news.author || '匿名' }}</span>
                <span class="text-gray-300">·</span>
                <span>{{ news.source || '未知来源' }}</span>
                <span class="text-gray-300">·</span>
                <span>{{ news.views || 0 }} 阅读</span>
              </div>

              <div v-if="news.summary" class="bg-gray-50 rounded-lg p-4 mb-6">
                <p class="text-sm text-gray-500 mb-1">摘要</p>
                <p class="text-gray-700">{{ news.summary }}</p>
              </div>

              <div class="prose max-w-none mb-6" v-html="news.content"></div>
            </template>
          </article>

          <!-- 侧边栏：热门资讯 -->
          <aside class="hidden lg:block w-72 flex-shrink-0">
            <div class="bg-white rounded-xl p-5 shadow-sm border border-gray-100 sticky top-20">
              <h3 class="font-semibold mb-4">热门资讯</h3>
              <div class="space-y-2">
                <router-link
                  v-for="(item, index) in trendingList"
                  :key="item.id"
                  :to="`/news/${item.id}`"
                  class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                >
                  <div class="flex items-center gap-3">
                    <span :class="[
                      'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                      index < 2 ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                    ]">{{ index + 1 }}</span>
                    <span class="text-sm group-hover:text-[#1E50A0] transition-colors line-clamp-1">{{ item.title }}</span>
                  </div>
                  <i class="fa fa-chevron-right text-[#64748B] group-hover:text-[#1E50A0] transition-colors"></i>
                </router-link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { newsApi } from '@/api'

const route = useRoute()
const news = ref<any>(null)
const loading = ref(true)
const notFound = ref(false)
const trendingList = ref<any[]>([])

onMounted(async () => {
  const id = route.params.id
  if (!id) { notFound.value = true; loading.value = false; return }

  try {
    const res: any = await newsApi.getDetail(Number(id))
    if (res.success && res.data) {
      news.value = res.data
    } else {
      notFound.value = true
    }
  } catch (e) {
    console.error('加载资讯详情失败:', e)
    notFound.value = true
  } finally {
    loading.value = false
  }

  try {
    const trendRes: any = await newsApi.getTrending()
    if (trendRes.success) {
      trendingList.value = trendRes.data || []
    }
  } catch (e) {
    console.error('加载热门资讯失败:', e)
  }
})
</script>

<style scoped>
.prose { line-height: 1.8; }
.prose h1 { font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem; }
.prose h2 { font-size: 1.75rem; font-weight: 600; margin: 1.75rem 0 0.875rem; }
.prose h3 { font-size: 1.5rem; font-weight: 600; margin: 1.5rem 0 0.75rem; }
.prose p { margin: 1rem 0; color: #374151; }
.prose ul { list-style-type: disc; padding-left: 1.5rem; margin: 1rem 0; }
.prose ol { list-style-type: decimal; padding-left: 1.5rem; margin: 1rem 0; }
.prose li { margin: 0.5rem 0; }
.prose a { color: #2563eb; text-decoration: underline; }
.prose blockquote { border-left: 4px solid #d1d5db; padding-left: 1rem; margin: 1.5rem 0; color: #6b7280; font-style: italic; }
.prose img { max-width: 100%; border-radius: 0.5rem; margin: 1.5rem 0; }
.prose code { background-color: #f3f4f6; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875rem; color: #e11d48; }
.prose pre { background-color: #1f2937; color: #e5e7eb; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin: 1.5rem 0; }
.prose pre code { background-color: transparent; padding: 0; color: #e5e7eb; }
.prose table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
.prose th { background-color: #f3f4f6; padding: 0.75rem 1rem; text-align: left; border: 1px solid #d1d5db; font-weight: 600; }
.prose td { padding: 0.75rem 1rem; border: 1px solid #d1d5db; }
</style>
VUEEOF; __tr_native_ec=$?; pwd -P >| '/var/folders/bj/brc4gsps4tjgknm93lxfcwvr0000gn/T/agent-toolhost/jobs/job-6ecb35ce7b724568a214806f2d517311/cwd.txt'; exit "$__tr_native_ec"