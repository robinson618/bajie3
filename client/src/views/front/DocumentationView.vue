<template>
  <div>
    <!-- Banner -->
    <section class="py-24 lg:py-32 relative overflow-hidden bg-gradient-to-r from-[#0F172A] to-[#1E50A0]">
      <div class="max-w-[1280px] mx-auto px-4 relative z-10 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-2 text-white">文档中心</h2>
        <p class="text-gray-300">全面的开发文档，助您快速上手具身智能开发</p>
      </div>
    </section>

    <!-- 文档主体 -->
    <section class="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div class="max-w-[1280px] mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <!-- 左侧目录树 -->
          <div class="lg:col-span-3">
            <div class="bg-gray-50 rounded-xl p-4 sticky top-20">
              <h4 class="font-semibold mb-4">文档目录</h4>

              <!-- 加载中 -->
              <div v-if="treeLoading" class="text-center py-4">
                <i class="fa fa-spinner fa-spin text-[#1E50A0]"></i>
              </div>

              <!-- 目录列表 -->
              <nav v-else-if="categories.length" class="space-y-1">
                <div v-for="category in categories" :key="category.id">
                  <div
                    @click="handleCategoryClick(category)"
                    class="relative pl-4 py-2 cursor-pointer hover:text-[#1E50A0] transition-colors flex items-center justify-between"
                    :class="{ 'text-[#1E50A0] font-medium': activeCategoryId === category.id }"
                  >
                    <span>{{ category.name }}</span>
                    <i
                      v-if="category.subcategories && category.subcategories.length"
                      @click.stop="toggleCategory(category.id)"
                      :class="[
                        'fa fa-chevron-right text-xs text-[#64748B] transition-transform duration-200',
                        expandedCategories.has(category.id) ? 'rotate-90' : ''
                      ]"
                    ></i>
                  </div>
                  <div
                    v-if="category.subcategories && category.subcategories.length"
                    v-show="expandedCategories.has(category.id)"
                    class="pl-8 space-y-1 mt-1"
                  >
                    <div
                      v-for="sub in category.subcategories"
                      :key="sub.id"
                      @click="selectSubcategory(sub)"
                      class="text-base py-1.5 text-[#64748B] cursor-pointer hover:text-[#1E50A0] transition-colors pl-2"
                      :class="{ 'text-[#1E50A0] font-medium': activeSubcategoryId === sub.id }"
                    >
                      {{ sub.name }}
                    </div>
                  </div>
                </div>
              </nav>

              <!-- 空目录 -->
              <div v-else class="text-center py-4 text-gray-500 text-sm">暂无目录</div>

              <!-- 帮助提示 -->
              <div class="mt-6 p-4 bg-[#1E50A0]/5 rounded-xl">
                <h5 class="font-medium text-[#1E50A0] mb-2">需要帮助？</h5>
                <p class="text-[#64748B] text-sm mb-3">查看文档仍有疑问？</p>
                <button class="text-[#1E50A0] text-sm hover:underline">联系技术支持</button>
              </div>
            </div>
          </div>

          <!-- 右侧内容区 -->
          <div class="lg:col-span-9">
            <!-- 加载中 -->
            <div v-if="contentLoading" class="flex items-center justify-center py-20">
              <i class="fa fa-spinner fa-spin text-[#1E50A0] text-4xl"></i>
            </div>

            <!-- 文档内容 -->
            <div v-else-if="currentContent" class="animate-fade-in">
              <!-- 面包屑 -->
              <nav class="flex items-center gap-2 text-sm mb-6">
                <router-link to="/" class="text-[#64748B] hover:text-[#1E50A0] transition-colors">首页</router-link>
                <i class="fa fa-chevron-right text-xs text-gray-400"></i>
                <router-link to="/documentation" class="text-[#64748B] hover:text-[#1E50A0] transition-colors">文档中心</router-link>
                <template v-if="breadcrumb.length">
                  <i class="fa fa-chevron-right text-xs text-gray-400"></i>
                  <span v-for="(item, idx) in breadcrumb" :key="idx">
                    <span v-if="idx < breadcrumb.length - 1" class="text-[#64748B] hover:text-[#1E50A0] cursor-pointer transition-colors">{{ item }}</span>
                    <span v-else class="text-gray-700">{{ item }}</span>
                    <i v-if="idx < breadcrumb.length - 1" class="fa fa-chevron-right text-xs text-gray-400 ml-2"></i>
                  </span>
                </template>
              </nav>

              <!-- 内容标题 -->
              <div class="flex items-center gap-3 mb-6">
                <i :class="['text-[#1E50A0] text-xl', currentType === 'category' ? 'fa fa-folder' : 'fa fa-file-text-o']"></i>
                <h4 class="font-semibold text-xl">{{ currentContent.title || currentContent.name }}</h4>
              </div>

              <!-- 内容正文 -->
              <div class="bg-gray-50 rounded-xl p-6 prose max-w-none">
                <div v-if="currentContent.content" v-html="currentContent.content"></div>
                <p v-else class="text-gray-500">该目录暂无内容。</p>
              </div>
            </div>

            <!-- 空状态 -->
            <div v-else class="text-center py-20 text-gray-500">
              <i class="fa fa-book text-5xl text-gray-300 mb-4"></i>
              <p>请从左侧目录选择文档</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { documentsApi } from '@/api'

