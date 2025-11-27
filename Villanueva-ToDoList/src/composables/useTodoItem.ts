import { ref } from 'vue';
import { useTodoStore } from '../store/todoStore';

export function useTodoItem() {
  const store = useTodoStore();
  const isEditingItem = ref<string | null>(null);
  const editingItemText = ref('');

  const startEditItem = (itemId: string, currentText: string) => {
    isEditingItem.value = itemId;
    editingItemText.value = currentText;
  };

  const saveItem = (categoryId: string, itemId: string) => {
    if (editingItemText.value.trim()) {
      const success = store.updateItemText(categoryId, itemId, editingItemText.value.trim());
      if (!success) {
        alert('An item with this text already exists in this category.');
        return;
      }
    }
    isEditingItem.value = null;
    editingItemText.value = '';
  };

  const cancelEditItem = () => {
    isEditingItem.value = null;
    editingItemText.value = '';
  };

  const createItem = (categoryId: string, text: string) => {
    if (text.trim()) {
      const success = store.addItem(categoryId, text.trim());
      if (!success) {
        alert('This item already exists in this category.');
      }
      return success;
    }
    return false;
  };

  const toggleComplete = (categoryId: string, itemId: string) => {
    store.toggleItemCompleted(categoryId, itemId);
  };

  const removeItem = (categoryId: string, itemId: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      store.deleteItem(categoryId, itemId);
    }
  };

  return {
    isEditingItem,
    editingItemText,
    startEditItem,
    saveItem,
    cancelEditItem,
    createItem,
    toggleComplete,
    removeItem
  };
}

