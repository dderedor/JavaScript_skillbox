const STORAGE_KEY = "warehouse_items";

export function getItems() {
  const items = localStorage.getItem(STORAGE_KEY);
  return items ? JSON.parse(items) : [];
}

export function saveItems(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

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
  saveItems(items);
  return newItem;
}

export function deleteItem(id) {
  const items = getItems();
  const filtered = items.filter((item) => item.id !== id);
  saveItems(filtered);
}

export function clearAll() {
  localStorage.removeItem(STORAGE_KEY);
}
