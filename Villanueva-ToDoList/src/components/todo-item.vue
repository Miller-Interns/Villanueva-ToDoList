<template>
  <div class="todo-item" :class="{ completed: item.completed }">
    <div v-if="isEditingItem === item.id" class="edit-item-container">
      <input
        v-model="editingItemText"
        @keyup.enter="saveItem(categoryId, item.id)"
        @keyup.esc="cancelEditItem"
        class="edit-item-input"
        type="text"
      />
      <button @click="saveItem(categoryId, item.id)" class="save-btn">Save</button>
      <button @click="cancelEditItem" class="cancel-btn">Cancel</button>
    </div>
    <div v-else class="item-display">
      <input
        type="checkbox"
        :checked="item.completed"
        @change="toggleComplete(categoryId, item.id)"
        class="checkbox"
      />
      <span class="item-text">{{ item.text }}</span>
      <div class="item-actions">
        <button @click="startEditItem(item.id, item.text)" class="edit-btn">Edit</button>
        <button @click="removeItem(categoryId, item.id)" class="delete-btn">Delete</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem } from '../types/TodoCategory';
import { useTodoItem } from '../composables/useTodoItem';

const props = defineProps<{
  item: TodoItem;
  categoryId: string;
}>();

const {
  isEditingItem,
  editingItemText,
  startEditItem,
  saveItem,
  cancelEditItem,
  toggleComplete,
  removeItem
} = useTodoItem();
</script>

<style scoped>
.todo-item {
  display: flex;
  align-items: center;
  padding: 0.75rem;
  background: #f9f9f9;
  border-radius: 4px;
  border: 1px solid #e0e0e0;
  transition: background 0.2s;
}

.todo-item:hover {
  background: #f0f0f0;
}

.todo-item.completed {
  opacity: 0.6;
}

.item-display {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
}

.checkbox {
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
}

.item-text {
  flex: 1;
  font-size: 1rem;
  word-break: break-word;
}

.completed .item-text {
  text-decoration: line-through;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-item-container {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  align-items: center;
}

.edit-item-input {
  flex: 1;
  padding: 0.5rem;
  border: 2px solid #667eea;
  border-radius: 4px;
  font-size: 1rem;
}

.save-btn,
.cancel-btn,
.edit-btn,
.delete-btn {
  padding: 0.4rem 0.8rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: background 0.2s;
}

.save-btn {
  background: #4caf50;
  color: white;
}

.save-btn:hover {
  background: #45a049;
}

.cancel-btn {
  background: #f44336;
  color: white;
}

.cancel-btn:hover {
  background: #da190b;
}

.edit-btn {
  background: #2196f3;
  color: white;
}

.edit-btn:hover {
  background: #0b7dda;
}

.delete-btn {
  background: #f44336;
  color: white;
}

.delete-btn:hover {
  background: #da190b;
}
</style>

