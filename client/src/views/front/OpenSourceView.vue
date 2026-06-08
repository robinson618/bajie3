<template>
  <div>
    <!-- Banner -->
    <section class="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-r from-[#0F172A] to-[#1E50A0]">
      <div class="max-w-[1280px] mx-auto px-4 relative z-10 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-2 text-white">开源中心</h2>
        <p class="text-gray-300">探索具身智能领域的开源项目，与全球开发者共建生态</p>
      </div>
    </section>

    <!-- 开源项目列表 -->
    <section class="py-16 px-4 md:px-8 lg:px-16">
      <div class="max-w-[1280px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- 左侧分类 -->
          <div class="lg:col-span-3">
            <div class="bg-white rounded-xl p-4 sticky top-20">
              <h4 class="font-semibold mb-4">项目分类</h4>
              <nav class="space-y-1">
                <a
                  href="#"
                  @click.prevent="currentCategory = null"
                  :class="[
                    'block px-3 py-2 rounded-lg transition-colors',
                    !currentCategory ? 'border-l-[3px] border-[#165DFF] bg-[#165DFF]/5 text-[#1E50A0] font-medium' : 'hover:bg-gray-100 text-gray-600'
                  ]"
                >全部分类</a>
                <a
                  v-for="cat in categories"
                  :key="cat.id"
                  href="#"
                  @click.prevent="currentCategory = cat.name"
                  :class="[
                    'block px-3 py-2 rounded-lg transition-colors',
                    currentCategory === cat.name ? 'border-l-[3px] border-[#165DFF] bg-[#165DFF]/5 text-[#1E50A0] font-medium' : 'hover:bg-gray-100 text-gray-600'
                  ]"
                >{{ cat.name }}</a>
              </nav>
            </div>
          </div>

          <!-- 右侧项目卡片 -->
          <div class="lg:col-span-9">
            <!-- 加载中 -->
            <div v-if="loading" class="text-center py-10 text-gray-500">
              <i class="fa fa-spinner fa-spin text-2xl mb-2"></i>
              <p>加载中...</p>
            </div>

            <!-- 项目卡片网格 -->
            <div v-else-if="filteredProjects.length" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="project in filteredProjects"
                :key="project.id"
                class="bg-white rounded-xl p-5 shadow-lg hover:shadow-[#1E50A0]/20 hover:-translate-y-1 transition-all duration-300"
              >
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                    <i class="fa fa-github text-white text-lg"></i>
                  </div>
                  <div class="flex items-center gap-2">
                    <h5 class="font-semibold">{{ project.title }}</h5>
                    <span v-if="project.version" class="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">{{ project.version }}</span>
                  </div>
                </div>
                <p class="text-[#64748B] text-sm mb-4">{{ project.description || '' }}</p>
                <div class="flex items-center gap-2">
                  <a
                    v-if="project.python_url"
                    :href="project.python_url"
                    target="_blank"
                    class="px-4 py-2 bg-blue-100 text-blue-700 rounded-md text-sm font-medium hover:bg-blue-200 transition-colors inline-flex items-center gap-1"
                  >
                    Python
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" x2="21" y1="14" y2="3"></line>
                    </svg>
                  </a>
                  <a
                    v-if="project.cpp_url"
                    :href="project.cpp_url"
                    target="_blank"
                    class="px-4 py-2 bg-gray-100 text-gray-600 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors inline-flex items-center gap-1"
                  >
                    C++
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" x2="21" y1="14" y2="3"></line>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <!-- 空状态 -->
            <div v-else class="text-center py-10 text-gray-500">暂无项目</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { openSourceApi } from '@/api'

const categories = ref<any[]>([])
const currentCategory = ref<string | null>(null)
const projects = ref<any[]>([])
const loading = ref(false)

const filteredProjects = computed(() => {
  if (!currentCategory.value) return projects.value
  return projects.value.filter((p: any) => p.category === currentCategory.value)
})

async function fetchCategories() {
  try {
    const res: any = await openSourceApi.getCategories()
    if (res.success) {
      categories.value = (res.data || []).filter((c: any) => c.is_active)
    }
  } catch (e) {
    console.error('加载分类失败:', e)
  }
}

async function fetchProjects() {
  loading.value = true
  try {
    const res: any = await openSourceApi.getProjects()
    if (res.success) {
      projects.value = res.data || []
    }
  } catch (e) {
    console.error('加载开源项目失败:', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCategories()
  fetchProjects()
})
</script>
