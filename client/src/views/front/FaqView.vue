<template>
  <div>
    <!-- Banner -->
    <section class="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-r from-[#0F172A] to-[#1E50A0]">
      <div class="max-w-[1280px] mx-auto px-4 relative z-10 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-2 text-white">常见问题解答</h2>
        <p class="text-gray-300">故障排查、智能解答、知识库查询，帮您解决开发过程中遇到的问题</p>
      </div>
    </section>

    <!-- FAQ 主体 -->
    <section class="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div class="max-w-[1280px] mx-auto">
        <div class="w-full max-w-[1000px] mx-auto">
          <!-- 分类标签 -->
          <div class="mb-8">
            <div class="flex flex-wrap justify-start gap-3">
              <button
                v-for="cat in categoryList"
                :key="cat"
                @click="activeCategory = cat"
                :class="[
                  'px-8 py-3 rounded-full text-base min-w-[80px] transition-all duration-200',
                  activeCategory === cat
                    ? 'bg-[#1E50A0] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                ]"
              >
                {{ cat }}
              </button>
            </div>
          </div>

          <!-- 加载中 -->
          <div v-if="loading" class="text-center py-10 text-gray-500">
            <i class="fa fa-spinner fa-spin text-2xl mb-2"></i>
            <p>加载中...</p>
          </div>

          <!-- FAQ 手风琴列表 -->
          <div v-else-if="filteredFaqs.length" class="space-y-4">
            <div
              v-for="faq in filteredFaqs"
              :key="faq.id"
              class="bg-gray-50 rounded-xl overflow-hidden"
            >
              <button
                @click="toggleFaq(faq.id)"
                class="w-full p-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors"
              >
                <span class="font-medium pr-4">{{ faq.question }}</span>
                <i
                  :class="[
                    'fa fa-chevron-down text-[#64748B] transition-transform duration-200',
                    expandedFaqs.has(faq.id) ? 'rotate-180' : ''
                  ]"
                ></i>
              </button>
              <div v-show="expandedFaqs.has(faq.id)" class="px-4 pb-4">
                <div class="text-[#64748B]" v-html="faq.answer"></div>
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-else class="text-center py-10">
            <i class="fa fa-question-circle text-gray-300 text-5xl mb-3"></i>
            <p class="text-gray-500">暂无常见问题</p>
          </div>

          <!-- 底部提示 -->
          <div class="mt-8 bg-[#1E50A0]/5 rounded-xl p-6 text-center">
            <p class="text-[#64748B] mb-4">没有找到您的问题？</p>
            <router-link to="/demand" class="text-[#1E50A0] font-medium hover:underline">提交需求或问题</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { faqApi } from '@/api'

const categoryList = ref<string[]>(['全部'])
const activeCategory = ref('全部')
const faqs = ref<any[]>([])
const loading = ref(false)
const expandedFaqs = ref<Set<number>>(new Set())

const filteredFaqs = computed(() => {
  if (activeCategory.value === '全部') return faqs.value
  return faqs.value.filter((f: any) => f.category === activeCategory.value)
})

function toggleFaq(id: number) {
  if (expandedFaqs.value.has(id)) {
    expandedFaqs.value.delete(id)
  } else {
    expandedFaqs.value.add(id)
  }
}

async function fetchCategories() {
  try {
    const res: any = await faqApi.getCategories()
    if (res.success) {
      const cats = (res.data || [])
        .filter((c: any) => c.isActive)
        .map((c: any) => c.name)
      categoryList.value = ['全部', ...cats]
    }
  } catch (e) {
    console.error('加载FAQ分类失败:', e)
  }
}

async function fetchFaqs() {
  loading.value = true
  try {
    const res: any = await faqApi.getList()
    if (res.success) {
      faqs.value = res.data || []
    }
  } catch (e) {
    console.error('加载FAQ失败:', e)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCategories()
  fetchFaqs()
})
</script>
