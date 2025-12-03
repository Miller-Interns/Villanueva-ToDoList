import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TodoCategory, TodoItem } from '../types/TodoCategory';

const STORAGE_KEY = 'todo-list-data';

export const useTodoStore = defineStore('todo', () => {
  const categories = ref<TodoCategory[]>([]);

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

  const saveToStorage = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories.value));
  };

  loadFromStorage();

  const addCategory = (title: string) => {
    const exists = categories.value.some(cat => cat.title.toLowerCase() === title.toLowerCase());
    if (exists) {
      return { success: false, error: 'A category with this name already exists.' };
    }

    const newCategory: TodoCategory = {
      id: Date.now().toString(),
      title,
      items: [],
    };
    categories.value.push(newCategory);
    saveToStorage();
    return { success: true, id: newCategory.id };
  };

  const updateCategoryTitle = (categoryId: string, newTitle: string) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      const exists = categories.value.some(
        c => c.id !== categoryId && c.title.toLowerCase() === newTitle.toLowerCase()
      );
      if (exists) {
        return { success: false, error: 'A category with this name already exists.' };
      }
      category.title = newTitle;
      saveToStorage();
      return { success: true };
    }
    return { success: false, error: 'Category not found.' };
  };

  const deleteCategory = (categoryId: string) => {
    const index = categories.value.findIndex(c => c.id === categoryId);
    if (index !== -1) {
      categories.value.splice(index, 1);
      saveToStorage();
    }
  };

  const addItem = (categoryId: string, text: string) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      const exists = category.items.some(item => item.text.toLowerCase() === text.toLowerCase());
      if (exists) {
        return { success: false, error: 'This item already exists in this category.' };
      }
      const newItem: TodoItem = {
        id: Date.now().toString(),
        text,
        completed: false,
      };
      category.items.push(newItem);
      saveToStorage();
      return { success: true };
    }
    return { success: false, error: 'Category not found.' };
  };

  const updateItemText = (categoryId: string, itemId: string, newText: string) => {
    const category = categories.value.find(c => c.id === categoryId);
    if (category) {
      const item = category.items.find(i => i.id === itemId);
      if (item) {
        const exists = category.items.some(
          i => i.id !== itemId && i.text.toLowerCase() === newText.toLowerCase()
        );
        if (exists) {
          return {
            success: false,
            error: 'An item with this text already exists in this category.',
          };
        }
        item.text = newText;
        saveToStorage();
        return { success: true };
      }
      return { success: false, error: 'Item not found.' };
    }
    return { success: false, error: 'Category not found.' };
  };

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
    deleteItem,
  };
});
