<template>
  <div>
    <!-- Banner -->
    <section class="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-r from-[#0F172A] to-[#7B61FF]">
      <div class="max-w-[1280px] mx-auto px-4 relative z-10 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-2 text-white">Skill应用市场</h2>
        <p class="text-gray-300">发现丰富的八界机器人Skill应用，扩展您的机器人能力</p>
      </div>
    </section>

    <!-- 分类 + 列表 -->
    <section class="py-10">
      <div class="max-w-[1280px] mx-auto px-4">
        <!-- 面包屑 -->
        <div class="flex items-center gap-2 mb-6 text-sm text-gray-500">
          <router-link to="/" class="hover:text-[#1E50A0] transition-colors">首页</router-link>
          <i class="fa fa-chevron-right text-xs"></i>
          <span>Skill应用市场</span>
        </div>

        <!-- 分类标签 -->
        <div class="flex items-center gap-3 mb-8">
          <button
            v-for="cat in categoryList"
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

        <!-- Skill 卡片网格 -->
        <div v-if="skillsList.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <router-link
            v-for="skill in skillsList"
            :key="skill.id"
            :to="`/skills/${skill.id}`"
            class="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer block"
          >
            <div :class="['h-36 bg-gradient-to-br flex items-center justify-center relative', getGradientClass(skill)]">
              <i :class="['fa text-5xl opacity-60', getIconClass(skill)]"></i>
              <span v-if="skill.version" class="absolute top-3 right-3 text-xs bg-white/60 text-gray-700 px-2 py-1 rounded">{{ skill.version }}</span>
            </div>
            <div class="p-5">
              <h5 class="font-semibold text-lg mb-2">{{ skill.title }}</h5>
              <p class="text-[#64748B] text-sm line-clamp-2 mb-4">{{ skill.description || '暂无描述' }}</p>

              <!-- 技术规格 -->
              <div class="mb-4">
                <div class="flex items-center gap-1.5 mb-1.5">
                  <span class="text-xs font-medium text-gray-700">技术规格</span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="spec in parseList(skill.tech_specs)" :key="spec" class="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded">{{ spec }}</span>
                </div>
              </div>

              <!-- 支持设备 -->
              <div class="mb-4">
                <div class="flex items-center gap-1.5 mb-1.5">
                  <i class="fa fa-robot text-xs text-[#1E50A0]"></i>
                  <span class="text-xs font-medium text-gray-700">支持设备</span>
                </div>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="device in parseList(skill.supported_devices)" :key="device" class="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded">{{ device }}</span>
                </div>
              </div>

              <div class="flex items-center justify-between pt-3 border-t border-gray-100">
                <span :class="['text-xs px-2.5 py-1 rounded', skill.is_paid ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600']">
                  {{ skill.is_paid ? '付费' : '免费' }}
                </span>
                <div class="flex items-center gap-3 text-sm text-[rgb(149,156,166)]">
                  <span><i class="fa fa-download mr-1"></i>{{ skill.downloads || 0 }}</span>
                  <span><i class="fa fa-eye mr-1"></i>{{ skill.views || 0 }}</span>
                </div>
              </div>
            </div>
          </router-link>
        </div>

        <!-- 空状态 -->
        <div v-else-if="!loading" class="text-center py-12 text-gray-500">暂无Skill</div>

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
import { skillsApi } from '@/api'

const iconClasses = ['fa-microphone', 'fa-map-marker', 'fa-eye', 'fa-bolt', 'fa-map', 'fa-male']
const gradientClasses = [
  'from-blue-50 to-indigo-100 text-[#1E50A0]',
  'from-amber-50 to-orange-100 text-amber-600',
  'from-purple-50 to-pink-100 text-purple-600',
  'from-cyan-50 to-teal-100 text-cyan-600',
  'from-red-50 to-rose-100 text-red-600',
  'from-green-50 to-emerald-100 text-green-600'
]

const categoryList = ref<string[]>(['全部'])
const activeCategory = ref('全部')
const skillsList = ref<any[]>([])
const loading = ref(false)
const currentPage = ref(1)
const pageSize = 9
const total = ref(0)
const totalPages = ref(1)

function getIconClass(skill: any) {
  if (skill.icon) return skill.icon
  return iconClasses[Number(skill.id) % iconClasses.length]
}

function getGradientClass(skill: any) {
  const cls = gradientClasses[Number(skill.id) % gradientClasses.length]
  return cls.split(' ').slice(0, 2).join(' ')
}

function parseList(val: any): string[] {
  if (Array.isArray(val)) return val
  if (typeof val === 'string') return val.split(',').map((s: string) => s.trim()).filter(Boolean)
  return []
}

async function fetchCategories() {
  try {
    const res: any = await skillsApi.getCategories()
    if (res.success && res.data?.length) {
      categoryList.value = ['全部', ...res.data.map((c: any) => c.name)]
    }
  } catch (e) {
    console.error('加载分类失败:', e)
  }
}

async function fetchSkills() {
  loading.value = true
  try {
    const cat = activeCategory.value === '全部' ? undefined : activeCategory.value
    const res: any = await skillsApi.getList(currentPage.value, pageSize, cat)
    if (res.success) {
      skillsList.value = res.data?.list || res.data || []
      total.value = res.data?.total || skillsList.value.length
      totalPages.value = Math.ceil(total.value / pageSize) || 1
    }
  } catch (e) {
    console.error('加载Skill列表失败:', e)
  } finally {
    loading.value = false
  }
}

watch(activeCategory, () => { currentPage.value = 1; fetchSkills() })
watch(currentPage, () => { fetchSkills() })

onMounted(() => {
  fetchCategories()
  fetchSkills()
})
</script>
