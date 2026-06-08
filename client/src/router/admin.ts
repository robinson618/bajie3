import type { RouteRecordRaw } from 'vue-router';
import AdminLayout from '@/layouts/AdminLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      { path: '', name: 'admin-dashboard', component: () => import('@/views/admin/DashboardView.vue') },
      { path: 'news', name: 'admin-news', component: () => import('@/views/admin/NewsManage.vue') },
      { path: 'skills', name: 'admin-skills', component: () => import('@/views/admin/SkillsManage.vue') },
      { path: 'apps', name: 'admin-apps', component: () => import('@/views/admin/AppsManage.vue') },
      { path: 'discussions', name: 'admin-discussions', component: () => import('@/views/admin/DiscussionsManage.vue') },
      { path: 'documents', name: 'admin-documents', component: () => import('@/views/admin/DocumentsManage.vue') },
      { path: 'faq', name: 'admin-faq', component: () => import('@/views/admin/FaqManage.vue') },
      { path: 'open-source', name: 'admin-open-source', component: () => import('@/views/admin/OpenSourceManage.vue') },
      { path: 'banners', name: 'admin-banners', component: () => import('@/views/admin/BannersManage.vue') },
      { path: 'users', name: 'admin-users', component: () => import('@/views/admin/UsersManage.vue') },
      { path: 'site', name: 'admin-site', component: () => import('@/views/admin/SiteConfigManage.vue') },
      { path: 'nav-menus', name: 'admin-nav-menus', component: () => import('@/views/admin/NavMenusManage.vue') },
      { path: 'footer', name: 'admin-footer', component: () => import('@/views/admin/FooterManage.vue') },
      { path: 'pages', name: 'admin-pages', component: () => import('@/views/admin/PagesManage.vue') },
      { path: 'seo', name: 'admin-seo', component: () => import('@/views/admin/SeoManage.vue') },
    ],
  },
];

export default routes;
