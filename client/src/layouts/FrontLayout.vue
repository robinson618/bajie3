<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-white shadow-sm">前台导航栏</header>
    <main class="flex-1">
      <router-view />
    </main>
    <footer class="bg-gray-800 text-white py-8">页脚</footer>
  </div>
</template>
