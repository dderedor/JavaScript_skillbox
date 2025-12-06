const STORAGE_KEY = "warehouse_items";

// Получить все записи
export function getItems() {
  try {
    const items = localStorage.getItem(STORAGE_KEY);
    return items ? JSON.parse(items) : [];
  } catch (error) {
    console.error("Ошибка чтения из localStorage:", error);
    return [];
  }
}

// Сохранить все записи
export function saveItems(items) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch (error) {
    console.error("Ошибка сохранения в localStorage:", error);
    return false;
  }
}

// Добавить новую запись
export function addItem(item) {
  const items = getItems();
  const newItem = {
    id: Date.now().toString(),
    name: item.name.trim(),
    shelf: item.shelf.trim(),
    weight: parseFloat(item.weight),
    storageTime: parseInt(item.storageTime),
  };

  items.push(newItem);
  return saveItems(items);
}

// Удалить запись по ID
export function deleteItem(id) {
  const items = getItems();
  const filtered = items.filter((item) => item.id !== id);
  return saveItems(filtered);
}

// Удалить все записи
export function clearAll() {
  localStorage.removeItem(STORAGE_KEY);
  return true;
}
