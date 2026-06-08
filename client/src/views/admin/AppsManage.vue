<template>
  <div>
    <a-card>
      <a-row :gutter="16" align="center" class="mb-4">
        <a-col :span="6">
          <a-input v-model="keyword" placeholder="搜索应用名称..." allow-clear @clear="fetchList" @press-enter="fetchList">
            <template #prefix><icon-search /></template>
          </a-input>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="fetchList">搜索</a-button>
        </a-col>
        <a-col :span="14" style="text-align: right">
          <a-button type="primary" @click="openModal()">
            <template #icon><icon-plus /></template>
            新增应用
          </a-button>
        </a-col>
      </a-row>

      <a-table :data="list" :pagination="pagination" :loading="loading" @page-change="onPageChange" row-key="id">
        <template #columns>
          <a-table-column title="名称" data-index="name" :width="160" ellipsis />
          <a-table-column title="分类" data-index="category" :width="100" />
          <a-table-column title="开发者" data-index="developer" :width="100" />
          <a-table-column title="点赞数" data-index="likeCount" :width="80" />
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
              <a-popconfirm content="确定删除该应用？" @ok="handleDelete(record.id)">
                <a-button type="text" size="small" status="danger">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <a-modal v-model:visible="modalVisible" :title="isEdit ? '编辑应用' : '新增应用'" @ok="handleSubmit" :mask-closable="false" :width="600">
      <a-form :model="form" layout="vertical">
        <a-form-item label="名称" required>
          <a-input v-model="form.name" placeholder="请输入应用名称" />
        </a-form-item>
        <a-form-item label="分类">
          <a-input v-model="form.category" placeholder="请输入分类" />
        </a-form-item>
        <a-form-item label="开发者">
          <a-input v-model="form.developer" placeholder="请输入开发者" />
        </a-form-item>
        <a-form-item label="描述">
          <a-textarea v-model="form.description" placeholder="请输入描述" />
        </a-form-item>
        <a-form-item label="内容">
          <a-textarea v-model="form.content" placeholder="请输入内容" :auto-size="{ minRows: 6 }" />
        </a-form-item>
        <a-form-item label="能力标签">
          <a-input-tag v-model="form.capabilities" placeholder="输入后回车添加标签" />
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
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { appsApi, commonApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconSearch, IconPlus } from '@arco-design/web-vue/es/icon';

const list = ref<any[]>([]);
const loading = ref(false);
const keyword = ref('');
const modalVisible = ref(false);
const isEdit = ref(false);
const editId = ref(0);
const fileList = ref<any[]>([]);

const pagination = reactive({ current: 1, pageSize: 10, total: 0, showTotal: true });

const form = reactive({ name: '', category: '', developer: '', description: '', content: '', capabilities: [] as string[], coverImage: '', status: 'draft' });

function resetForm() { Object.assign(form, { name: '', category: '', developer: '', description: '', content: '', capabilities: [], coverImage: '', status: 'draft' }); fileList.value = []; }

async function fetchList() {
  loading.value = true;
  try {
    const res: any = await appsApi.getList(pagination.current, pagination.pageSize);
    if (res.success) { list.value = res.data?.items || []; pagination.total = res.data?.total || 0; }
  } catch { Message.error('获取列表失败'); }
  finally { loading.value = false; }
}

function onPageChange(page: number) { pagination.current = page; fetchList(); }

function openModal(record?: any) {
  resetForm();
  if (record) {
    isEdit.value = true; editId.value = record.id;
    Object.assign(form, { ...record, capabilities: record.capabilities || [] });
    if (record.coverImage) fileList.value = [{ uid: '-1', name: 'cover', url: record.coverImage }];
  } else { isEdit.value = false; }
  modalVisible.value = true;
}

async function handleSubmit() {
  if (!form.name) { Message.warning('请填写必填项'); return; }
  try {
    const res: any = isEdit.value ? await appsApi.update(editId.value, form) : await appsApi.create(form);
    if (res.success) { Message.success(isEdit.value ? '更新成功' : '创建成功'); modalVisible.value = false; fetchList(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleDelete(id: number) {
  try { const res: any = await appsApi.remove(id); if (res.success) { Message.success('删除成功'); fetchList(); } else Message.error(res.message || '删除失败'); }
  catch { Message.error('删除失败'); }
}

function handleUpload(options: any) {
  commonApi.uploadImage(options.fileItem?.file || options.file).then((res: any) => {
    if (res.success) { form.coverImage = res.data?.url || res.data; options.onSuccess(res); }
    else options.onError(res);
  }).catch((e: any) => { options.onError(e); });
}
function onFileChange(fileListVal: any[]) { fileList.value = fileListVal; }

onMounted(fetchList);
</script>
