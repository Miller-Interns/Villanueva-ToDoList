import { ref } from 'vue';
import { useTodoStore } from '../store/todoStore';

export function useTodoCategory() {
  const store = useTodoStore();
  const isEditingTitle = ref<string | null>(null);
  const editingTitle = ref('');

  const startEditTitle = (categoryId: string, currentTitle: string) => {
    isEditingTitle.value = categoryId;
    editingTitle.value = currentTitle;
  };

  const saveTitle = (categoryId: string) => {
    if (editingTitle.value.trim()) {
      store.updateCategoryTitle(categoryId, editingTitle.value.trim());
    }
    isEditingTitle.value = null;
    editingTitle.value = '';
  };

  const cancelEditTitle = () => {
    isEditingTitle.value = null;
    editingTitle.value = '';
  };

  const createCategory = (title: string) => {
    if (title.trim()) {
      return store.addCategory(title.trim());
    }
    return null;
  };

  const removeCategory = (categoryId: string) => {
    if (confirm('Are you sure you want to delete this category? All items will be deleted.')) {
      store.deleteCategory(categoryId);
    }
  };

  return {
    isEditingTitle,
    editingTitle,
    startEditTitle,
    saveTitle,
    cancelEditTitle,
    createCategory,
    removeCategory
  };
}

