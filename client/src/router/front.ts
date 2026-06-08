import type { RouteRecordRaw } from 'vue-router';
import FrontLayout from '@/layouts/FrontLayout.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: FrontLayout,
    children: [
      { path: '', name: 'home', component: () => import('@/views/front/HomeView.vue') },
      { path: 'news', name: 'news', component: () => import('@/views/front/NewsView.vue') },
      { path: 'news/:id', name: 'news-detail', component: () => import('@/views/front/NewsDetailView.vue') },
      { path: 'skills', name: 'skills', component: () => import('@/views/front/SkillsView.vue') },
      { path: 'skills/:id', name: 'skill-detail', component: () => import('@/views/front/SkillDetailView.vue') },
      { path: 'apps', name: 'apps', component: () => import('@/views/front/AppsView.vue') },
      { path: 'apps/:id', name: 'app-detail', component: () => import('@/views/front/AppDetailView.vue') },
      { path: 'discussions', name: 'discussions', component: () => import('@/views/front/DiscussionsView.vue') },
      { path: 'discussions/:id', name: 'discussion-detail', component: () => import('@/views/front/DiscussionDetailView.vue') },
      { path: 'docs', name: 'docs', component: () => import('@/views/front/DocumentationView.vue') },
      { path: 'faq', name: 'faq', component: () => import('@/views/front/FaqView.vue') },
      { path: 'open-source', name: 'open-source', component: () => import('@/views/front/OpenSourceView.vue') },
      { path: 'login', name: 'login', component: () => import('@/views/front/LoginView.vue') },
      { path: 'register', name: 'register', component: () => import('@/views/front/RegisterView.vue') },
    ],
  },
];

export default routes;
