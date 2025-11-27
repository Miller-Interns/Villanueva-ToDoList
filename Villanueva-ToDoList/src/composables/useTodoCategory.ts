import { ref } from 'vue';
import { useTodoStore } from '../store/todoStore';

export function useTodoCategory() {
  const store = useTodoStore();
  const isEditingTitle = ref<string | null>(null);
  const editingTitle = ref('');
  const errorMessage = ref<string | null>(null);

  const startEditTitle = (categoryId: string, currentTitle: string) => {
    isEditingTitle.value = categoryId;
    editingTitle.value = currentTitle;
    errorMessage.value = null;
  };

  const saveTitle = (categoryId: string) => {
    if (editingTitle.value.trim()) {
      const result = store.updateCategoryTitle(categoryId, editingTitle.value.trim());
      if (result && result.success) {
        isEditingTitle.value = null;
        editingTitle.value = '';
        errorMessage.value = null;
      } else {
        errorMessage.value = result?.error || 'Failed to update category title.';
      }
    }
  };

  const cancelEditTitle = () => {
    isEditingTitle.value = null;
    editingTitle.value = '';
    errorMessage.value = null;
  };

  const createCategory = (title: string) => {
    if (title.trim()) {
      const result = store.addCategory(title.trim());
      if (result && result.success) {
        return { success: true, id: result.id };
      } else {
        return { success: false, error: result?.error || 'Failed to create category.' };
      }
    }
    return { success: false, error: 'Category title cannot be empty.' };
  };

  const removeCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? All items will be deleted.')) {
      store.deleteCategory(categoryId);
    }
  };

  return {
    isEditingTitle,
    editingTitle,
    errorMessage,
    startEditTitle,
    saveTitle,
    cancelEditTitle,
    createCategory,
    removeCategory
  };
}

