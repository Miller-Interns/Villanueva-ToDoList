<template>
  <div class="category-card">
    <div class="category-header">
      <div v-if="isEditingTitle === category.id" class="edit-title-container">
        <input
          v-model="editingTitle"
          @keyup.enter="saveTitle(category.id)"
          @keyup.esc="cancelEditTitle"
          class="title-input"
          type="text"
        />
        <button @click="saveTitle(category.id)" class="save-btn">Save</button>
        <button @click="cancelEditTitle" class="cancel-btn">Cancel</button>
      </div>
      <div v-else class="title-display">
        <h2 class="category-title">{{ category.title }}</h2>
        <div class="category-actions">
          <button @click="startEditTitle(category.id, category.title)" class="edit-btn">Edit</button>
          <button @click="removeCategory(category.id)" class="delete-btn">Delete</button>
        </div>
      </div>
    </div>
    
    <div class="category-content">
      <div class="add-item-container">
        <input
          v-model="newItemText"
          @keyup.enter="handleAddItem"
          class="add-item-input"
          type="text"
          placeholder="Add a new TODO item..."
        />
        <button @click="handleAddItem" class="add-item-btn">Add</button>
      </div>
      
      <div class="items-list">
        <todo-item
          v-for="item in category.items"
          :key="item.id"
          :item="item"
          :category-id="category.id"
        />
      </div>
      
      <p v-if="category.items.length === 0" class="empty-message">No items yet. Add one above!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TodoCategory } from '../types/TodoCategory';
import { useTodoCategory } from '../composables/useTodoCategory';
import { useTodoItem } from '../composables/useTodoItem';
import TodoItem from './todo-item.vue';

const props = defineProps<{
  category: TodoCategory;
}>();

const { isEditingTitle, editingTitle, startEditTitle, saveTitle, cancelEditTitle, removeCategory } = useTodoCategory();
const { createItem } = useTodoItem();
const newItemText = ref('');

const handleAddItem = () => {
  if (newItemText.value.trim()) {
    createItem(props.category.id, newItemText.value);
    newItemText.value = '';
  }
};
</script>

<style scoped>
.category-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.category-header {
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}

.title-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.category-title {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.category-actions {
  display: flex;
  gap: 0.5rem;
}

.edit-title-container {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.title-input {
  flex: 1;
  padding: 0.5rem;
  font-size: 1.2rem;
  border: 2px solid #667eea;
  border-radius: 4px;
}

.save-btn,
.cancel-btn,
.edit-btn,
.delete-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
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

.category-content {
  padding-top: 1rem;
}

.add-item-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.add-item-input {
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.add-item-input:focus {
  outline: none;
  border-color: #667eea;
}

.add-item-btn {
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
}

.add-item-btn:hover {
  background: #5568d3;
}

.items-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.empty-message {
  text-align: center;
  color: #999;
  font-style: italic;
  padding: 1rem;
}
</style>

