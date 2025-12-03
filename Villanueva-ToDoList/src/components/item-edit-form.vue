<template>
  <div class="edit-item-container">
    <input
      v-model="editingItemText"
      @keyup.enter="saveItem(categoryId, item.id)"
      @keyup.esc="cancelEditItem"
      class="edit-item-input"
      type="text"
    />
    <div class="edit-actions">
      <button @click="saveItem(categoryId, item.id)" class="save-btn">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6667 3.5L5.25 9.91667L2.33333 7"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Save
      </button>
      <button @click="cancelEditItem" class="cancel-btn">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem } from '../types/TodoCategory';
import { useTodoItem } from '../composables/useTodoItem';

defineProps<{
  item: TodoItem;
  categoryId: string;
}>();

const { editingItemText, saveItem, cancelEditItem } = useTodoItem();
</script>

<style scoped>
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
.cancel-btn {
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
