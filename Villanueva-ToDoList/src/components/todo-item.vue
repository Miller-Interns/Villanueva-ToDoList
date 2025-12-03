<template>
  <div class="todo-item" :class="{ completed: item.completed }">
    <item-edit-form v-if="isEditingItem === item.id" :item="item" :category-id="categoryId" />
    <item-card v-else :item="item" :category-id="categoryId" />
  </div>
</template>

<script setup lang="ts">
import type { TodoItem } from '../types/TodoCategory';
import { useTodoItem } from '../composables/useTodoItem';
import ItemCard from './item-card.vue';
import ItemEditForm from './item-edit-form.vue';

defineProps<{
  item: TodoItem;
  categoryId: string;
}>();

const { isEditingItem } = useTodoItem();
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f9fafb;
  border-radius: 0.75rem;
  border: 1px solid #e5e7eb;
  transition: all 0.2s;
}

.todo-item:hover {
  background: #f3f4f6;
  border-color: #d1d5db;
}

.todo-item.completed {
  opacity: 0.7;
}

.todo-item.completed :deep(.item-text) {
  text-decoration: line-through;
  color: #6b7280;
}
</style>
