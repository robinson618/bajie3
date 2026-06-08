<template>
  <div>
    <a-card>
      <a-row :gutter="16">
        <a-col :span="6">
          <a-card title="分类" :bordered="false">
            <a-button type="primary" size="small" class="mb-3" @click="openCategoryModal()">
              <template #icon><icon-plus /></template>新增分类
            </a-button>
            <a-tree :data="categoryTree" :field-names="{ key: 'id', title: 'name', children: 'children' }" :selected-keys="selectedCatKeys" @select="onCatSelect" />
          </a-card>
        </a-col>
        <a-col :span="18">
          <a-row :gutter="16" align="center" class="mb-4">
            <a-col :span="8">
              <a-input v-model="keyword" placeholder="搜索文档标题..." allow-clear @clear="fetchList" @press-enter="fetchList">
                <template #prefix><icon-search /></template>
              </a-input>
            </a-col>
            <a-col :span="4">
              <a-button type="primary" @click="fetchList">搜索</a-button>
            </a-col>
            <a-col :span="12" style="text-align: right">
              <a-button type="primary" @click="openModal()">
                <template #icon><icon-plus /></template>
                新增文档
              </a-button>
            </a-col>
          </a-row>

          <a-table :data="list" :pagination="pagination" :loading="loading" @page-change="onPageChange" row-key="id">
            <template #columns>
              <a-table-column title="标题" data-index="title" :width="200" ellipsis />
              <a-table-column title="分类" data-index="categoryName" :width="100" />
              <a-table-column title="作者" data-index="author" :width="100" />
              <a-table-column title="排序" data-index="sortOrder" :width="80" />
              <a-table-column title="操作" :width="160" fixed="right">
                <template #cell="{ record }">
                  <a-button type="text" size="small" @click="openModal(record)">编辑</a-button>
                  <a-popconfirm content="确定删除该文档？" @ok="handleDelete(record.id)">
                    <a-button type="text" size="small" status="danger">删除</a-button>
                  </a-popconfirm>
                </template>
              </a-table-column>
            </template>
          </a-table>
        </a-col>
      </a-row>
    </a-card>

    <a-modal v-model:visible="modalVisible" :title="isEdit ? '编辑文档' : '新增文档'" @ok="handleSubmit" :mask-closable="false" :width="600">
      <a-form :model="form" layout="vertical">
        <a-form-item label="标题" required>
          <a-input v-model="form.title" placeholder="请输入标题" />
        </a-form-item>
        <a-form-item label="分类" required>
          <a-select v-model="form.categoryId" placeholder="请选择分类">
            <a-option v-for="c in categoryList" :key="c.id" :value="c.id">{{ c.name }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item label="作者">
          <a-input v-model="form.author" placeholder="请输入作者" />
        </a-form-item>
        <a-form-item label="内容">
          <a-textarea v-model="form.content" placeholder="请输入内容" :auto-size="{ minRows: 8 }" />
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number v-model="form.sortOrder" :min="0" />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:visible="catModalVisible" :title="isCatEdit ? '编辑分类' : '新增分类'" @ok="handleCategorySubmit" :mask-closable="false">
      <a-form :model="catForm" layout="vertical">
        <a-form-item label="分类名称" required>
          <a-input v-model="catForm.name" placeholder="请输入分类名称" />
        </a-form-item>
        <a-form-item label="父分类">
          <a-select v-model="catForm.parentId" placeholder="无（顶级分类）" allow-clear>
            <a-option v-for="c in flatCategories" :key="c.id" :value="c.id">{{ c.name }}</a-option>
          </a-select>
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
import { ref, reactive, computed, onMounted } from 'vue';
import { documentsApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconSearch, IconPlus } from '@arco-design/web-vue/es/icon';

const list = ref<any[]>([]);
const loading = ref(false);
const keyword = ref('');
const categoryList = ref<any[]>([]);
const selectedCatKeys = ref<number[]>([]);
const selectedCategoryId = ref<number | undefined>();
const modalVisible = ref(false);
const isEdit = ref(false);
const editId = ref(0);
const catModalVisible = ref(false);
const isCatEdit = ref(false);
const editCatId = ref(0);

const pagination = reactive({ current: 1, pageSize: 10, total: 0, showTotal: true });

const form = reactive({ title: '', categoryId: undefined as number | undefined, author: '', content: '', sortOrder: 0 });
const catForm = reactive({ name: '', parentId: undefined as number | undefined, description: '', sortOrder: 0 });

const categoryTree = computed(() => {
  const items = [...categoryList.value];
  const map = new Map<number, any>();
  const roots: any[] = [];
  items.forEach((item: any) => { map.set(item.id, { ...item, children: [] }); });
  items.forEach((item: any) => {
    const node = map.get(item.id);
    if (item.parentId && map.has(item.parentId)) map.get(item.parentId).children.push(node);
    else roots.push(node);
  });
  return roots;
});

const flatCategories = computed(() => categoryList.value.filter((c: any) => !c.parentId));

function resetForm() { Object.assign(form, { title: '', categoryId: undefined, author: '', content: '', sortOrder: 0 }); }
function resetCatForm() { Object.assign(catForm, { name: '', parentId: undefined, description: '', sortOrder: 0 }); }

async function fetchList() {
  loading.value = true;
  try {
    const res: any = await documentsApi.getList(pagination.current, pagination.pageSize, selectedCategoryId.value);
    if (res.success) { list.value = res.data?.items || []; pagination.total = res.data?.total || 0; }
  } catch { Message.error('获取列表失败'); }
  finally { loading.value = false; }
}

async function fetchCategories() {
  try {
    const res: any = await documentsApi.getCategories();
    if (res.success) categoryList.value = res.data?.items || res.data || [];
  } catch { Message.error('获取分类失败'); }
}

function onCatSelect(keys: any[]) {
  selectedCatKeys.value = keys;
  selectedCategoryId.value = keys[0] || undefined;
  pagination.current = 1;
  fetchList();
}

function onPageChange(page: number) { pagination.current = page; fetchList(); }

function openModal(record?: any) {
  resetForm();
  if (record) { isEdit.value = true; editId.value = record.id; Object.assign(form, record); }
  else { isEdit.value = false; if (selectedCategoryId.value) form.categoryId = selectedCategoryId.value; }
  modalVisible.value = true;
}

function openCategoryModal(record?: any) {
  resetCatForm();
  if (record) { isCatEdit.value = true; editCatId.value = record.id; Object.assign(catForm, record); }
  else isCatEdit.value = false;
  catModalVisible.value = true;
}

async function handleSubmit() {
  if (!form.title || !form.categoryId) { Message.warning('请填写必填项'); return; }
  try {
    const res: any = isEdit.value ? await documentsApi.update(editId.value, form) : await documentsApi.create(form);
    if (res.success) { Message.success(isEdit.value ? '更新成功' : '创建成功'); modalVisible.value = false; fetchList(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleCategorySubmit() {
  if (!catForm.name) { Message.warning('请填写分类名称'); return; }
  try {
    const res: any = isCatEdit.value ? await documentsApi.updateCategory(editCatId.value, catForm) : await documentsApi.createCategory(catForm);
    if (res.success) { Message.success(isCatEdit.value ? '更新成功' : '创建成功'); catModalVisible.value = false; fetchCategories(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleDelete(id: number) {
  try { const res: any = await documentsApi.remove(id); if (res.success) { Message.success('删除成功'); fetchList(); } else Message.error(res.message || '删除失败'); }
  catch { Message.error('删除失败'); }
}

onMounted(() => { fetchList(); fetchCategories(); });
</script>
