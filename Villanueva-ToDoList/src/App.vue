<script setup lang="ts">
import { ref } from 'vue'
import LandingPage from './views/landing-page.vue'
import TodoListPage from './views/todo-list-page.vue'

const currentPage = ref<'landing' | 'app'>('landing')

const handleNavigate = (page: string) => {
  currentPage.value = page as 'landing' | 'app'
}
</script>

<template>
  <LandingPage v-if="currentPage === 'landing'" @navigate="handleNavigate" />
  <TodoListPage v-else @navigate="handleNavigate" />
</template>

<style>
#app {
  width: 100%;
  min-height: 100vh;
}
</style>
