<template>
  <div class="category-header">
    <div v-if="isEditingTitle === category.id" class="edit-title-container">
      <div class="edit-title-row">
        <input
          v-model="editingTitle"
          @keyup.enter="saveTitle(category.id)"
          @keyup.esc="cancelEditTitle"
          :class="{ error: errorMessage }"
          class="title-input"
          type="text"
        />
        <div class="edit-actions">
          <button @click="saveTitle(category.id)" class="save-btn">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3333 4L6 11.3333L2.66667 8"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Save
          </button>
          <button @click="cancelEditTitle" class="cancel-btn">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12M4 4L12 12"
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
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
    <div v-else class="title-display">
      <h2 class="category-title">{{ category.title }}</h2>
      <div class="category-actions">
        <button
          @click="startEditTitle(category.id, category.title)"
          class="edit-btn"
          title="Edit category"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.3333 2C11.5084 1.82489 11.7163 1.68603 11.9446 1.59126C12.1729 1.49649 12.4171 1.44751 12.6667 1.44751C12.9162 1.44751 13.1604 1.49649 13.3887 1.59126C13.617 1.68603 13.8249 1.82489 14 2C14.1751 2.17511 14.314 2.38303 14.4087 2.61132C14.5035 2.83961 14.5525 3.08378 14.5525 3.33333C14.5525 3.58289 14.5035 3.82706 14.4087 4.05535C14.314 4.28364 14.1751 4.49156 14 4.66667L5 13.6667L1.33333 14.6667L2.33333 11L11.3333 2Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Edit
        </button>
        <button @click="removeCategory(category.id)" class="delete-btn" title="Delete category">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2 4H14M6 4V2C6 1.73478 6.10536 1.48043 6.29289 1.29289C6.48043 1.10536 6.73478 1 7 1H9C9.26522 1 9.51957 1.10536 9.70711 1.29289C9.89464 1.48043 10 1.73478 10 2V4M12.6667 4V13.3333C12.6667 13.687 12.5262 14.0261 12.2761 14.2761C12.0261 14.5262 11.687 14.6667 11.3333 14.6667H4.66667C4.31305 14.6667 3.97391 14.5262 3.72386 14.2761C3.47381 14.0261 3.33333 13.687 3.33333 13.3333V4H12.6667Z"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoCategory } from '../types/TodoCategory';
import { useTodoCategory } from '../composables/useTodoCategory';

defineProps<{
  category: TodoCategory;
}>();

const {
  isEditingTitle,
  editingTitle,
  errorMessage,
  startEditTitle,
  saveTitle,
  cancelEditTitle,
  removeCategory,
} = useTodoCategory();
</script>

<style scoped>
.category-header {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.title-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.category-title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: #111827;
  letter-spacing: -0.025em;
}

.category-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-title-container {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.edit-title-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  width: 100%;
}

.title-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  color: #111827;
  transition: all 0.2s;
}

.title-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.title-input.error {
  border-color: #ef4444;
}

.title-input.error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
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
  padding: 0.5rem 1rem;
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
  border: 1px solid #e5e7eb;
}

.edit-btn:hover {
  background: #e5e7eb;
  color: #111827;
}

.delete-btn {
  background: #fef2f2;
  color: #ef4444;
  border: 1px solid #fecaca;
}

.delete-btn:hover {
  background: #fee2e2;
  color: #dc2626;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
}

@media (max-width: 768px) {
  .title-display {
    flex-direction: column;
    align-items: flex-start;
  }

  .category-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
