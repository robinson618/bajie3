<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <!-- 注册卡片 -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div class="p-8">
          <!-- 标题 -->
          <div class="text-center mb-8">
            <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-lg">八</span>
            </div>
            <h2 class="text-2xl font-bold text-dark mb-2">开发者注册</h2>
            <p class="text-neutral text-sm">创建账号，开启开发之旅</p>
          </div>

          <!-- 表单 -->
          <form @submit.prevent="handleRegister" class="space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">用户名</label>
              <div class="relative">
                <input
                  v-model="form.username"
                  type="text"
                  placeholder="请输入用户名"
                  class="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
                <svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
              <div class="relative">
                <input
                  v-model="form.email"
                  type="email"
                  placeholder="请输入邮箱"
                  class="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
                <svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">密码</label>
              <div class="relative">
                <input
                  v-model="form.password"
                  type="password"
                  placeholder="请输入密码"
                  class="w-full px-4 py-3 pl-11 border border-gray-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
                <svg class="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">开发者身份</label>
              <div class="flex gap-3">
                <button
                  type="button"
                  v-for="option in identityOptions"
                  :key="option.value"
                  class="flex-1 py-3 rounded-xl font-medium transition-all text-sm"
                  :class="form.identity === option.value
                    ? 'bg-primary text-white shadow-lg shadow-primary/30'
                    : 'bg-gray-100 text-gray-700 hover:bg-primary/10 hover:text-primary'"
                  @click="form.identity = option.value"
                >
                  {{ option.label }}
                </button>
              </div>
            </div>

            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="form.agreeTerms" class="w-4 h-4 text-primary rounded focus:ring-primary" />
              <span class="text-sm text-gray-500">我已阅读并同意 <router-link to="/privacy" class="text-primary hover:text-primary/80">用户隐私协议</router-link> 和 <router-link to="/terms" class="text-primary hover:text-primary/80">服务条款</router-link></span>
            </label>

            <button
              type="submit"
              class="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 active:bg-primary/80 transition-all shadow-lg shadow-primary/30"
              :disabled="loading"
            >
              <span v-if="loading">注册中...</span>
              <span v-else>注册</span>
            </button>

            <p class="text-center text-gray-500 text-sm">
              已有账号？<router-link to="/login" class="text-primary hover:text-primary/80 font-medium">立即登录</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const userStore = useUserStore();

const loading = ref(false);
const identityOptions = [
  { value: 'explorer', label: '探索者' },
  { value: 'developer', label: '开发者' },
  { value: 'user', label: '应用者' },
];

const form = ref({
  username: '',
  email: '',
  password: '',
  identity: 'developer',
  agreeTerms: false,
});

async function handleRegister() {
  if (!form.value.identity) {
    alert('请选择身份类型');
    return;
  }
  if (!form.value.agreeTerms) {
    alert('请阅读并同意用户隐私协议和服务条款');
    return;
  }
  loading.value = true;
  try {
    const res: any = await userStore.register({
      username: form.value.username,
      email: form.value.email,
      password: form.value.password,
      identity: form.value.identity,
    });
    if (res.success) {
      alert('注册成功，请登录');
      router.push('/login');
    } else {
      alert(res.message || '注册失败');
    }
  } catch {
    alert('注册失败，请稍后重试');
  } finally {
    loading.value = false;
  }
}
</script>
