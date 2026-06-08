<template>
  <div>
    <a-card>
      <a-row :gutter="16" align="center" class="mb-4">
        <a-col :span="14">
          <p class="text-gray-500">配置各页面的SEO信息（标题、描述、关键词等）</p>
        </a-col>
        <a-col :span="10" style="text-align: right">
          <a-button type="primary" @click="openModal()">
            <template #icon><icon-plus /></template>
            添加SEO配置
          </a-button>
        </a-col>
      </a-row>

      <a-table :data="list" :pagination="pagination" :loading="loading" @page-change="onPageChange" row-key="id">
        <template #columns>
          <a-table-column title="页面" data-index="page_slug" :width="120" />
          <a-table-column title="Meta标题" data-index="meta_title" :width="200" ellipsis />
          <a-table-column title="Meta描述" data-index="meta_description" :width="240" ellipsis />
          <a-table-column title="关键词" :width="200">
            <template #cell="{ record }">
              <template v-if="record.meta_keywords">
                <a-tag v-for="kw in (Array.isArray(record.meta_keywords) ? record.meta_keywords : String(record.meta_keywords).split(','))" :key="kw" size="small" class="mr-1">{{ kw }}</a-tag>
              </template>
              <span v-else>-</span>
            </template>
          </a-table-column>
          <a-table-column title="操作" :width="160" fixed="right">
            <template #cell="{ record }">
              <a-button type="text" size="small" @click="openModal(record)">编辑</a-button>
              <a-popconfirm content="确定删除该SEO配置？" @ok="handleDelete(record.id)">
                <a-button type="text" size="small" status="danger">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <a-modal v-model:visible="modalVisible" :title="isEdit ? '编辑SEO配置' : '新增SEO配置'" @ok="handleSubmit" :mask-closable="false">
      <a-form :model="form" layout="vertical">
        <a-form-item label="页面标识" required>
          <a-input v-model="form.page_slug" placeholder="如 home, news, apps" />
        </a-form-item>
        <a-form-item label="Meta标题" required>
          <a-input v-model="form.meta_title" placeholder="请输入Meta标题" />
        </a-form-item>
        <a-form-item label="Meta描述">
          <a-textarea v-model="form.meta_description" placeholder="请输入Meta描述" :max-length="200" />
        </a-form-item>
        <a-form-item label="关键词">
          <a-input-tag v-model="form.meta_keywords" placeholder="输入后回车添加关键词" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { seoApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconPlus } from '@arco-design/web-vue/es/icon';

const list = ref<any[]>([]);
const loading = ref(false);
const modalVisible = ref(false);
const isEdit = ref(false);
const editId = ref(0);

const pagination = reactive({ current: 1, pageSize: 10, total: 0, showTotal: true });

const form = reactive({
  page_slug: '',
  meta_title: '',
  meta_description: '',
  meta_keywords: [] as string[],
});

function resetForm() {
  Object.assign(form, { page_slug: '', meta_title: '', meta_description: '', meta_keywords: [] });
}

async function fetchList() {
  loading.value = true;
  try {
    const res: any = await seoApi.getList(pagination.current, pagination.pageSize);
    if (res.success) {
      list.value = res.data?.list || res.data?.items || [];
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
    Object.assign(form, {
      ...record,
      meta_keywords: Array.isArray(record.meta_keywords)
        ? record.meta_keywords
        : record.meta_keywords ? String(record.meta_keywords).split(',') : [],
    });
  } else {
    isEdit.value = false;
  }
  modalVisible.value = true;
}

async function handleSubmit() {
  if (!form.page_slug || !form.meta_title) { Message.warning('请填写必填项'); return; }
  try {
    const res: any = isEdit.value ? await seoApi.update(editId.value, form) : await seoApi.create(form);
    if (res.success) { Message.success(isEdit.value ? '更新成功' : '创建成功'); modalVisible.value = false; fetchList(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleDelete(id: number) {
  try {
    const res: any = await seoApi.remove(id);
    if (res.success) { Message.success('删除成功'); fetchList(); }
    else Message.error(res.message || '删除失败');
  } catch { Message.error('删除失败'); }
}

onMounted(fetchList);
</script>
VUEEOF; __tr_native_ec=$?; pwd -P >| '/var/folders/bj/brc4gsps4tjgknm93lxfcwvr0000gn/T/agent-toolhost/jobs/job-df91505569ed4c4bb27a0fa0b4112c5c/cwd.txt'; exit "$__tr_native_ec"