<template>
  <div class="dashboard">
    <a-row :gutter="16" class="mb-6">
      <a-col :span="4" v-for="item in statCards" :key="item.title">
        <a-card class="stat-card" hoverable>
          <a-statistic :title="item.title" :value="item.value" :value-style="{ color: item.color }">
            <template #prefix>
              <span class="stat-icon" :style="{ background: item.bgColor }">
                <component :is="item.icon" />
              </span>
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <a-card title="快捷操作">
      <a-row :gutter="16">
        <a-col :span="4" v-for="action in quickActions" :key="action.title">
          <a-button long @click="$router.push(action.path)" class="quick-action-btn">
            <template #icon><component :is="action.icon" /></template>
            {{ action.title }}
          </a-button>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { commonApi } from '@/api';
import { Message } from '@arco-design/web-vue';
import {
  IconUser, IconFile, IconThunderbolt, IconApps, IconMessage,
  IconEdit, IconPlus, IconSettings, IconUserGroup
} from '@arco-design/web-vue/es/icon';

const statCards = ref([
  { title: '用户数', value: 0, color: '#165DFF', bgColor: '#E8F3FF', icon: IconUser },
  { title: '资讯数', value: 0, color: '#0FC6C2', bgColor: '#E8FFFB', icon: IconFile },
  { title: '技能数', value: 0, color: '#722ED1', bgColor: '#F5E8FF', icon: IconThunderbolt },
  { title: '应用数', value: 0, color: '#F77234', bgColor: '#FFF3E8', icon: IconApps },
  { title: '讨论数', value: 0, color: '#F53F3F', bgColor: '#FFECE8', icon: IconMessage },
]);

const quickActions = [
  { title: '发布资讯', path: '/admin/news', icon: IconEdit },
  { title: '添加技能', path: '/admin/skills', icon: IconPlus },
  { title: '添加应用', path: '/admin/apps', icon: IconPlus },
  { title: '管理讨论', path: '/admin/discussions', icon: IconMessage },
  { title: '用户管理', path: '/admin/users', icon: IconUserGroup },
  { title: '站点配置', path: '/admin/site', icon: IconSettings },
];

async function fetchStats() {
  try {
    const res: any = await commonApi.getStats();
    if (res.success) {
      const d = res.data;
      statCards.value[0].value = d.users || 0;
      statCards.value[1].value = d.news || 0;
      statCards.value[2].value = d.skills || 0;
      statCards.value[3].value = d.apps || 0;
      statCards.value[4].value = d.discussions || 0;
    }
  } catch {
    Message.error('获取统计数据失败');
  }
}

onMounted(fetchStats);
</script>

<style scoped>
.stat-card {
  text-align: center;
}
.stat-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  margin-right: 4px;
}
.quick-action-btn {
  margin-bottom: 8px;
}
</style>
