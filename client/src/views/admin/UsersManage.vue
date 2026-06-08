<template>
  <div>
    <a-card>
      <a-row :gutter="16" align="center" class="mb-4">
        <a-col :span="6">
          <a-input v-model="keyword" placeholder="搜索用户名/邮箱..." allow-clear @clear="fetchList" @press-enter="fetchList">
            <template #prefix><icon-search /></template>
          </a-input>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="fetchList">搜索</a-button>
        </a-col>
      </a-row>

      <a-table :data="list" :pagination="pagination" :loading="loading" @page-change="onPageChange" row-key="id">
        <template #columns>
          <a-table-column title="ID" data-index="id" :width="60" />
          <a-table-column title="用户名" data-index="username" :width="120" />
          <a-table-column title="邮箱" data-index="email" :width="200" />
          <a-table-column title="角色" :width="100">
            <template #cell="{ record }">
              <a-tag :color="record.role === 'admin' ? 'blue' : 'green'">
                {{ record.role === 'admin' ? '管理员' : '用户' }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="创建时间" data-index="created_at" :width="180" />
          <a-table-column title="操作" :width="200" fixed="right">
            <template #cell="{ record }">
              <a-button type="text" size="small" @click="openEditModal(record)">编辑</a-button>
              <a-button type="text" size="small" @click="openResetModal(record)">重置密码</a-button>
              <a-popconfirm content="确定删除该用户？" @ok="handleDelete(record.id)">
                <a-button type="text" size="small" status="danger">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <a-modal v-model:visible="editModalVisible" title="编辑用户" @ok="handleEditSubmit" :mask-closable="false">
      <a-form :model="editForm" layout="vertical">
        <a-form-item label="用户名">
          <a-input v-model="editForm.username" disabled />
        </a-form-item>
        <a-form-item label="邮箱">
          <a-input v-model="editForm.email" disabled />
        </a-form-item>
        <a-form-item label="角色" required>
          <a-select v-model="editForm.role">
            <a-option value="admin">管理员</a-option>
            <a-option value="user">用户</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>

    <a-modal v-model:visible="resetModalVisible" title="重置密码" @ok="handleResetSubmit" :mask-closable="false">
      <a-form :model="resetForm" layout="vertical">
        <a-form-item label="新密码" required>
          <a-input-password v-model="resetForm.password" placeholder="请输入新密码" />
        </a-form-item>
        <a-form-item label="确认密码" required>
          <a-input-password v-model="resetForm.confirmPassword" placeholder="请再次输入新密码" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { usersApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconSearch } from '@arco-design/web-vue/es/icon';

const list = ref<any[]>([]);
const loading = ref(false);
const keyword = ref('');
const editModalVisible = ref(false);
const resetModalVisible = ref(false);
const editId = ref(0);

const pagination = reactive({ current: 1, pageSize: 10, total: 0, showTotal: true });

const editForm = reactive({ username: '', email: '', role: 'user' });
const resetForm = reactive({ password: '', confirmPassword: '' });

async function fetchList() {
  loading.value = true;
  try {
    const res: any = await usersApi.getList(pagination.current, pagination.pageSize, keyword.value || undefined);
    if (res.success) {
      list.value = res.data?.list || res.data?.items || [];
      pagination.total = res.data?.total || 0;
    }
  } catch { Message.error('获取列表失败'); }
  finally { loading.value = false; }
}

function onPageChange(page: number) { pagination.current = page; fetchList(); }

function openEditModal(record: any) {
  editId.value = record.id;
  Object.assign(editForm, { username: record.username, email: record.email, role: record.role });
  editModalVisible.value = true;
}

function openResetModal(record: any) {
  editId.value = record.id;
  Object.assign(resetForm, { password: '', confirmPassword: '' });
  resetModalVisible.value = true;
}

async function handleEditSubmit() {
  if (!editForm.role) { Message.warning('请选择角色'); return; }
  try {
    const res: any = await usersApi.update(editId.value, { role: editForm.role });
    if (res.success) { Message.success('更新成功'); editModalVisible.value = false; fetchList(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleResetSubmit() {
  if (!resetForm.password || !resetForm.confirmPassword) { Message.warning('请填写密码'); return; }
  if (resetForm.password !== resetForm.confirmPassword) { Message.warning('两次密码不一致'); return; }
  try {
    const res: any = await usersApi.resetPassword(editId.value, resetForm.password);
    if (res.success) { Message.success('密码重置成功'); resetModalVisible.value = false; }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleDelete(id: number) {
  try {
    const res: any = await usersApi.remove(id);
    if (res.success) { Message.success('删除成功'); fetchList(); }
    else Message.error(res.message || '删除失败');
  } catch { Message.error('删除失败'); }
}

onMounted(fetchList);
</script>
