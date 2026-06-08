<template>
  <div>
    <section class="py-16 px-4 md:px-8 lg:px-16 bg-gray-50 min-h-screen">
      <div class="max-w-[1280px] mx-auto">
        <div class="flex flex-col lg:flex-row gap-8">
          <!-- 左侧主体 -->
          <div class="flex-1">
            <!-- 加载中 -->
            <div v-if="loading" class="flex items-center justify-center py-20">
              <i class="fa fa-spinner fa-spin text-3xl text-[#1E50A0]"></i>
            </div>

            <!-- 未找到 -->
            <div v-else-if="notFound" class="text-center py-20">
              <i class="fa fa-exclamation-circle text-5xl text-gray-300 mb-4"></i>
              <p class="text-gray-500">话题不存在</p>
              <router-link to="/discussions" class="inline-block mt-4 px-6 py-2 bg-[#1E50A0] text-white rounded-lg hover:bg-[#174080] transition-colors">返回列表</router-link>
            </div>

            <template v-else-if="discussion">
              <!-- 面包屑 -->
              <nav class="flex items-center gap-2 text-sm mb-6">
                <router-link to="/" class="text-[#64748B] hover:text-[#1E50A0] transition-colors">首页</router-link>
                <i class="fa fa-chevron-right text-xs text-gray-400"></i>
                <router-link to="/discussions" class="text-[#64748B] hover:text-[#1E50A0] transition-colors">技术讨论</router-link>
              </nav>

              <!-- 文章主体 -->
              <article class="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div class="flex items-start justify-between mb-4">
                  <div class="flex-1">
                    <div class="flex items-center gap-2 mb-3">
                      <span v-if="discussion.isPinned" class="text-xs px-2 py-0.5 bg-red-100 text-red-600 rounded-full">
                        <i class="fa fa-thumb-tack mr-1"></i>置顶
                      </span>
                      <span class="text-xs px-2 py-1 bg-[#1E50A0]/10 text-[#1E50A0] rounded-full">{{ discussion.category || '技术问答' }}</span>
                      <span class="text-[#64748B] text-sm">发布于 {{ formatDate(discussion.createdAt) }}</span>
                    </div>
                    <h1 class="text-2xl font-bold mb-4">{{ discussion.title }}</h1>
                  </div>
                </div>

                <!-- 用户信息 -->
                <div class="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                  <img :src="discussion.authorAvatar || 'https://picsum.photos/100/100'" class="w-12 h-12 rounded-full object-cover" alt="用户头像" />
                  <div>
                    <p class="font-medium">{{ discussion.author || '匿名用户' }}</p>
                    <p class="text-sm text-[#64748B]">
                      发布 {{ discussion.authorPostCount || 0 }} 篇 · 关注 {{ discussion.authorFollowers || 0 }}
                    </p>
                  </div>
                  <span
                    v-if="discussion.authorLevel"
                    :class="['level-badge', `level-${discussion.authorLevel}`]"
                  >
                    Lv.{{ discussion.authorLevel }}
                  </span>
                </div>

                <!-- 文章内容 -->
                <div class="prose max-w-none mb-6" v-html="discussion.content"></div>

                <!-- 底部操作栏 -->
                <div class="flex items-center justify-between py-4 border-t border-gray-100">
                  <div class="flex items-center gap-6">
                    <button class="flex items-center gap-2 text-[#64748B] hover:text-[#1E50A0] transition-colors">
                      <i class="fa fa-thumbs-up"></i>
                      <span>{{ discussion.likeCount || 0 }}</span>
                    </button>
                    <button class="flex items-center gap-2 text-[#64748B] hover:text-[#1E50A0] transition-colors">
                      <i class="fa fa-comment"></i>
                      <span>{{ discussion.commentCount || 0 }} 评论</span>
                    </button>
                    <button class="flex items-center gap-2 text-[#64748B] hover:text-[#1E50A0] transition-colors">
                      <i class="fa fa-share-alt"></i>
                      <span>分享</span>
                    </button>
                  </div>
                  <div class="flex items-center gap-2 text-[#64748B] text-sm">
                    <i class="fa fa-eye"></i>
                    <span>{{ discussion.views || 0 }} 次阅读</span>
                  </div>
                </div>
              </article>

              <!-- 评论区 -->
              <section class="mt-8">
                <h2 class="text-xl font-bold mb-6">评论 ({{ discussion.commentCount || 0 }})</h2>

                <!-- 评论输入 -->
                <div class="bg-white rounded-xl p-5 border border-gray-100 mb-6">
                  <div v-if="isLoggedIn">
                    <textarea
                      v-model="commentContent"
                      placeholder="写下你的评论..."
                      class="w-full p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E50A0]/20 resize-none"
                      rows="4"
                    ></textarea>
                    <div class="flex justify-end mt-4">
                      <button
                        @click="submitComment"
                        :disabled="!commentContent.trim()"
                        class="px-6 py-2 bg-[#1E50A0] text-white rounded-lg hover:bg-[#174080] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        发布评论
                      </button>
                    </div>
                  </div>
                  <div v-else class="text-center py-6 text-gray-500">
                    <p>请先登录后发表评论</p>
                    <router-link to="/login" class="inline-block mt-2 text-[#1E50A0] hover:underline">去登录</router-link>
                  </div>
                </div>

                <!-- 评论列表 -->
                <div class="space-y-6">
                  <div v-for="comment in comments" :key="comment.id" class="bg-white rounded-xl p-5 border border-gray-100">
                    <div class="flex items-start gap-4">
                      <img :src="comment.authorAvatar || 'https://picsum.photos/100/100'" :alt="comment.author" class="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                      <div class="flex-1">
                        <div class="flex items-center justify-between mb-2">
                          <span class="font-medium">{{ comment.author || '匿名' }}</span>
                          <span class="text-[#64748B] text-sm">{{ formatDate(comment.createdAt) }}</span>
                        </div>
                        <p class="text-gray-700">{{ comment.content }}</p>
                        <div class="flex items-center gap-4 mt-3">
                          <button class="flex items-center gap-1 text-[#64748B] hover:text-[#1E50A0] text-sm transition-colors">
                            <i class="fa fa-thumbs-up"></i>
                            <span>{{ comment.likeCount || 0 }}</span>
                          </button>
                          <button class="text-[#64748B] hover:text-[#1E50A0] text-sm transition-colors">回复</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- 加载更多评论 -->
                <div v-if="comments.length > 0" class="text-center mt-6">
                  <button class="py-3 px-8 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 hover:border-[#1E50A0] hover:text-[#1E50A0] transition-colors inline-flex items-center gap-2">
                    <i class="fa fa-chevron-down"></i>
                    <span>查看更多评论</span>
                  </button>
                </div>
              </section>
            </template>
          </div>

          <!-- 右侧边栏 -->
          <div class="w-full lg:w-[296px] space-y-6 sticky top-24 self-start">
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

            <div class="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-6 text-white">
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
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { discussionsApi } from '@/api'

