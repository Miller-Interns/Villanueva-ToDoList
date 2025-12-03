import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '../views/landing-page.vue';
import TodoListPage from '../views/todo-list-page.vue';

enum RouteNames {
  Homepage = 'homepage',
  TodoList = 'todo-list',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouteNames.Homepage,
      component: LandingPage,
    },
    {
      path: '/app',
      name: RouteNames.TodoList,
      component: TodoListPage,
    },
  ],
});

export default router;
