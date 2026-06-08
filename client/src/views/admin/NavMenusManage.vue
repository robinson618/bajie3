<template>
  <div>
    <a-card>
      <a-row :gutter="16" align="center" class="mb-4">
        <a-col :span="14">
          <p class="text-gray-500">管理网站顶部导航菜单</p>
        </a-col>
        <a-col :span="10" style="text-align: right">
          <a-button type="primary" @click="openModal()">
            <template #icon><icon-plus /></template>
            添加导航
          </a-button>
        </a-col>
      </a-row>

      <a-table :data="treeData" :loading="loading" row-key="id" :pagination="false" :default-expand-all-rows="true">
        <template #columns>
          <a-table-column title="标题" data-index="title" :width="200" />
          <a-table-column title="链接" data-index="url" :width="200" ellipsis />
          <a-table-column title="上级菜单" :width="120">
            <template #cell="{ record }">
              {{ getParentName(record.parentId) }}
            </template>
          </a-table-column>
          <a-table-column title="排序" data-index="sortOrder" :width="80" />
          <a-table-column title="状态" :width="80">
            <template #cell="{ record }">
              <a-tag :color="record.status === 'active' ? 'green' : 'red'">
                {{ record.status === 'active' ? '启用' : '禁用' }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="操作" :width="160" fixed="right">
            <template #cell="{ record }">
              <a-button type="text" size="small" @click="openModal(record)">编辑</a-button>
              <a-popconfirm content="确定删除该导航？" @ok="handleDelete(record.id)">
                <a-button type="text" size="small" status="danger">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <a-modal v-model:visible="modalVisible" :title="isEdit ? '编辑导航' : '新增导航'" @ok="handleSubmit" :mask-closable="false">
      <a-form :model="form" layout="vertical">
        <a-form-item label="标题" required>
          <a-input v-model="form.title" placeholder="请输入导航标题" />
        </a-form-item>
        <a-form-item label="链接">
          <a-input v-model="form.url" placeholder="请输入链接地址" />
        </a-form-item>
        <a-form-item label="上级菜单">
          <a-select v-model="form.parentId" placeholder="无（顶级菜单）" allow-clear>
            <a-option v-for="m in topMenus" :key="m.id" :value="m.id">{{ m.title }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item label="排序">
          <a-input-number v-model="form.sortOrder" :min="0" />
        </a-form-item>
        <a-form-item label="状态">
          <a-select v-model="form.status">
            <a-option value="active">启用</a-option>
            <a-option value="inactive">禁用</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue';
import { navMenusApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconPlus } from '@arco-design/web-vue/es/icon';

const list = ref<any[]>([]);
const loading = ref(false);
const modalVisible = ref(false);
const isEdit = ref(false);
const editId = ref(0);

const form = reactive({ title: '', url: '', parentId: undefined as number | undefined, sortOrder: 0, status: 'active' });

const treeData = computed(() => {
  const items = [...list.value];
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

const topMenus = computed(() => list.value.filter((m: any) => !m.parentId));

function getParentName(parentId: number | undefined) {
  if (!parentId) return '-';
  const parent = list.value.find((m: any) => m.id === parentId);
  return parent ? parent.title : '-';
}

function resetForm() {
  Object.assign(form, { title: '', url: '', parentId: undefined, sortOrder: 0, status: 'active' });
}

async function fetchList() {
  loading.value = true;
  try {
    const res: any = await navMenusApi.getList();
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
  if (!form.title) { Message.warning('请填写标题'); return; }
  try {
    const res: any = isEdit.value ? await navMenusApi.update(editId.value, form) : await navMenusApi.create(form);
    if (res.success) { Message.success(isEdit.value ? '更新成功' : '创建成功'); modalVisible.value = false; fetchList(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleDelete(id: number) {
  try {
    const res: any = await navMenusApi.remove(id);
    if (res.success) { Message.success('删除成功'); fetchList(); }
    else Message.error(res.message || '删除失败');
  } catch { Message.error('删除失败'); }
}

onMounted(fetchList);
</script>
