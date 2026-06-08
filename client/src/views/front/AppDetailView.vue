<template>
  <div>
    <section class="py-10 bg-gray-50 min-h-screen">
      <div class="container mx-auto max-w-[1000px] px-4">
        <!-- 面包屑 -->
        <div class="mb-6">
          <nav class="flex items-center gap-2 text-sm">
            <router-link to="/" class="text-[#64748B] hover:text-[#1E50A0] transition-colors">首页</router-link>
            <i class="fa fa-chevron-right text-xs text-gray-400"></i>
            <router-link to="/apps" class="text-[#64748B] hover:text-[#1E50A0] transition-colors">应用实例</router-link>
            <i class="fa fa-chevron-right text-xs text-gray-400"></i>
            <span>详情</span>
          </nav>
        </div>

        <!-- 加载中 -->
        <div v-if="loading" class="flex items-center justify-center py-20">
          <i class="fa fa-spinner fa-spin text-3xl text-[#1E50A0]"></i>
        </div>

        <!-- 未找到 -->
        <div v-else-if="notFound" class="text-center py-20">
          <i class="fa fa-exclamation-circle text-5xl text-gray-300 mb-4"></i>
          <p class="text-gray-500">应用不存在或已下架</p>
          <router-link to="/apps" class="inline-block mt-4 px-6 py-2 bg-[#1E50A0] text-white rounded-lg hover:bg-[#174080] transition-colors">返回列表</router-link>
        </div>

        <div v-else-if="app" class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- 封面图/视频 -->
          <div class="h-[360px] md:h-[562px] relative overflow-hidden">
            <img :src="app.coverImage || 'https://picsum.photos/1000/400'" :alt="app.title" class="w-full h-full object-cover" />
            <div v-if="app.video" @click="playVideo" class="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer">
              <div class="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center hover:bg-white/30 transition-colors">
                <i class="fa fa-play text-white text-3xl ml-1"></i>
              </div>
            </div>
          </div>

          <div class="p-6">
            <!-- 标题 + 版本 -->
            <div class="mb-4">
              <div class="flex items-center gap-3 mb-2">
                <h3 class="text-xl font-bold">{{ app.title }}</h3>
                <span class="px-2.5 py-1 bg-[#1E50A0]/10 text-[#1E50A0] text-xs rounded-full font-medium">{{ app.version || 'v1.0.0' }}</span>
              </div>
              <p class="text-[#64748B]">{{ app.description }}</p>
            </div>

            <!-- 日期 + 浏览 + 点赞 -->
            <div class="flex items-center gap-4 mb-6">
              <span class="text-[#64748B] text-sm">{{ app.createdAt ? `发布于 ${app.createdAt.split('T')[0]}` : '' }}</span>
              <div class="flex items-center gap-1.5">
                <i class="fa fa-eye text-[#64748B] text-sm"></i>
                <span class="text-xs text-[#64748B]">{{ formatViews(app.views) }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <i class="fa fa-heart-o text-[#64748B] text-sm"></i>
                <span class="text-xs text-[#64748B]">{{ formatViews(app.likes) }}</span>
              </div>
            </div>

            <!-- 项目介绍 -->
            <div v-if="app.introduction" class="mb-6">
              <h4 class="font-semibold mb-2">项目介绍</h4>
              <p class="text-[#64748B] text-sm leading-relaxed">{{ app.introduction }}</p>
            </div>

            <!-- 技术栈 -->
            <div v-if="techStackList.length" class="mb-6">
              <h4 class="font-semibold mb-2">技术栈</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="t in techStackList" :key="t" class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded">{{ t }}</span>
              </div>
            </div>

            <!-- 能力标签 -->
            <div v-if="capabilitiesList.length" class="mb-6">
              <h4 class="font-semibold mb-2">技术能力</h4>
              <div class="flex flex-wrap gap-2">
                <span v-for="cap in capabilitiesList" :key="cap" class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded">{{ cap }}</span>
              </div>
            </div>

            <!-- 操作按钮 -->
            <div class="flex items-center gap-3">
              <a
                v-if="app.githubUrl"
                :href="app.githubUrl"
                target="_blank"
                class="flex items-center flex-1 py-3 bg-[#1E50A0] text-white rounded-lg hover:bg-[#174080] transition-colors justify-center"
              >
                <i class="fa fa-github mr-2"></i>查看源码
              </a>
              <button
                @click="likeApp"
                :class="[
                  'relative w-12 h-12 border rounded-lg flex items-center justify-center transition-colors',
                  liked ? 'liked border-[#175DFF] text-[#175DFF] bg-[#175DFF]/8' : 'border-gray-200 text-[#64748B] hover:text-[#1E50A0] hover:border-[#1E50A0]'
                ]"
              >
                <i class="fa fa-thumbs-up text-lg"></i>
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
import { appsApi } from '@/api'

const route = useRoute()
const app = ref<any>(null)
const loading = ref(true)
const notFound = ref(false)
const liked = ref(false)

function formatViews(num: number) {
  if (!num) return '0'
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num
}

const techStackList = computed(() => {
  const val = app.value?.techStack
  if (!val) return []
  if (typeof val === 'string') return val.split(',').map((s: string) => s.trim()).filter(Boolean)
  if (Array.isArray(val)) return val
  return []
})

const capabilitiesList = computed(() => {
  let val = app.value?.capabilities
  if (!val) return []
  if (typeof val === 'string') {
    try { val = JSON.parse(val) } catch (_) { val = val.split(',').map((c: string) => c.trim()).filter(Boolean) }
  }
  if (Array.isArray(val)) return val.map((c: any) => typeof c === 'string' ? c : c.name || '')
  return []
})

function playVideo() {
  if (!app.value?.video) return
  window.open(app.value.video, '_blank')
}

async function likeApp() {
  if (liked.value || !app.value) return
  try {
    const res: any = await appsApi.incrementLike(Number(app.value.id))
    if (res?.success || res?.status === 200) {
      liked.value = true
      app.value.likes = (app.value.likes || 0) + 1
    }
  } catch (e) {
    console.error('点赞失败:', e)
  }
}

onMounted(async () => {
  const id = route.params.id
  if (!id) { notFound.value = true; loading.value = false; return }

  try {
    const res: any = await appsApi.getDetail(Number(id))
    if (res.success && res.data) {
      app.value = res.data
    } else {
      notFound.value = true
    }
  } catch (e) {
    console.error('加载应用详情失败:', e)
    notFound.value = true
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.liked {
  color: #175DFF !important;
  border-color: #175DFF !important;
  background: rgba(23, 93, 255, 0.08);
}
</style>
