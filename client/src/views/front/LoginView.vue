<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-md">
      <!-- 登录卡片 -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div class="p-8">
          <!-- 标题 -->
          <div class="text-center mb-8">
            <div class="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span class="text-white font-bold text-lg">八</span>
            </div>
            <h2 class="text-2xl font-bold text-dark mb-2">开发者登录</h2>
            <p class="text-neutral text-sm">欢迎回来，请登录您的账号</p>
          </div>

          <!-- 表单 -->
          <form @submit.prevent="handleLogin" class="space-y-5">
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

            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" v-model="form.agreeTerms" class="w-4 h-4 text-primary rounded focus:ring-primary" />
              <span class="text-sm text-gray-500">我已阅读并同意 <a href="#" class="text-primary hover:text-primary/80">用户隐私协议</a> 和 <a href="#" class="text-primary hover:text-primary/80">服务条款</a></span>
            </label>

            <button
              type="submit"
              class="w-full py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 active:bg-primary/80 transition-all shadow-lg shadow-primary/30"
              :disabled="loading"
            >
              <span v-if="loading">登录中...</span>
              <span v-else>登录</span>
            </button>

            <p class="text-center text-gray-500 text-sm">
              还没有账号？<router-link to="/register" class="text-primary hover:text-primary/80 font-medium">立即注册</router-link>
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
const form = ref({
  email: '',
  password: '',
  agreeTerms: false,
});

async function handleLogin() {
  if (!form.value.agreeTerms) {
    alert('请阅读并同意用户隐私协议和服务条款');
    return;
  }
  loading.value = true;
  try {
    const res: any = await userStore.login(form.value.email, form.value.password);
    if (res.success) {
      await router.replace('/');
    } else {
      alert(res.message || '登录失败');
    }
  } catch (e: any) {
    alert(e?.message || '登录失败，请稍后重试');
  } finally {
    loading.value = false;
  }
}
</script>
