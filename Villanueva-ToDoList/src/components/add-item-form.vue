<template>
  <div class="add-item-form">
    <div class="add-item-container">
      <input
        v-model="newItemText"
        @keyup.enter="handleAddItem"
        @input="clearError"
        :class="inputClasses"
        class="add-item-input"
        type="text"
        placeholder="Add a new TO-DO item..."
      />
      <button @click="handleAddItem" class="add-item-btn">
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9 3V15M3 9H15" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
        Add
      </button>
    </div>
    <p v-if="showError" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useTodoItem } from '../composables/useTodoItem';

const props = defineProps<{
  categoryId: string;
}>();

const { createItem } = useTodoItem();
const newItemText = ref('');
const error = ref<string | null>(null);

const inputClasses = computed(() => ({
  error: !!error.value,
}));

const showError = computed(() => !!error.value);
const errorMessage = computed(() => error.value || '');

const clearError = () => {
  error.value = null;
};

const handleAddItem = () => {
  if (newItemText.value.trim()) {
    const result = createItem(props.categoryId, newItemText.value);
    if (result && result.success) {
      newItemText.value = '';
      error.value = null;
    } else {
      error.value = result?.error || 'Failed to add item.';
    }
  }
};
</script>

<style scoped>
.add-item-form {
  margin-bottom: 0.75rem;
}

.add-item-container {
  display: flex;
  gap: 0.75rem;
}

.add-item-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e5e7eb;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  color: #111827;
  transition: all 0.2s;
}

.add-item-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.add-item-input.error {
  border-color: #ef4444;
}

.add-item-input.error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}

.add-item-input::placeholder {
  color: #9ca3af;
}

.add-item-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
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

.add-item-btn:hover {
  background: #4f46e5;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0.5rem 0 0 0;
}

@media (max-width: 768px) {
  .add-item-container {
    flex-direction: column;
  }

  .add-item-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
