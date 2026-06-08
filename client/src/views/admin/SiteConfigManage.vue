<template>
  <div>
    <a-card title="站点配置">
      <p class="text-gray-500 mb-6">配置网站基本信息</p>
      <a-form :model="form" layout="vertical" style="max-width: 640px">
        <a-divider orientation="left">Footer配置</a-divider>
        <a-form-item label="品牌标语">
          <a-input v-model="form.footer_slogan" placeholder="如：链接开发者·赋能具身智能产业" />
        </a-form-item>
        <a-form-item label="联系我们标题">
          <a-input v-model="form.footer_contact_title" placeholder="如：联系我们" />
        </a-form-item>
        <a-form-item label="联系电话">
          <a-input v-model="form.footer_contact_phone" placeholder="如：400-8078-999" />
        </a-form-item>
        <a-form-item label="联系地址">
          <a-input v-model="form.footer_contact_address" placeholder="如：江苏省苏州市吴中区友翔路18号" />
        </a-form-item>
        <a-form-item label="版权信息">
          <a-input v-model="form.footer_copyright" placeholder="如：© 2026 科沃斯八界 版权所有" />
        </a-form-item>
        <a-form-item label="备案号">
          <a-input v-model="form.footer_icp" placeholder="如：苏ICP备12345678号" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="handleSave" :loading="saving">保存配置</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { siteConfigApi } from '@/api';
import { Message } from '@arco-design/web-vue';

const saving = ref(false);

const form = reactive({
  footer_slogan: '',
  footer_contact_title: '',
  footer_contact_phone: '',
  footer_contact_address: '',
  footer_copyright: '',
  footer_icp: '',
});

async function fetchConfig() {
  try {
    const res: any = await siteConfigApi.getList();
    if (res.success) {
      const data = res.data || {};
      if (Array.isArray(data)) {
        data.forEach((item: any) => {
          if (item.key && item.value !== undefined) {
            (form as any)[item.key] = item.value;
          }
        });
      } else if (typeof data === 'object') {
        Object.keys(data).forEach((key) => {
          if ((form as any).hasOwnProperty(key)) {
            (form as any)[key] = data[key];
          }
        });
      }
    }
  } catch { Message.error('获取配置失败'); }
}

async function handleSave() {
  saving.value = true;
  try {
    const res: any = await siteConfigApi.update(form);
    if (res.success) { Message.success('保存成功'); }
    else Message.error(res.message || '保存失败');
  } catch { Message.error('保存失败'); }
  finally { saving.value = false; }
}

onMounted(fetchConfig);
</script>
