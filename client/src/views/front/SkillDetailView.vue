<template>
  <div>
    <section class="py-10 bg-gray-50 min-h-screen">
      <div class="container mx-auto max-w-[1000px] px-4">
        <!-- 面包屑 -->
        <div class="mb-6">
          <nav class="flex items-center gap-2 text-sm">
            <router-link to="/" class="text-[#64748B] hover:text-[#1E50A0] transition-colors">首页</router-link>
            <i class="fa fa-chevron-right text-xs text-gray-400"></i>
            <router-link to="/skills" class="text-[#64748B] hover:text-[#1E50A0] transition-colors">Skill应用市场</router-link>
          </nav>
        </div>

        <!-- 加载中 -->
        <div v-if="loading" class="flex items-center justify-center py-20">
          <i class="fa fa-spinner fa-spin text-3xl text-[#1E50A0]"></i>
        </div>

        <!-- 未找到 -->
        <div v-else-if="notFound" class="text-center py-20">
          <i class="fa fa-exclamation-circle text-5xl text-gray-300 mb-4"></i>
          <p class="text-gray-500">Skill不存在</p>
          <router-link to="/skills" class="inline-block mt-4 px-6 py-2 bg-[#1E50A0] text-white rounded-lg hover:bg-[#174080] transition-colors">返回列表</router-link>
        </div>

        <div v-else-if="skill" class="bg-white rounded-xl shadow-lg overflow-hidden">
          <!-- 图标区域 -->
          <div :class="['h-36 bg-gradient-to-br flex items-center justify-center relative', gradientBg]">
            <div class="text-center">
              <div class="w-14 h-14 bg-white/30 rounded-xl flex items-center justify-center mx-auto mb-3">
                <i :class="['fa text-3xl', iconWithColor]"></i>
              </div>
              <span class="px-3 py-1 bg-white/70 text-sm rounded-full" :class="iconTextColor">Skill应用</span>
            </div>
          </div>

          <div class="p-6">
            <!-- 标题 + 统计 -->
            <div class="flex items-start justify-between mb-4">
              <div>
                <div class="flex items-center gap-3 mb-2">
                  <h3 class="text-xl font-bold">{{ skill.title }}</h3>
                  <span class="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">{{ skill.version || 'v1.0.0' }}</span>
                </div>
                <p class="text-[#64748B] max-w-xl">{{ skill.description }}</p>
              </div>
              <div class="flex items-center gap-4">
                <div class="text-center">
                  <div class="text-xl font-bold text-gray-900">{{ skill.views || 0 }}</div>
                  <div class="text-xs text-[#64748B]">浏览量</div>
                </div>
                <div class="text-center">
                  <div class="text-xl font-bold text-gray-900">{{ formatDownloads(skill.downloads) }}</div>
                  <div class="text-xs text-[#64748B]">下载量</div>
                </div>
              </div>
            </div>

            <div class="flex items-center gap-4 mb-6">
              <span class="text-[#64748B] text-sm">发布于 {{ skill.createdAt?.split('T')[0] || '' }}</span>
              <span class="px-2 py-1 bg-green-100 text-green-600 text-xs rounded">{{ skill.isPaid ? '付费' : '免费' }}</span>
            </div>

            <!-- 功能介绍 -->
            <div class="mb-6">
              <h4 class="font-semibold mb-2">功能介绍</h4>
              <p class="text-[#64748B] text-sm leading-relaxed">{{ skill.featureIntro || '暂无功能介绍' }}</p>
            </div>

            <!-- 技术规格 -->
            <div class="mb-6">
              <h4 class="font-semibold mb-2">技术规格</h4>
              <div v-if="techSpecs.length" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div v-for="spec in techSpecs" :key="spec" class="p-4 bg-gray-50 rounded-lg">
                  <div class="text-lg font-bold text-[#1E50A0]">{{ spec }}</div>
                  <div class="text-xs text-[#64748B]">规格</div>
                </div>
              </div>
              <p v-else class="text-[#64748B] text-sm">暂无技术规格</p>
            </div>

            <!-- 支持设备 -->
            <div class="mb-6">
              <h4 class="font-semibold mb-2">支持设备</h4>
              <div v-if="supportedDevices.length" class="flex flex-wrap gap-2">
                <span v-for="device in supportedDevices" :key="device" class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded">{{ device }}</span>
              </div>
              <p v-else class="text-[#64748B] text-sm">暂无支持设备</p>
            </div>

            <!-- 下载按钮 -->
            <div v-if="skill.documentUrl" class="mb-6">
              <button @click="handleDownload" class="w-full py-3 bg-[#1E50A0] text-white rounded-lg hover:bg-[#174080] transition-colors flex items-center justify-center gap-2">
                <i class="fa fa-download"></i> 下载Skill
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
import { skillsApi } from '@/api'

