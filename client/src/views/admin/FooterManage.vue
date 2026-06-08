<template>
  <div>
    <a-card>
      <a-row :gutter="16" align="center" class="mb-4">
        <a-col :span="6">
          <a-select v-model="sectionFilter" placeholder="按分组筛选" allow-clear @change="fetchList" @clear="fetchList">
            <a-option v-for="s in sections" :key="s" :value="s">{{ s }}</a-option>
          </a-select>
        </a-col>
        <a-col :span="8">
          <p class="text-gray-500">管理网站底部Footer内容</p>
        </a-col>
        <a-col :span="10" style="text-align: right">
          <a-button type="primary" @click="openModal()">
            <template #icon><icon-plus /></template>
            添加Footer项
          </a-button>
        </a-col>
      </a-row>

      <a-table :data="filteredList" :loading="loading" row-key="id" :pagination="false">
        <template #columns>
          <a-table-column title="分组" data-index="sectionTitle" :width="120">
            <template #cell="{ record }">
              <a-tag>{{ record.sectionTitle }}</a-tag>
            </template>
          </a-table-column>
          <a-table-column title="标题" data-index="title" :width="160" />
          <a-table-column title="链接" data-index="url" :width="200" ellipsis />
          <a-table-column title="排序" data-index="sortOrder" :width="80" />
          <a-table-column title="状态" :width="80">
            <template #cell="{ record }">
              <a-tag :color="record.isActive === 1 ? 'green' : 'red'">
                {{ record.isActive === 1 ? '启用' : '禁用' }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="操作" :width="160" fixed="right">
            <template #cell="{ record }">
              <a-button type="text" size="small" @click="openModal(record)">编辑</a-button>
              <a-popconfirm content="确定删除该项？" @ok="handleDelete(record.id)">
                <a-button type="text" size="small" status="danger">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <a-modal v-model:visible="modalVisible" :title="isEdit ? '编辑Footer项' : '新增Footer项'" @ok="handleSubmit" :mask-closable="false">
      <a-form :model="form" layout="vertical">
        <a-form-item label="分组标题" required>
          <a-select v-model="form.sectionTitle" placeholder="请选择或输入分组标题" allow-create>
            <a-option v-for="s in sections" :key="s" :value="s">{{ s }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item label="标题" required>
          <a-input v-model="form.title" placeholder="请输入标题" />
        </a-form-item>
        <a-form-item label="链接">
          <a-input v-model="form.url" placeholder="请输入链接地址" />
        </a-form-item>
        <a-form-item label="图标">
          <a-input v-model="form.icon" placeholder="请输入图标类名" />
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number v-model="form.sortOrder" :min="0" />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model="form.isActive">
            <a-option :value="1">启用</a-option>
            <a-option :value="0">禁用</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { footerApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconPlus } from '@arco-design/web-vue/es/icon';

const list = ref<any[]>([]);
const loading = ref(false);
const sectionFilter = ref('');
const modalVisible = ref(false);
const isEdit = ref(false);
const editId = ref(0);

const form = reactive({ sectionTitle: '', title: '', url: '', icon: '', sortOrder: 0, isActive: 1 });

const sections = computed(() => {
  const set = new Set<string>();
  list.value.forEach((item: any) => { if (item.sectionTitle) set.add(item.sectionTitle); });
  return Array.from(set);
});

const filteredList = computed(() => {
  if (!sectionFilter.value) return list.value;
  return list.value.filter((item: any) => item.sectionTitle === sectionFilter.value);
});

function resetForm() {
  Object.assign(form, { sectionTitle: '', title: '', url: '', icon: '', sortOrder: 0, isActive: 1 });
}

async function fetchList() {
  loading.value = true;
  try {
    const res: any = await footerApi.getList();
    if (res.success) list.value = res.data?.items || res.data || [];
  } catch { Message.error('获取列表失败'); }
  finally { loading.value = false; }
}

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
  if (!form.sectionTitle || !form.title) { Message.warning('请填写必填项'); return; }
  try {
    const res: any = isEdit.value ? await footerApi.update(editId.value, form) : await footerApi.create(form);
    if (res.success) { Message.success(isEdit.value ? '更新成功' : '创建成功'); modalVisible.value = false; fetchList(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleDelete(id: number) {
  try {
    const res: any = await footerApi.remove(id);
    if (res.success) { Message.success('删除成功'); fetchList(); }
    else Message.error(res.message || '删除失败');
  } catch { Message.error('删除失败'); }
}

onMounted(fetchList);
</script>
