// storage.ts
import { Dragon } from "./Dragon";

const STORAGE_KEY = "dragons";

export function saveToStorage(dragons: Dragon[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dragons));
}

export function loadFromStorage(): Dragon[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function addDragon(dragon: Dragon): void {
  const dragons = loadFromStorage();
  dragons.push(dragon);
  saveToStorage(dragons);
}

export function deleteDragon(id: string): void {
  const dragons = loadFromStorage().filter((d) => d.id !== id);
  saveToStorage(dragons);
}