const route = useRoute()
const skill = ref<any>(null)
const loading = ref(true)
const notFound = ref(false)

const iconClasses = ['fa-microphone', 'fa-map-marker', 'fa-eye', 'fa-bolt', 'fa-map', 'fa-male']
const gradientClasses = [
  { bg: 'from-blue-50 to-indigo-100', color: 'text-[#1E50A0]', textColor: 'text-[#1E50A0]' },
  { bg: 'from-amber-50 to-orange-100', color: 'text-amber-600', textColor: 'text-amber-600' },
  { bg: 'from-purple-50 to-pink-100', color: 'text-purple-600', textColor: 'text-purple-600' },
  { bg: 'from-cyan-50 to-teal-100', color: 'text-cyan-600', textColor: 'text-cyan-600' },
  { bg: 'from-red-50 to-rose-100', color: 'text-red-600', textColor: 'text-red-600' },
  { bg: 'from-green-50 to-emerald-100', color: 'text-green-600', textColor: 'text-green-600' },
]

const idx = computed(() => Number(skill.value?.id || 0) % gradientClasses.length)
const gradientBg = computed(() => gradientClasses[idx.value].bg)
const iconWithColor = computed(() => {
  const icon = skill.value?.icon || iconClasses[idx.value]
  return `${icon} ${gradientClasses[idx.value].color}`
})
const iconTextColor = computed(() => gradientClasses[idx.value].textColor)

const techSpecs = computed(() => {
  const val = skill.value?.techSpecs
  if (!val) return []
  if (Array.isArray(val)) return val
  if (typeof val === 'string') return val.split('\n').map((s: string) => s.trim()).filter(Boolean)
  return []
})

const supportedDevices = computed(() => {
  const val = skill.value?.supportedDevices
  if (!val) return []
  if (Array.isArray(val)) return val
  if (typeof val === 'string') return val.split(',').map((s: string) => s.trim()).filter(Boolean)
  return []
})

function formatDownloads(num: number) {
  if (!num) return '0'
  if (num >= 10000) return (num / 10000).toFixed(1) + 'w'
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k'
  return num
}

async function handleDownload() {
  if (!skill.value) return
  try {
    await skillsApi.incrementDownload(Number(skill.value.id))
    skill.value.downloads = (skill.value.downloads || 0) + 1
  } catch (e) {
    console.error('更新下载量失败:', e)
  } finally {
    if (skill.value.documentUrl) {
      window.open(skill.value.documentUrl, '_blank')
    }
  }
}

onMounted(async () => {
  const id = route.params.id
  if (!id) { notFound.value = true; loading.value = false; return }

  try {
    await skillsApi.incrementView(Number(id))
  } catch (_) { /* ignore */ }

  try {
    const res: any = await skillsApi.getDetail(Number(id))
    if (res.success && res.data) {
      skill.value = res.data
    } else {
      notFound.value = true
    }
  } catch (e) {
    console.error('加载Skill详情失败:', e)
    notFound.value = true
  } finally {
    loading.value = false
  }
})
</script>
