<template>
  <div>
    <a-card>
      <a-row :gutter="16" align="center" class="mb-4">
        <a-col :span="6">
          <a-input v-model="keyword" placeholder="搜索页面标题..." allow-clear @clear="fetchList" @press-enter="fetchList">
            <template #prefix><icon-search /></template>
          </a-input>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="fetchList">搜索</a-button>
        </a-col>
        <a-col :span="14" style="text-align: right">
          <a-button type="primary" @click="openModal()">
            <template #icon><icon-plus /></template>
            添加页面
          </a-button>
        </a-col>
      </a-row>

      <a-table :data="list" :pagination="pagination" :loading="loading" @page-change="onPageChange" row-key="id">
        <template #columns>
          <a-table-column title="标题" data-index="title" :width="200" ellipsis />
          <a-table-column title="Slug" data-index="slug" :width="150" />
          <a-table-column title="排序" data-index="sortOrder" :width="80" />
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
              <a-popconfirm content="确定删除该页面？" @ok="handleDelete(record.id)">
                <a-button type="text" size="small" status="danger">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <a-modal v-model:visible="modalVisible" :title="isEdit ? '编辑页面' : '新增页面'" @ok="handleSubmit" :mask-closable="false" :width="600">
      <a-form :model="form" layout="vertical">
        <a-form-item label="标题" required>
          <a-input v-model="form.title" placeholder="请输入页面标题" />
        </a-form-item>
        <a-form-item label="Slug" required>
          <a-input v-model="form.slug" placeholder="请输入URL标识（如 about-us）" />
        </a-form-item>
        <a-form-item label="内容">
          <a-textarea v-model="form.content" placeholder="请输入页面内容" :auto-size="{ minRows: 8 }" />
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { pagesApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconSearch, IconPlus } from '@arco-design/web-vue/es/icon';

const list = ref<any[]>([]);
const loading = ref(false);
const keyword = ref('');
const modalVisible = ref(false);
const isEdit = ref(false);
const editId = ref(0);

const pagination = reactive({ current: 1, pageSize: 10, total: 0, showTotal: true });

const form = reactive({ title: '', slug: '', content: '', sortOrder: 0, status: 'draft' });

function resetForm() {
  Object.assign(form, { title: '', slug: '', content: '', sortOrder: 0, status: 'draft' });
}

async function fetchList() {
  loading.value = true;
  try {
    const res: any = await pagesApi.getList(pagination.current, pagination.pageSize);
    if (res.success) {
      list.value = res.data?.items || [];
      pagination.total = res.data?.total || 0;
    }
  } catch { Message.error('获取列表失败'); }
  finally { loading.value = false; }
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

async function handleSubmit() {
  if (!form.title || !form.slug) { Message.warning('请填写必填项'); return; }
  try {
    const res: any = isEdit.value ? await pagesApi.update(editId.value, form) : await pagesApi.create(form);
    if (res.success) { Message.success(isEdit.value ? '更新成功' : '创建成功'); modalVisible.value = false; fetchList(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleDelete(id: number) {
  try {
    const res: any = await pagesApi.remove(id);
    if (res.success) { Message.success('删除成功'); fetchList(); }
    else Message.error(res.message || '删除失败');
  } catch { Message.error('删除失败'); }
}

onMounted(fetchList);
</script>