const categories = ref<any[]>([])
const expandedCategories = ref<Set<number>>(new Set())
const activeCategoryId = ref<number | null>(null)
const activeSubcategoryId = ref<number | null>(null)
const currentContent = ref<any>(null)
const currentType = ref<'category' | 'subcategory'>('category')
const breadcrumb = ref<string[]>([])
const treeLoading = ref(true)
const contentLoading = ref(false)

function toggleCategory(catId: number) {
  if (expandedCategories.value.has(catId)) {
    expandedCategories.value.delete(catId)
  } else {
    expandedCategories.value.add(catId)
  }
}

async function handleCategoryClick(category: any) {
  toggleCategory(category.id)
  activeCategoryId.value = category.id
  activeSubcategoryId.value = null
  breadcrumb.value = [category.name]
  await fetchCategoryDetail(category.id)
}

async function selectSubcategory(sub: any) {
  activeSubcategoryId.value = sub.id
  const parent = categories.value.find((c: any) =>
    c.subcategories?.some((s: any) => s.id === sub.id)
  )
  breadcrumb.value = parent ? [parent.name, sub.name] : [sub.name]
  await fetchSubcategoryDetail(sub.id)
}

async function fetchCategoryDetail(id: number) {
  contentLoading.value = true
  try {
    const res: any = await documentsApi.getCategoryDetail(id)
    if (res.success) {
      currentContent.value = res.data
      currentType.value = 'category'
    }
  } catch (e) {
    console.error('获取分类详情失败:', e)
  } finally {
    contentLoading.value = false
  }
}

async function fetchSubcategoryDetail(id: number) {
  contentLoading.value = true
  try {
    const res: any = await documentsApi.getSubcategoryDetail(id)
    if (res.success) {
      currentContent.value = res.data
      currentType.value = 'subcategory'
    }
  } catch (e) {
    console.error('获取子分类详情失败:', e)
  } finally {
    contentLoading.value = false
  }
}

onMounted(async () => {
  treeLoading.value = true
  try {
    const [catRes, subRes]: any[] = await Promise.all([
      documentsApi.getCategories(),
      documentsApi.getSubcategories(),
    ])

    if (catRes.success && subRes.success) {
      categories.value = (catRes.data || []).map((cat: any) => ({
        ...cat,
        subcategories: (subRes.data || []).filter((sub: any) => sub.category_id === cat.id),
      }))

      // 自动展开第一个分类
      if (categories.value.length > 0) {
        const firstCat = categories.value[0]
        expandedCategories.value.add(firstCat.id)
        activeCategoryId.value = firstCat.id
        breadcrumb.value = [firstCat.name]
        await fetchCategoryDetail(firstCat.id)
      }
    }
  } catch (e) {
    console.error('加载文档目录失败:', e)
  } finally {
    treeLoading.value = false
  }
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.prose { line-height: 1.8; }
.prose h1 { font-size: 2rem; font-weight: 700; margin: 2rem 0 1rem; }
.prose h2 { font-size: 1.75rem; font-weight: 600; margin: 1.75rem 0 0.875rem; }
.prose h3 { font-size: 1.5rem; font-weight: 600; margin: 1.5rem 0 0.75rem; }
.prose p { margin: 1rem 0; color: #374151; }
.prose ul { list-style-type: disc; padding-left: 1.5rem; margin: 1rem 0; }
.prose ol { list-style-type: decimal; padding-left: 1.5rem; margin: 1rem 0; }
.prose li { margin: 0.5rem 0; }
.prose a { color: #2563eb; text-decoration: underline; }
.prose code { background-color: #f3f4f6; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.875rem; color: #e11d48; }
.prose pre { background-color: #1f2937; color: #e5e7eb; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin: 1.5rem 0; }
.prose pre code { background-color: transparent; padding: 0; color: #e5e7eb; }
</style>
