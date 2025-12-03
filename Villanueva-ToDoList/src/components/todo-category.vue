<template>
  <div class="category-card">
    <category-header :category="category" />

    <div class="category-content">
      <add-item-form :category-id="category.id" />

      <div class="items-list">
        <todo-item
          v-for="item in category.items"
          :key="item.id"
          :item="item"
          :category-id="category.id"
        />
      </div>

      <div v-if="showEmptyMessage" class="empty-message">
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 15H36M12 24H36M12 33H28"
            stroke="#9ca3af"
            stroke-width="2"
            stroke-linecap="round"
          />
          <circle cx="38" cy="38" r="8" fill="#ef4444" opacity="0.1" />
          <path d="M34 38H42M38 34V42" stroke="#ef4444" stroke-width="2" stroke-linecap="round" />
        </svg>
        <span>No items yet. Add one above!</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { TodoCategory } from '../types/TodoCategory';
import CategoryHeader from './category-header.vue';
import AddItemForm from './add-item-form.vue';
import TodoItem from './todo-item.vue';

const props = defineProps<{
  category: TodoCategory;
}>();

const showEmptyMessage = computed(() => props.category.items.length === 0);
</script>

<style scoped>
.category-card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
}

.category-card:hover {
  box-shadow:
    0 4px 6px rgba(0, 0, 0, 0.07),
    0 2px 4px rgba(0, 0, 0, 0.06);
}

.category-content {
  padding-top: 0;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: 1rem;
}

.empty-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  text-align: center;
  color: #9ca3af;
  font-size: 0.9375rem;
  padding: 2rem 1rem;
  border: 2px dashed #e5e7eb;
  border-radius: 0.75rem;
  background: #f9fafb;
}

.empty-message svg {
  opacity: 0.5;
}
</style>
