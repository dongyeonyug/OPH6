"use client";

import type { Memory } from "@/lib/types";

const DB_NAME = "tripcanvas-local-images";
const STORE_NAME = "images";
const META_KEY = "tripcanvas-local-memories-v1";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function readBlob(key: string): Promise<Blob | null> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(key);
    req.onsuccess = () => resolve((req.result as Blob | undefined) ?? null);
    req.onerror = () => reject(req.error);
    tx.oncomplete = () => db.close();
  });
}

async function writeBlob(key: string, blob: Blob): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(blob, key);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });
}

async function deleteBlob(key: string): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).delete(key);
    tx.oncomplete = () => {
      db.close();
      resolve();
    };
    tx.onerror = () => reject(tx.error);
  });
}

function readMeta(): Omit<Memory, "imageUrl">[] {
  try {
    return JSON.parse(localStorage.getItem(META_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function writeMeta(memories: Omit<Memory, "imageUrl">[]) {
  localStorage.setItem(META_KEY, JSON.stringify(memories));
}

export async function loadLocalMemories(): Promise<Memory[]> {
  if (typeof window === "undefined") return [];
  const items = readMeta();
  const memories: Memory[] = [];
  for (const item of items) {
    if (!item.imageKey) continue;
    try {
      const blob = await readBlob(item.imageKey);
      if (!blob) continue;
      memories.push({ ...item, imageUrl: URL.createObjectURL(blob) });
    } catch {
      const fallback = localStorage.getItem(`tripcanvas-image-${item.imageKey}`);
      if (fallback) memories.push({ ...item, imageUrl: fallback });
    }
  }
  return memories;
}

export async function saveLocalMemory(memory: Memory, file: File): Promise<Memory> {
  const imageKey = memory.imageKey ?? `img-${memory.id}`;
  const next = { ...memory, imageKey, imageUrl: URL.createObjectURL(file) };
  try {
    await writeBlob(imageKey, file);
  } catch {
    const dataUrl = await fileToDataUrl(file);
    localStorage.setItem(`tripcanvas-image-${imageKey}`, dataUrl);
    next.imageUrl = dataUrl;
  }
  const meta = readMeta().filter((item) => item.id !== next.id);
  const { imageUrl: _imageUrl, ...serializable } = next;
  writeMeta([...meta, serializable]);
  return next;
}

export function updateLocalMemoryMeta(memory: Memory) {
  if (memory.source !== "local") return;
  const meta = readMeta().filter((item) => item.id !== memory.id);
  const { imageUrl: _imageUrl, ...serializable } = memory;
  writeMeta([...meta, serializable]);
}

export async function removeLocalMemory(memory: Memory) {
  if (memory.source !== "local") return;
  writeMeta(readMeta().filter((item) => item.id !== memory.id));
  if (memory.imageKey) {
    try {
      await deleteBlob(memory.imageKey);
    } catch {
      localStorage.removeItem(`tripcanvas-image-${memory.imageKey}`);
    }
  }
}

export function persistLocalMemories(memories: Memory[]) {
  memories.filter((memory) => memory.source === "local").forEach(updateLocalMemoryMeta);
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}
