<template>
  <div>
    <a-card>
      <a-tabs v-model:active-key="activeTab" @change="onTabChange">
        <a-tab-pane key="list" title="项目列表" />
        <a-tab-pane key="categories" title="分类管理" />
      </a-tabs>

      <template v-if="activeTab === 'list'">
        <a-row :gutter="16" align="center" class="mb-4">
          <a-col :span="6">
            <a-input v-model="keyword" placeholder="搜索项目名称..." allow-clear @clear="fetchList" @press-enter="fetchList">
              <template #prefix><icon-search /></template>
            </a-input>
          </a-col>
          <a-col :span="4">
            <a-select v-model="osCategory" placeholder="分类筛选" allow-clear @change="fetchList" @clear="fetchList">
              <a-option v-for="c in categoryList" :key="c.id" :value="c.name">{{ c.name }}</a-option>
            </a-select>
          </a-col>
          <a-col :span="4">
            <a-button type="primary" @click="fetchList">搜索</a-button>
          </a-col>
          <a-col :span="10" style="text-align: right">
            <a-button type="primary" @click="openModal()">
              <template #icon><icon-plus /></template>
              新增项目
            </a-button>
          </a-col>
        </a-row>

        <a-table :data="list" :pagination="pagination" :loading="loading" @page-change="onPageChange" row-key="id">
          <template #columns>
            <a-table-column title="标题" data-index="title" :width="200" ellipsis />
            <a-table-column title="版本" data-index="version" :width="80" />
            <a-table-column title="分类" data-index="category" :width="100" />
            <a-table-column title="星标数" data-index="star_count" :width="80" />
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
                <a-popconfirm content="确定删除该项目？" @ok="handleDelete(record.id)">
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
            <a-table-column title="排序" data-index="sort_order" :width="80" />
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

    <a-modal v-model:visible="modalVisible" :title="isEdit ? '编辑项目' : '新增项目'" @ok="handleSubmit" :mask-closable="false" :width="600">
      <a-form :model="form" layout="vertical">
        <a-form-item label="标题" required>
          <a-input v-model="form.title" placeholder="请输入项目标题" />
        </a-form-item>
        <a-form-item label="分类" required>
          <a-select v-model="form.category" placeholder="请选择分类" allow-create>
            <a-option v-for="c in categoryList" :key="c.id" :value="c.name">{{ c.name }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item label="版本">
          <a-input v-model="form.version" placeholder="请输入版本号" />
        </a-form-item>
        <a-form-item label="仓库地址">
          <a-input v-model="form.repo_url" placeholder="请输入仓库地址" />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea v-model="form.description" placeholder="请输入描述" />
        </a-form-item>
        <a-form-item label="内容">
          <a-textarea v-model="form.content" placeholder="请输入内容" :auto-size="{ minRows: 6 }" />
        </a-form-item>
        <a-form-item label="封面图">
          <a-upload :limit="1" list-type="picture-card" :custom-request="handleUpload as any" :file-list="fileList" @change="onFileChange" accept="image/*">
            <template #upload-button><a-button>选择图片</a-button></template>
          </a-upload>
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
          <a-input-number v-model="catForm.sort_order" :min="0" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { openSourceApi, commonApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconSearch, IconPlus } from '@arco-design/web-vue/es/icon';

const activeTab = ref('list');
const list = ref<any[]>([]);
const loading = ref(false);
const keyword = ref('');
const osCategory = ref('');
const categoryList = ref<any[]>([]);
const catLoading = ref(false);
const modalVisible = ref(false);
const isEdit = ref(false);
const editId = ref(0);
const fileList = ref<any[]>([]);
const catModalVisible = ref(false);
const isCatEdit = ref(false);
const editCatId = ref(0);

const pagination = reactive({ current: 1, pageSize: 10, total: 0, showTotal: true });

const form = reactive({ title: '', category: '', version: '', repo_url: '', description: '', content: '', cover_image: '', status: 'draft' });
const catForm = reactive({ name: '', description: '', sort_order: 0 });

function resetForm() {
  Object.assign(form, { title: '', category: '', version: '', repo_url: '', description: '', content: '', cover_image: '', status: 'draft' });
  fileList.value = [];
}
function resetCatForm() {
  Object.assign(catForm, { name: '', description: '', sort_order: 0 });
}

async function fetchList() {
  loading.value = true;
  try {
    const res: any = await openSourceApi.getList(pagination.current, pagination.pageSize, osCategory.value || undefined);
    if (res.success) {
      list.value = res.data?.list || res.data?.items || [];
      pagination.total = res.data?.total || 0;
    }
  } catch { Message.error('获取列表失败'); }
  finally { loading.value = false; }
}

async function fetchCategories() {
  catLoading.value = true;
  try {
    const res: any = await openSourceApi.getCategories();
    if (res.success) categoryList.value = res.data?.list || res.data?.items || res.data || [];
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
    if (record.cover_image) fileList.value = [{ uid: '-1', name: 'cover', url: record.cover_image }];
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
  if (!form.title || !form.category) { Message.warning('请填写必填项'); return; }
  try {
    const res: any = isEdit.value ? await openSourceApi.update(editId.value, form) : await openSourceApi.create(form);
    if (res.success) { Message.success(isEdit.value ? '更新成功' : '创建成功'); modalVisible.value = false; fetchList(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleCategorySubmit() {
  if (!catForm.name) { Message.warning('请填写分类名称'); return; }
  try {
    const res: any = isCatEdit.value ? await openSourceApi.updateCategory(editCatId.value, catForm) : await openSourceApi.createCategory(catForm);
    if (res.success) { Message.success(isCatEdit.value ? '更新成功' : '创建成功'); catModalVisible.value = false; fetchCategories(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleDelete(id: number) {
  try {
    const res: any = await openSourceApi.remove(id);
    if (res.success) { Message.success('删除成功'); fetchList(); }
    else Message.error(res.message || '删除失败');
  } catch { Message.error('删除失败'); }
}

async function handleDeleteCategory(id: number) {
  try {
    const res: any = await openSourceApi.removeCategory(id);
    if (res.success) { Message.success('删除成功'); fetchCategories(); }
    else Message.error(res.message || '删除失败');
  } catch { Message.error('删除失败'); }
}

function handleUpload(options: any) {
  commonApi.uploadImage(options.fileItem?.file || options.file).then((res: any) => {
    if (res.success) { form.cover_image = res.data?.url || res.data; options.onSuccess(res); }
    else options.onError(res);
  }).catch((e: any) => { options.onError(e); });
}
function onFileChange(fileListVal: any[]) { fileList.value = fileListVal; }

onMounted(() => { fetchList(); fetchCategories(); });
</script>
