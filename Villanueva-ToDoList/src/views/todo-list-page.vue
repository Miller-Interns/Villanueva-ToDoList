<template>
  <div class="todo-list-page">
    <header class="page-header">
      <h1>TODO List Exercise</h1>
      <button @click="$emit('navigate', 'landing')" class="back-btn">Back to Landing</button>
    </header>
    
    <div class="add-category-container">
      <input
        v-model="newCategoryTitle"
        @keyup.enter="handleAddCategory"
        class="add-category-input"
        type="text"
        placeholder="Enter category title..."
      />
      <button @click="handleAddCategory" class="add-category-btn">Add Category</button>
    </div>
    
    <div class="categories-container">
      <todo-category
        v-for="category in store.categories"
        :key="category.id"
        :category="category"
      />
    </div>
    
    <p v-if="store.categories.length === 0" class="empty-state">
      No categories yet. Create one above to get started!
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTodoStore } from '../store/todoStore';
import { useTodoCategory } from '../composables/useTodoCategory';
import TodoCategory from '../components/todo-category.vue';

const store = useTodoStore();
const { createCategory } = useTodoCategory();
const newCategoryTitle = ref('');

const emit = defineEmits<{
  (e: 'navigate', page: string): void;
}>();

const handleAddCategory = () => {
  if (newCategoryTitle.value.trim()) {
    createCategory(newCategoryTitle.value);
    newCategoryTitle.value = '';
  }
};
</script>

<style scoped>
.todo-list-page {
  min-height: 100vh;
  background: #f5f5f5;
  padding: 2rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 3px solid #667eea;
}

.page-header h1 {
  margin: 0;
  color: #333;
  font-size: 2rem;
}

.back-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}

.back-btn:hover {
  background: #5568d3;
}

.add-category-container {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.add-category-input {
  flex: 1;
  padding: 1rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1.1rem;
}

.add-category-input:focus {
  outline: none;
  border-color: #667eea;
}

.add-category-btn {
  padding: 1rem 2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
}

.add-category-btn:hover {
  background: #5568d3;
}

.categories-container {
  max-width: 1200px;
  margin: 0 auto;
}

.empty-state {
  text-align: center;
  color: #999;
  font-size: 1.2rem;
  padding: 3rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>

