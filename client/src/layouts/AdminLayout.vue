<template>
  <div class="min-h-screen flex">
    <aside class="w-60 bg-gray-900 text-white">管理侧边栏</aside>
    <div class="flex-1 flex flex-col">
      <header class="h-14 bg-white shadow-sm flex items-center px-6">管理顶栏</header>
      <main class="flex-1 p-6 bg-gray-50">
        <router-view />
      </main>
    </div>
  </div>
</template>
