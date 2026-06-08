import { createRouter, createWebHistory } from 'vue-router';
import frontRoutes from './front';
import adminRoutes from './admin';

const router = createRouter({
  history: createWebHistory(),
  routes: [...frontRoutes, ...adminRoutes],
});

router.beforeEach((to, _from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('token')) {
    next('/login');
  } else if (to.meta.requiresAdmin) {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.role !== 'admin') {
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
