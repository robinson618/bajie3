<template>
  <div>
    <a-card>
      <a-row :gutter="16" align="center" class="mb-4">
        <a-col :span="6">
          <a-input v-model="keyword" placeholder="搜索标题..." allow-clear @clear="fetchList" @press-enter="fetchList">
            <template #prefix><icon-search /></template>
          </a-input>
        </a-col>
        <a-col :span="4">
          <a-select v-model="category" placeholder="分类筛选" allow-clear @change="fetchList" @clear="fetchList">
            <a-option v-for="c in categories" :key="c" :value="c">{{ c }}</a-option>
          </a-select>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="fetchList">搜索</a-button>
        </a-col>
        <a-col :span="10" style="text-align: right">
          <a-button type="primary" @click="openModal()">
            <template #icon><icon-plus /></template>
            新增资讯
          </a-button>
        </a-col>
      </a-row>

      <a-table :data="list" :pagination="pagination" :loading="loading" @page-change="onPageChange" row-key="id">
        <template #columns>
          <a-table-column title="标题" data-index="title" :width="240" ellipsis />
          <a-table-column title="分类" data-index="category" :width="100" />
          <a-table-column title="作者" data-index="author" :width="100" />
          <a-table-column title="浏览量" data-index="views" :width="80" />
          <a-table-column title="状态" :width="80">
            <template #cell="{ record }">
              <a-tag :color="record.isPublished === 1 ? 'green' : 'orange'">
                {{ record.isPublished === 1 ? '已发布' : '草稿' }}
              </a-tag>
            </template>
          </a-table-column>
          <a-table-column title="操作" :width="160" fixed="right">
            <template #cell="{ record }">
              <a-button type="text" size="small" @click="openModal(record)">编辑</a-button>
              <a-popconfirm content="确定删除该资讯？" @ok="handleDelete(record.id)">
                <a-button type="text" size="small" status="danger">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>

    <a-modal v-model:visible="modalVisible" :title="isEdit ? '编辑资讯' : '新增资讯'" @ok="handleSubmit" :mask-closable="false">
      <a-form :model="form" layout="vertical">
        <a-form-item label="标题" required>
          <a-input v-model="form.title" placeholder="请输入标题" />
        </a-form-item>
        <a-form-item label="分类" required>
          <a-select v-model="form.category" placeholder="请选择分类" allow-create>
            <a-option v-for="c in categories" :key="c" :value="c">{{ c }}</a-option>
          </a-select>
        </a-form-item>
        <a-form-item label="作者">
          <a-input v-model="form.author" placeholder="请输入作者" />
        </a-form-item>
        <a-form-item label="摘要">
          <a-textarea v-model="form.summary" placeholder="请输入摘要" :max-length="200" />
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
          <a-select v-model="form.isPublished">
            <a-option :value="0">草稿</a-option>
            <a-option :value="1">已发布</a-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { newsApi, commonApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconSearch, IconPlus } from '@arco-design/web-vue/es/icon';

const list = ref<any[]>([]);
const loading = ref(false);
const keyword = ref('');
const category = ref('');
const categories = ['行业动态', '技术前沿', '产品发布', '公司新闻'];
const modalVisible = ref(false);
const isEdit = ref(false);
const editId = ref(0);
const fileList = ref<any[]>([]);

const pagination = reactive({ current: 1, pageSize: 10, total: 0, showTotal: true });

const form = reactive({
  title: '', category: '', author: '', summary: '', content: '', coverImage: '', isPublished: 0,
});

function resetForm() {
  Object.assign(form, { title: '', category: '', author: '', summary: '', content: '', coverImage: '', isPublished: 0 });
  fileList.value = [];
}

async function fetchList() {
  loading.value = true;
  try {
    const res: any = await newsApi.getList(pagination.current, pagination.pageSize, category.value || undefined);
    if (res.success) {
      list.value = res.data?.items || [];
      pagination.total = res.data?.total || 0;
    }
  } catch { Message.error('获取列表失败'); }
  finally { loading.value = false; }
}

function onPageChange(page: number) {
  pagination.current = page;
  fetchList();
}

function openModal(record?: any) {
  resetForm();
  if (record) {
    isEdit.value = true;
    editId.value = record.id;
    Object.assign(form, { title: record.title, category: record.category, author: record.author, summary: record.summary, content: record.content, coverImage: record.coverImage, isPublished: record.isPublished });
    if (record.coverImage) fileList.value = [{ uid: '-1', name: 'cover', url: record.coverImage }];
  } else {
    isEdit.value = false;
  }
  modalVisible.value = true;
}

async function handleSubmit() {
  if (!form.title || !form.category) { Message.warning('请填写必填项'); return; }
  try {
    const res: any = isEdit.value ? await newsApi.update(editId.value, form) : await newsApi.create(form);
    if (res.success) { Message.success(isEdit.value ? '更新成功' : '创建成功'); modalVisible.value = false; fetchList(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleDelete(id: number) {
  try {
    const res: any = await newsApi.remove(id);
    if (res.success) { Message.success('删除成功'); fetchList(); }
    else Message.error(res.message || '删除失败');
  } catch { Message.error('删除失败'); }
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
