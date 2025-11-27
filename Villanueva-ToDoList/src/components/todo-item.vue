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
      <div class="edit-actions">
        <button @click="saveItem(categoryId, item.id)" class="save-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6667 3.5L5.25 9.91667L2.33333 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Save
        </button>
        <button @click="cancelEditItem" class="cancel-btn">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Cancel
        </button>
      </div>
    </div>
    <div v-else class="item-display">
      <label class="checkbox-label">
        <input
          type="checkbox"
          :checked="item.completed"
          @change="toggleComplete(categoryId, item.id)"
          class="checkbox"
        />
        <span class="checkmark"></span>
      </label>
      <span class="item-text">{{ item.text }}</span>
      <div class="item-actions">
        <button @click="startEditItem(item.id, item.text)" class="edit-btn" title="Edit item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.91667 1.75C10.07 1.59678 10.2516 1.47482 10.4514 1.39079C10.6512 1.30676 10.8653 1.26221 11.0833 1.26221C11.3014 1.26221 11.5155 1.30676 11.7153 1.39079C11.9151 1.47482 12.0967 1.59678 12.25 1.75C12.4032 1.90322 12.5252 2.08483 12.6092 2.28462C12.6932 2.48441 12.7378 2.69852 12.7378 2.91667C12.7378 3.13481 12.6932 3.34892 12.6092 3.54871C12.5252 3.7485 12.4032 3.93011 12.25 4.08333L4.08333 12.25L0.875 13.125L1.75 9.91667L9.91667 1.75Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button @click="removeItem(categoryId, item.id)" class="delete-btn" title="Delete item">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.75 3.5H12.25M5.25 3.5V2.33333C5.25 2.22433 5.29464 2.12004 5.37279 2.04189C5.45094 1.96374 5.55523 1.91911 5.66417 1.91911H8.33583C8.44477 1.91911 8.54906 1.96374 8.62721 2.04189C8.70536 2.12004 8.75 2.22433 8.75 2.33333V3.5M10.7917 3.5V11.6667C10.7917 11.8877 10.7039 12.0996 10.5471 12.2564C10.3903 12.4132 10.1784 12.5008 9.95833 12.5008H4.04167C3.82163 12.5008 3.60967 12.4132 3.45287 12.2564C3.29607 12.0996 3.20833 11.8877 3.20833 11.6667V3.5H10.7917Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
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

.item-display {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.75rem;
}

.checkbox-label {
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: relative;
  height: 1.25rem;
  width: 1.25rem;
  background-color: white;
  border: 2px solid #d1d5db;
  border-radius: 0.375rem;
  transition: all 0.2s;
  flex-shrink: 0;
}

.checkbox-label:hover .checkmark {
  border-color: #6366f1;
  background-color: #eef2ff;
}

.checkbox:checked ~ .checkmark {
  background-color: #10b981;
  border-color: #10b981;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.checkbox:checked ~ .checkmark:after {
  display: block;
  left: 0.375rem;
  top: 0.125rem;
  width: 0.375rem;
  height: 0.625rem;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.item-text {
  flex: 1;
  font-size: 0.9375rem;
  color: #111827;
  word-break: break-word;
  line-height: 1.5;
}

.completed .item-text {
  text-decoration: line-through;
  color: #6b7280;
}

.item-actions {
  display: flex;
  gap: 0.375rem;
  flex-shrink: 0;
}

.edit-item-container {
  display: flex;
  gap: 0.75rem;
  width: 100%;
  align-items: center;
  flex-wrap: wrap;
}

.edit-item-input {
  flex: 1;
  min-width: 200px;
  padding: 0.625rem 0.875rem;
  border: 2px solid #6366f1;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  color: #111827;
  transition: all 0.2s;
}

.edit-item-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.edit-actions {
  display: flex;
  gap: 0.5rem;
}

.save-btn,
.cancel-btn,
.edit-btn,
.delete-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 0.875rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s;
}

.save-btn {
  background: #10b981;
  color: white;
}

.save-btn:hover {
  background: #059669;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(16, 185, 129, 0.3);
}

.cancel-btn {
  background: #ef4444;
  color: white;
}

.cancel-btn:hover {
  background: #dc2626;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(239, 68, 68, 0.3);
}

.edit-btn {
  background: #f3f4f6;
  color: #6b7280;
  padding: 0.5rem;
  border: 1px solid #e5e7eb;
}

.edit-btn:hover {
  background: #e5e7eb;
  color: #111827;
}

.delete-btn {
  background: #fef2f2;
  color: #ef4444;
  padding: 0.5rem;
  border: 1px solid #fecaca;
}

.delete-btn:hover {
  background: #fee2e2;
  color: #dc2626;
}

@media (max-width: 768px) {
  .edit-item-container {
    flex-direction: column;
    align-items: stretch;
  }
  
  .edit-item-input {
    min-width: 100%;
  }
  
  .edit-actions {
    width: 100%;
  }
  
  .save-btn,
  .cancel-btn {
    flex: 1;
    justify-content: center;
  }
}
</style>
