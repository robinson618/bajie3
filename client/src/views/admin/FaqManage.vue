<template>
  <div>
    <a-card>
      <a-tabs v-model:active-key="activeTab" @change="onTabChange">
        <a-tab-pane key="list" title="FAQ列表" />
        <a-tab-pane key="categories" title="分类管理" />
      </a-tabs>

      <template v-if="activeTab === 'list'">
        <a-row :gutter="16" align="center" class="mb-4">
          <a-col :span="6">
            <a-input v-model="keyword" placeholder="搜索问题..." allow-clear @clear="fetchList" @press-enter="fetchList">
              <template #prefix><icon-search /></template>
            </a-input>
          </a-col>
          <a-col :span="4">
            <a-select v-model="faqCategory" placeholder="分类筛选" allow-clear @change="fetchList" @clear="fetchList">
              <a-option v-for="c in categoryList" :key="c.id" :value="c.name">{{ c.name }}</a-option>
            </a-select>
          </a-col>
          <a-col :span="4">
            <a-button type="primary" @click="fetchList">搜索</a-button>
          </a-col>
          <a-col :span="10" style="text-align: right">
            <a-button type="primary" @click="openModal()">
              <template #icon><icon-plus /></template>
              新增FAQ
            </a-button>
          </a-col>
        </a-row>

        <a-table :data="list" :pagination="pagination" :loading="loading" @page-change="onPageChange" row-key="id">
          <template #columns>
            <a-table-column title="问题" data-index="question" :width="240" ellipsis />
            <a-table-column title="分类" data-index="category" :width="100" />
            <a-table-column title="排序" data-index="sortOrder" :width="80" />
            <a-table-column title="浏览量" data-index="viewCount" :width="80" />
            <a-table-column title="状态" :width="80">
              <template #cell="{ record }">
                <a-tag :color="record.status === 'published' ? 'green' : 'orange'">
                  {{ record.status === 'published' ? '已发布' : '草稿' }}
                </a-tag>
              </template>
            </a-table-column>
            <a-table-column title="操作" :width="160" fixed="right">
              <template #cell="{ record }">
                <a-button type="text" size="small" @click="openModal(record)">编辑</a-button>
                <a-popconfirm content="确定删除该FAQ？" @ok="handleDelete(record.id)">
                  <a-button type="text" size="small" status="danger">删除</a-button>
                </a-popconfirm>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </template>

      <template v-if="activeTab === 'categories'">
        <a-button type="primary" class="mb-4" @click="openCategoryModal()">
          <template #icon><icon-plus /></template>
          新增分类
        </a-button>
        <a-table :data="categoryList" :loading="catLoading" row-key="id" :pagination="false">
          <template #columns>
            <a-table-column title="分类名称" data-index="name" />
            <a-table-column title="描述" data-index="description" />
            <a-table-column title="排序" data-index="sortOrder" :width="80" />
            <a-table-column title="操作" :width="160">
              <template #cell="{ record }">
                <a-button type="text" size="small" @click="openCategoryModal(record)">编辑</a-button>
                <a-popconfirm content="确定删除该分类？" @ok="handleDeleteCategory(record.id)">
                  <a-button type="text" size="small" status="danger">删除</a-button>
                </a-popconfirm>
              </template>
            </a-table-column>
          </template>
        </a-table>
      </template>
    </a-card>

    <a-modal v-model:visible="modalVisible" :title="isEdit ? '编辑FAQ' : '新增FAQ'" @ok="handleSubmit" :mask-closable="false">
      <a-form :model="form" layout="vertical">
        <a-form-item label="问题" required>
          <a-input v-model="form.question" placeholder="请输入问题" />
        </a-form-item>
        <a-form-item label="分类" required>
          <a-select v-model="form.category" placeholder="请选择分类" allow-create>
            <a-option v-for="c in categoryList" :key="c.id" :value="c.name">{{ c.name }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item label="回答" required>
          <a-textarea v-model="form.answer" placeholder="请输入回答" :auto-size="{ minRows: 4 }" />
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number v-model="form.sortOrder" :min="0" />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model="form.status">
            <a-option value="draft">草稿</a-option>
            <a-option value="published">已发布</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:visible="catModalVisible" :title="isCatEdit ? '编辑分类' : '新增分类'" @ok="handleCategorySubmit" :mask-closable="false">
      <a-form :model="catForm" layout="vertical">
        <a-form-item label="分类名称" required>
          <a-input v-model="catForm.name" placeholder="请输入分类名称" />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea v-model="catForm.description" placeholder="请输入描述" />
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number v-model="catForm.sortOrder" :min="0" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { faqApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconSearch, IconPlus } from '@arco-design/web-vue/es/icon';

const activeTab = ref('list');
const list = ref<any[]>([]);
const loading = ref(false);
const keyword = ref('');
const faqCategory = ref('');
const categoryList = ref<any[]>([]);
const catLoading = ref(false);
const modalVisible = ref(false);
const isEdit = ref(false);
const editId = ref(0);
const catModalVisible = ref(false);
const isCatEdit = ref(false);
const editCatId = ref(0);

const pagination = reactive({ current: 1, pageSize: 10, total: 0, showTotal: true });

const form = reactive({ question: '', category: '', answer: '', sortOrder: 0, status: 'draft' });
const catForm = reactive({ name: '', description: '', sortOrder: 0 });

function resetForm() {
  Object.assign(form, { question: '', category: '', answer: '', sortOrder: 0, status: 'draft' });
}
function resetCatForm() {
  Object.assign(catForm, { name: '', description: '', sortOrder: 0 });
}

async function fetchList() {
  loading.value = true;
  try {
    const res: any = await faqApi.getList(pagination.current, pagination.pageSize, faqCategory.value || undefined);
    if (res.success) {
      list.value = res.data?.items || [];
      pagination.total = res.data?.total || 0;
    }
  } catch { Message.error('获取列表失败'); }
  finally { loading.value = false; }
}

async function fetchCategories() {
  catLoading.value = true;
  try {
    const res: any = await faqApi.getCategories();
    if (res.success) categoryList.value = res.data?.items || res.data || [];
  } catch { Message.error('获取分类失败'); }
  finally { catLoading.value = false; }
}

function onTabChange(key: string | number): void {
  if (key === 'categories') fetchCategories();
}
function onPageChange(page: number) { pagination.current = page; fetchList(); }

function openModal(record?: any) {
  resetForm();
  if (record) {
    isEdit.value = true;
    editId.value = record.id;
    Object.assign(form, record);
  } else {
    isEdit.value = false;
  }
  modalVisible.value = true;
}

function openCategoryModal(record?: any) {
  resetCatForm();
  if (record) {
    isCatEdit.value = true;
    editCatId.value = record.id;
    Object.assign(catForm, record);
  } else {
    isCatEdit.value = false;
  }
  catModalVisible.value = true;
}

async function handleSubmit() {
  if (!form.question || !form.category || !form.answer) { Message.warning('请填写必填项'); return; }
  try {
    const res: any = isEdit.value ? await faqApi.update(editId.value, form) : await faqApi.create(form);
    if (res.success) { Message.success(isEdit.value ? '更新成功' : '创建成功'); modalVisible.value = false; fetchList(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleCategorySubmit() {
  if (!catForm.name) { Message.warning('请填写分类名称'); return; }
  try {
    const res: any = isCatEdit.value ? await faqApi.updateCategory(editCatId.value, catForm) : await faqApi.createCategory(catForm);
    if (res.success) { Message.success(isCatEdit.value ? '更新成功' : '创建成功'); catModalVisible.value = false; fetchCategories(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleDelete(id: number) {
  try {
    const res: any = await faqApi.remove(id);
    if (res.success) { Message.success('删除成功'); fetchList(); }
    else Message.error(res.message || '删除失败');
  } catch { Message.error('删除失败'); }
}

async function handleDeleteCategory(id: number) {
  try {
    const res: any = await faqApi.removeCategory(id);
    if (res.success) { Message.success('删除成功'); fetchCategories(); }
    else Message.error(res.message || '删除失败');
  } catch { Message.error('删除失败'); }
}

onMounted(() => { fetchList(); fetchCategories(); });
</script>
