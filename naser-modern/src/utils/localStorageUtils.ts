/**
 * Utility functions for managing content data using localStorage and IndexedDB.
 * localStorage is used for simple key-value storage of small data.
 * IndexedDB is used for more complex and larger data storage needs.
 */

import { ContentItem } from "@/types/content";

// LocalStorage key for storing content data
const CONTENT_KEY = "naser_content";

// IndexedDB database name and store name
const DB_NAME = "NaserContentDB";
const STORE_NAME = "content";
const DB_VERSION = 1;

// Interface for content data structure
interface StoredContent {
  id: string;
  title: string;
  body: string;
  updatedAt: string;
}

/**
 * Initialize IndexedDB for content storage
 * @returns Promise resolving to IDBDatabase or rejecting with an error
 */
const initIndexedDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      console.error("Error opening IndexedDB:", event);
      reject(event);
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
};

/**
 * Save content to localStorage (for small, simple data)
 * @param content Array of content items to save
 */
export const saveContentToLocalStorage = (content: ContentItem[]): void => {
  try {
    localStorage.setItem(CONTENT_KEY, JSON.stringify(content));
    console.log("Content saved to localStorage");
  } catch (error) {
    console.error("Error saving content to localStorage:", error);
  }
};

/**
 * Retrieve content from localStorage
 * @returns Array of content items or empty array if not found or error
 */
export const getContentFromLocalStorage = (): ContentItem[] => {
  try {
    const storedContent = localStorage.getItem(CONTENT_KEY);
    return storedContent ? JSON.parse(storedContent) : [];
  } catch (error) {
    console.error("Error retrieving content from localStorage:", error);
    return [];
  }
};

/**
 * Save a single content item to IndexedDB (for larger data)
 * @param content Content item to save
 * @returns Promise resolving when content is saved
 */
export const saveContentToIndexedDB = async (
  content: StoredContent
): Promise<void> => {
  try {
    const db = await initIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(content);

      request.onsuccess = () => {
        console.log("Content saved to IndexedDB:", content.id);
        resolve();
      };

      request.onerror = (event) => {
        console.error("Error saving content to IndexedDB:", event);
        reject(event);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error("Failed to initialize IndexedDB for saving content:", error);
    throw error;
  }
};

/**
 * Retrieve all content from IndexedDB
 * @returns Promise resolving to array of stored content items
 */
export const getAllContentFromIndexedDB = async (): Promise<
  StoredContent[]
> => {
  try {
    const db = await initIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = (event) => {
        const content = (event.target as IDBRequest).result;
        console.log("Content retrieved from IndexedDB:", content);
        resolve(content);
      };

      request.onerror = (event) => {
        console.error("Error retrieving content from IndexedDB:", event);
        reject(event);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error(
      "Failed to initialize IndexedDB for retrieving content:",
      error
    );
    throw error;
  }
};

/**
 * Delete a content item from IndexedDB by ID
 * @param id ID of the content item to delete
 * @returns Promise resolving when content is deleted
 */
export const deleteContentFromIndexedDB = async (id: string): Promise<void> => {
  try {
    const db = await initIndexedDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        console.log("Content deleted from IndexedDB:", id);
        resolve();
      };

      request.onerror = (event) => {
        console.error("Error deleting content from IndexedDB:", event);
        reject(event);
      };

      transaction.oncomplete = () => {
        db.close();
      };
    });
  } catch (error) {
    console.error(
      "Failed to initialize IndexedDB for deleting content:",
      error
    );
    throw error;
  }
};
