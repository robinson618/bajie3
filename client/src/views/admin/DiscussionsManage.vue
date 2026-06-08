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
          <a-button type="primary" @click="fetchList">搜索</a-button>
        </a-col>
      </a-row>

      <a-table :data="list" :pagination="pagination" :loading="loading" @page-change="onPageChange" row-key="id">
        <template #columns>
          <a-table-column title="标题" data-index="title" :width="300" ellipsis />
          <a-table-column title="作者" data-index="author" :width="120" />
          <a-table-column title="评论数" data-index="comments" :width="80" />
          <a-table-column title="浏览量" data-index="views" :width="80" />
          <a-table-column title="置顶" :width="80">
            <template #cell="{ record }">
              <a-switch :model-value="record.isPinned" @change="(val: any) => handleTogglePin(record, val)" />
            </template>
          </a-table-column>
          <a-table-column title="操作" :width="100" fixed="right">
            <template #cell="{ record }">
              <a-popconfirm content="确定删除该讨论？" @ok="handleDelete(record.id)">
                <a-button type="text" size="small" status="danger">删除</a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { discussionsApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import { IconSearch } from '@arco-design/web-vue/es/icon';

const list = ref<any[]>([]);
const loading = ref(false);
const keyword = ref('');

const pagination = reactive({ current: 1, pageSize: 10, total: 0, showTotal: true });

async function fetchList() {
  loading.value = true;
  try {
    const res: any = await discussionsApi.getList(pagination.current, pagination.pageSize, keyword.value || undefined);
    if (res.success) { list.value = res.data?.items || []; pagination.total = res.data?.total || 0; }
  } catch { Message.error('获取列表失败'); }
  finally { loading.value = false; }
}

function onPageChange(page: number) { pagination.current = page; fetchList(); }

async function handleTogglePin(record: any, val: any) {
  try {
    const res: any = await discussionsApi.togglePin(record.id, !!val);
    if (res.success) { Message.success(val ? '已置顶' : '已取消置顶'); fetchList(); }
    else Message.error(res.message || '操作失败');
  } catch { Message.error('操作失败'); }
}

async function handleDelete(id: number) {
  try { const res: any = await discussionsApi.remove(id); if (res.success) { Message.success('删除成功'); fetchList(); } else Message.error(res.message || '删除失败'); }
  catch { Message.error('删除失败'); }
}

onMounted(fetchList);
</script>