const route = useRoute()
const discussion = ref<any>(null)
const comments = ref<any[]>([])
const hotTopics = ref<any[]>([])
const loading = ref(true)
const notFound = ref(false)
const commentContent = ref('')

const isLoggedIn = computed(() => !!localStorage.getItem('token'))

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

async function submitComment() {
  if (!commentContent.value.trim()) return
  try {
    const id = Number(route.params.id)
    const res: any = await discussionsApi.postComment(id, { content: commentContent.value })
    if (res.success) {
      commentContent.value = ''
      fetchComments()
    }
  } catch (e) {
    console.error('发布评论失败:', e)
  }
}

async function fetchComments() {
  try {
    const id = Number(route.params.id)
    const res: any = await discussionsApi.getComments(id)
    if (res.success) {
      comments.value = res.data || []
    }
  } catch (e) {
    console.error('加载评论失败:', e)
  }
}

onMounted(async () => {
  const id = route.params.id
  if (!id) { notFound.value = true; loading.value = false; return }

  try {
    const res: any = await discussionsApi.getDetail(Number(id))
    if (res.success && res.data) {
      discussion.value = res.data
    } else {
      notFound.value = true
    }
  } catch (e) {
    console.error('加载讨论详情失败:', e)
    notFound.value = true
  } finally {
    loading.value = false
  }

  fetchComments()

  try {
    const trendRes: any = await discussionsApi.getList(1, 5)
    if (trendRes.success) {
      const items = trendRes.data?.items || []
      hotTopics.value = items.sort((a: any, b: any) => (b.commentCount || 0) - (a.commentCount || 0)).slice(0, 5)
    }
  } catch (e) {
    console.error('加载热门话题失败:', e)
  }
})
</script>

<style scoped>
.level-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px);
}
.level-1 { background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); color: #6b7280; border: 1px solid rgba(0,0,0,0.06); }
.level-2 { background: linear-gradient(135deg, #f5f7fa 0%, #dfe4e9 100%); color: #4b5563; border: 1px solid rgba(0,0,0,0.08); }
.level-3 { background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%); color: #2e7d32; border: 1px solid rgba(76,175,80,0.2); }
.level-4 { background: linear-gradient(135deg, #e0f2f1 0%, #a5d6a7 100%); color: #1b5e20; border: 1px solid rgba(76,175,80,0.25); }
.level-5 { background: linear-gradient(135deg, #e3f2fd 0%, #90caf9 100%); color: #0d47a1; border: 1px solid rgba(33,150,243,0.25); }
.level-6 { background: linear-gradient(135deg, #bbdefb 0%, #64b5f6 100%); color: #0d47a1; border: 1px solid rgba(33,150,243,0.3); }
.level-7 { background: linear-gradient(135deg, #ede7f6 0%, #b39ddb 100%); color: #4a148c; border: 1px solid rgba(156,39,176,0.3); }
.level-8 { background: linear-gradient(135deg, #e1bee7 0%, #9c27b0 100%); color: #ffffff; border: 1px solid rgba(156,39,176,0.4); }
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
