import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TodoCategory, TodoItem } from '../types/TodoCategory';

const STORAGE_KEY = 'todo-list-data';

export const useTodoStore = defineStore('todo', () => {
  const categories = ref<TodoCategory[]>([]);

  // Load data from localStorage
  const loadFromStorage = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        categories.value = JSON.parse(stored);
      } catch (e) {
        console.error('Error loading from localStorage:', e);
      }
    }
  };

  // Save data to localStorage
  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories.value));
  };

  // Initialize from storage
  loadFromStorage();

  // Add new category
  const addCategory = (title: string) => {
    const newCategory: TodoCategory = {
      id: Date.now().toString(),
      title,
      items: []
    };
    categories.value.push(newCategory);
    saveToStorage();
    return newCategory.id;
  };

  // Update category title
  const updateCategoryTitle = (categoryId: string, newTitle: string) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      category.title = newTitle;
      saveToStorage();
    }
  };

  // Delete category
  const deleteCategory = (categoryId: string) => {
    const index = categories.value.findIndex(c => c.id === categoryId);
    if (index !== -1) {
      categories.value.splice(index, 1);
      saveToStorage();
    }
  };

  // Add item to category
  const addItem = (categoryId: string, text: string) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      // Check for duplicates
      const exists = category.items.some(item => item.text.toLowerCase() === text.toLowerCase());
      if (exists) {
        return false;
      }
      const newItem: TodoItem = {
        id: Date.now().toString(),
        text,
        completed: false
      };
      category.items.push(newItem);
      saveToStorage();
      return true;
    }
    return false;
  };

  // Update item text
  const updateItemText = (categoryId: string, itemId: string, newText: string) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      const item = category.items.find(i => i.id === itemId);
      if (item) {
        // Check for duplicates (excluding current item)
        const exists = category.items.some(i => i.id !== itemId && i.text.toLowerCase() === newText.toLowerCase());
        if (exists) {
          return false;
        }
        item.text = newText;
        saveToStorage();
        return true;
      }
    }
    return false;
  };

  // Toggle item completion
  const toggleItemCompleted = (categoryId: string, itemId: string) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      const item = category.items.find(i => i.id === itemId);
      if (item) {
        item.completed = !item.completed;
        saveToStorage();
      }
    }
  };

  // Delete item
  const deleteItem = (categoryId: string, itemId: string) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      const index = category.items.findIndex(i => i.id === itemId);
      if (index !== -1) {
        category.items.splice(index, 1);
        saveToStorage();
      }
    }
  };

  return {
    categories,
    addCategory,
    updateCategoryTitle,
    deleteCategory,
    addItem,
    updateItemText,
    toggleItemCompleted,
    deleteItem
  };
});

