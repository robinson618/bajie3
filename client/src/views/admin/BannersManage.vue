<template>
  <div>
    <a-card>
      <a-row :gutter="16" align="center" class="mb-4">
        <a-col :span="14">
          <p class="text-gray-500">管理网站首页轮播图</p>
        </a-col>
        <a-col :span="10" style="text-align: right">
          <a-button type="primary" @click="openModal()">
            <template #icon><icon-plus /></template>
            添加轮播图
          </a-button>
        </a-col>
      </a-row>

      <a-table :data="list" :loading="loading" row-key="id" :pagination="false">
        <template #columns>
          <a-table-column title="预览" :width="120">
            <template #cell="{ record }">
              <a-image v-if="record.imageUrl" :src="record.imageUrl" width="100" height="50" fit="cover" />
              <span v-else>-</span>
            </template>
          </a-table-column>
          <a-table-column title="标题" data-index="title" :width="160" ellipsis />
          <a-table-column title="链接" data-index="linkUrl" :width="200" ellipsis />
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
              <a-popconfirm content="确定删除该轮播图？" @ok="handleDelete(record.id)">
                <a-button type="text" size="small" status="danger">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <a-modal v-model:visible="modalVisible" :title="isEdit ? '编辑轮播图' : '新增轮播图'" @ok="handleSubmit" :mask-closable="false">
      <a-form :model="form" layout="vertical">
        <a-form-item label="标题" required>
          <a-input v-model="form.title" placeholder="请输入标题" />
        </a-form-item>
        <a-form-item label="链接">
          <a-input v-model="form.linkUrl" placeholder="请输入跳转链接" />
        </a-form-item>
        <a-form-item label="图片" required>
          <a-upload :limit="1" list-type="picture-card" :custom-request="handleUpload" :file-list="fileList" @change="onFileChange" accept="image/*">
            <template #upload-button><a-button>选择图片</a-button></template>
          </a-upload>
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
import { ref, reactive, onMounted } from 'vue';
import { bannersApi, commonApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconPlus } from '@arco-design/web-vue/es/icon';

const list = ref<any[]>([]);
const loading = ref(false);
const modalVisible = ref(false);
const isEdit = ref(false);
const editId = ref(0);
const fileList = ref<any[]>([]);

const form = reactive({ title: '', linkUrl: '', imageUrl: '', sortOrder: 0, status: 'active' });

function resetForm() {
  Object.assign(form, { title: '', linkUrl: '', imageUrl: '', sortOrder: 0, status: 'active' });
  fileList.value = [];
}

async function fetchList() {
  loading.value = true;
  try {
    const res: any = await bannersApi.getList();
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
    if (record.imageUrl) fileList.value = [{ uid: '-1', name: 'image', url: record.imageUrl }];
  } else {
    isEdit.value = false;
  }
  modalVisible.value = true;
}

async function handleSubmit() {
  if (!form.title || !form.imageUrl) { Message.warning('请填写必填项'); return; }
  try {
    const res: any = isEdit.value ? await bannersApi.update(editId.value, form) : await bannersApi.create(form);
    if (res.success) { Message.success(isEdit.value ? '更新成功' : '创建成功'); modalVisible.value = false; fetchList(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleDelete(id: number) {
  try {
    const res: any = await bannersApi.remove(id);
    if (res.success) { Message.success('删除成功'); fetchList(); }
    else Message.error(res.message || '删除失败');
  } catch { Message.error('删除失败'); }
}

function handleUpload(options: any) {
  commonApi.uploadImage(options.fileItem?.file || options.file).then((res: any) => {
    if (res.success) { form.imageUrl = res.data?.url || res.data; options.onSuccess(res); }
    else options.onError(res);
  }).catch((e: any) => { options.onError(e); });
  return { abort: () => {} };
}
function onFileChange(fileListVal: any[]) { fileList.value = fileListVal; }

onMounted(fetchList);
</script>
VUEEOF; __tr_native_ec=$?; pwd -P >| '/var/folders/bj/brc4gsps4tjgknm93lxfcwvr0000gn/T/agent-toolhost/jobs/job-ee56e578c73442f58dac7ff2c60a425c/cwd.txt'; exit "$__tr_native_ec"