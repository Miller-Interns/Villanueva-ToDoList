<template>
  <div class="todo-list-page">
    <header class="page-header">
      <div class="header-content">
        <h1>TO-DO List Exercise</h1>
        <button @click="goBack" class="back-btn">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Back to Landing
        </button>
      </div>
    </header>
    
    <div class="content-wrapper">
      <div class="add-category-container">
        <div class="input-group">
          <input
            v-model="newCategoryTitle"
            @keyup.enter="handleAddCategory"
            @input="clearError"
            :class="{ 'error': errorMessage }"
            class="add-category-input"
            type="text"
            placeholder="Enter category title..."
          />
          <button @click="handleAddCategory" class="add-category-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            Add Category
          </button>
        </div>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
      
      <div class="categories-container">
        <todo-category
          v-for="category in store.categories"
          :key="category.id"
          :category="category"
        />
      </div>
      
      <div v-if="store.categories.length === 0" class="empty-state">
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 20H48M16 32H48M16 44H40" stroke="#9ca3af" stroke-width="2" stroke-linecap="round"/>
          <circle cx="52" cy="52" r="10" fill="#ef4444" opacity="0.1"/>
          <path d="M48 52H56M52 48V56" stroke="#ef4444" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <h3>No categories yet</h3>
        <p>Create your first category above to get started!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useTodoStore } from '../store/todoStore';
import { useTodoCategory } from '../composables/useTodoCategory';
import TodoCategory from '../components/todo-category.vue';

const router = useRouter();
const store = useTodoStore();
const { createCategory } = useTodoCategory();
const newCategoryTitle = ref('');
const errorMessage = ref<string | null>(null);

const clearError = () => {
  errorMessage.value = null;
};

const handleAddCategory = () => {
  if (newCategoryTitle.value.trim()) {
    const result = createCategory(newCategoryTitle.value);
    if (result && result.success) {
      newCategoryTitle.value = '';
      errorMessage.value = null;
    } else {
      errorMessage.value = result?.error || 'Failed to create category.';
    }
  }
};

const goBack = () => {
  router.push('/');
};
</script>

<style scoped>
.todo-list-page {
  min-height: 100vh;
  background: linear-gradient(to bottom, #f9fafb 0%, #f3f4f6 100%);
  padding: 0;
}

.page-header {
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 1.5rem 2rem;
  position: sticky;
  top: 0;
  z-index: 10;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.page-header h1 {
  margin: 0;
  color: #111827;
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.back-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  background: white;
  color: #6b7280;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
}

.back-btn:hover {
  background: #f9fafb;
  color: #111827;
  border-color: #d1d5db;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.add-category-container {
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  margin-bottom: 2rem;
  border: 1px solid #e5e7eb;
}

.input-group {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.add-category-input {
  flex: 1;
  padding: 0.875rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 400;
  color: #111827;
  transition: all 0.2s;
}

.add-category-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.add-category-input.error {
  border-color: #ef4444;
}

.add-category-input.error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.add-category-input::placeholder {
  color: #9ca3af;
}

.add-category-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.5rem;
  background: #6366f1;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.9375rem;
  font-weight: 500;
  transition: all 0.2s;
  white-space: nowrap;
}

.add-category-btn:hover {
  background: #4f46e5;
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(99, 102, 241, 0.3);
}

.add-category-btn:active {
  transform: translateY(0);
}

.error-message {
  margin-top: 0.75rem;
  color: #ef4444;
  font-size: 0.875rem;
  font-weight: 500;
}

.categories-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
}

.empty-state svg {
  margin-bottom: 1.5rem;
  opacity: 0.5;
}

.empty-state h3 {
  margin: 0 0 0.5rem 0;
  color: #111827;
  font-size: 1.25rem;
  font-weight: 600;
}

.empty-state p {
  margin: 0;
  color: #6b7280;
  font-size: 0.9375rem;
}

@media (max-width: 768px) {
  .content-wrapper {
    padding: 1rem;
  }
  
  .page-header {
    padding: 1rem;
  }
  
  .header-content {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
  
  .input-group {
    flex-direction: column;
  }
  
  .add-category-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>

