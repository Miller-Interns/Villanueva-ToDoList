import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/landing-page.vue';
import TodoListPage from '../views/todo-list-page.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'landing',
      component: LandingPage
    },
    {
      path: '/app',
      name: 'app',
      component: TodoListPage
    }
  ]
});

export default router;

