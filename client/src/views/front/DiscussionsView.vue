<template>
  <div>
    <!-- Banner -->
    <section class="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-r from-[#0F172A] to-[#1E50A0]">
      <div class="max-w-[1280px] mx-auto px-4 relative z-10 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-2 text-white">技术讨论</h2>
        <p class="text-gray-300">分享技术见解，探讨行业趋势，与开发者社区共同成长</p>
        <router-link
          to="/discussions/create"
          class="inline-flex items-center gap-2 px-6 py-3 bg-[#1E50A0] text-white rounded-lg hover:bg-[#174080] transition-colors mt-4"
        >
          <i class="fa fa-edit"></i> 发布话题
        </router-link>
      </div>
    </section>

    <!-- 讨论列表 -->
    <section class="py-16 px-4 md:px-8 lg:px-16">
      <div class="max-w-[1280px] mx-auto">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- 左侧主体 -->
          <div class="flex-1">
            <!-- 分类标签 -->
            <div class="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
              <button
                v-for="cat in categories"
                :key="cat"
                @click="activeCategory = cat"
                :class="[
                  'px-4 py-2 rounded-full text-sm transition-all duration-200 whitespace-nowrap',
                  activeCategory === cat
                    ? 'bg-[#1E50A0] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                {{ cat }}
              </button>
            </div>

            <!-- 加载中 -->
            <div v-if="loading" class="text-center py-10 text-gray-500">
              <i class="fa fa-spinner fa-spin text-2xl mb-2"></i>
              <p>加载中...</p>
            </div>

            <!-- 讨论卡片列表 -->
            <div v-else-if="discussions.length" class="space-y-4">
              <router-link
                v-for="item in discussions"
                :key="item.id"
                :to="`/discussions/${item.id}`"
                :class="[
                  'block bg-white rounded-xl p-5 hover:shadow-lg transition-shadow border',
                  item.is_pinned ? 'border-[#1E50A0]/30 bg-[#1E50A0]/[0.02]' : 'border-gray-100'
                ]"
              >
                <div class="flex">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span
                        v-if="item.is_pinned"
                        class="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded font-medium"
                      >
                        <i class="fa fa-thumb-tack mr-1"></i>置顶
                      </span>
                      <span class="text-xs px-2 py-0.5 rounded" :class="getCategoryStyle(item.category)">
                        {{ item.category || '未分类' }}
                      </span>
                      <h4 class="font-semibold text-lg hover:text-[#1E50A0] transition-colors">{{ item.title }}</h4>
                    </div>
                    <p class="text-[#64748B] text-sm mb-3 line-clamp-2">{{ item.summary || item.content }}</p>
                    <div class="flex items-center gap-4 text-xs text-gray-400">
                      <span class="flex items-center gap-1">
                        <img v-if="item.author_avatar" :src="item.author_avatar" class="w-4 h-4 rounded-full object-cover" />
                        {{ item.author || '匿名' }}
                      </span>
                      <span>{{ formatDate(item.created_at) }}</span>
                      <span><i class="fa fa-eye mr-1"></i>{{ item.views || 0 }}</span>
                      <span><i class="fa fa-comment mr-1"></i>{{ item.comment_count || 0 }}</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>

            <!-- 空状态 -->
            <div v-else class="text-center py-12 text-gray-500">暂无讨论话题</div>

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

          <!-- 右侧边栏 -->
          <div class="w-full lg:w-[296px] space-y-6 sticky top-24 self-start">
            <!-- 热门话题 -->
            <div class="bg-white rounded-xl p-5 border border-gray-100">
              <h3 class="text-lg font-semibold mb-4">热门话题</h3>
              <div class="space-y-1">
                <router-link
                  v-for="(item, index) in hotTopics"
                  :key="item.id"
                  :to="`/discussions/${item.id}`"
                  class="flex items-center gap-3 p-2 hover:bg-[#1E50A0]/5 rounded-lg transition-colors"
                >
                  <span
                    :class="[
                      'w-6 h-6 flex items-center justify-center text-white text-xs font-medium rounded-full',
                      index < 1 ? 'bg-blue-500' : index < 3 ? 'bg-blue-400' : 'bg-blue-300'
                    ]"
                  >{{ index + 1 }}</span>
                  <span class="text-sm text-gray-700 hover:text-[#1E50A0] transition-colors line-clamp-1">{{ item.title }}</span>
                </router-link>
              </div>
            </div>

            <!-- 活跃用户 -->
            <div class="bg-white rounded-xl p-5 border border-gray-100">
              <h3 class="text-lg font-semibold mb-4">活跃用户</h3>
              <div class="space-y-3">
                <div v-for="user in activeUsers" :key="user.id" class="flex items-center gap-3">
                  <img :src="user.avatar || 'https://picsum.photos/100/100'" :alt="user.username" class="w-10 h-10 rounded-full object-cover" />
                  <div class="flex-1">
                    <p class="text-sm font-medium">{{ user.username }}</p>
                    <p class="text-xs text-[#64748B]">发布 {{ user.post_count || 0 }} 篇</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 加入讨论群 -->
            <div class="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-5 text-white">
              <h3 class="text-lg font-semibold mb-2">加入技术讨论群</h3>
              <p class="text-sm text-white/80 mb-4">与志同道合的开发者一起交流学习</p>
              <button class="w-full px-4 py-2 bg-white text-emerald-600 rounded-lg font-medium hover:bg-white/90 transition-colors">
                <i class="fa fa-wechat mr-2"></i>扫码加入
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { discussionsApi } from '@/api'

const categories = ref<string[]>(['全部', '灌水天堂', '技术交流', '问题反馈', '经验分享', '资源推荐'])
const activeCategory = ref('全部')
const discussions = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = 10
const total = ref(0)
const totalPages = ref(1)
const hotTopics = ref<any[]>([])
const activeUsers = ref<any[]>([])

function getCategoryStyle(category: string) {
  const styles: Record<string, string> = {
    '问题反馈': 'bg-blue-100 text-blue-600',
    '经验分享': 'bg-blue-100 text-blue-600',
    '资源推荐': 'bg-purple-100 text-purple-600',
    '技术交流': 'bg-blue-100 text-blue-600',
    '灌水天堂': 'bg-purple-100 text-purple-600',
  }
  return styles[category] || 'bg-gray-100 text-gray-600'
}

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
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

async function fetchDiscussions() {
  loading.value = true
  try {
    const cat = activeCategory.value === '全部' ? undefined : activeCategory.value
    const res: any = await discussionsApi.getList(currentPage.value, pageSize, cat)
    if (res.success) {
      discussions.value = res.data?.list || res.data || []
      total.value = res.data?.total || discussions.value.length
      totalPages.value = Math.ceil(total.value / pageSize) || 1
    }
  } catch (e) {
    console.error('加载讨论列表失败:', e)
  } finally {
    loading.value = false
  }
}

async function fetchHotTopics() {
  try {
    const res: any = await discussionsApi.getHotTopics()
    if (res.success) {
      hotTopics.value = res.data || []
    }
  } catch (e) {
    console.error('加载热门话题失败:', e)
  }
}

async function fetchActiveUsers() {
  try {
    const res: any = await discussionsApi.getActiveUsers()
    if (res.success) {
      activeUsers.value = res.data || []
    }
  } catch (e) {
    console.error('加载活跃用户失败:', e)
  }
}

watch(activeCategory, () => {
  currentPage.value = 1
  fetchDiscussions()
})

watch(currentPage, () => {
  fetchDiscussions()
})

onMounted(() => {
  fetchDiscussions()
  fetchHotTopics()
  fetchActiveUsers()
})
</script>
