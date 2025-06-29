"use client";

import React, { useState, useEffect } from "react";
import { ContentItem } from "@/types/content";
import {
  saveContentToLocalStorage,
  getContentFromLocalStorage,
  saveContentToIndexedDB,
  getAllContentFromIndexedDB,
  deleteContentFromIndexedDB,
} from "@/utils/localStorageUtils";

const AdminPage: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [contentList, setContentList] = useState<ContentItem[]>([]);
  const [newContent, setNewContent] = useState({
    id: "",
    title: "",
    body: "",
    updatedAt: "",
  });
  const [editingContent, setEditingContent] = useState<ContentItem | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  // Default admin password (for MVP simplicity, stored in localStorage later)
  const DEFAULT_PASSWORD = "admin123";

  useEffect(() => {
    // Check if user is already authenticated
    const storedAuth = localStorage.getItem("adminAuth");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
      loadContent();
    }
  }, []);

  // Load content from both localStorage and IndexedDB
  const loadContent = async () => {
    try {
      // Get content from localStorage
      const localContent = getContentFromLocalStorage();
      setContentList(localContent);

      // Also attempt to get content from IndexedDB (for larger data)
      const indexedContent = await getAllContentFromIndexedDB();
      if (indexedContent.length > 0) {
        // Merge or prioritize IndexedDB content if needed
        setContentList((prev) => [...prev, ...indexedContent]);
      }
    } catch (error) {
      console.error("Error loading content:", error);
      setErrorMessage("Failed to load content. Please try again.");
    }
  };

  const handleLogin = () => {
    if (password === DEFAULT_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("adminAuth", "true");
      loadContent();
    } else {
      setErrorMessage("Incorrect password. Please try again.");
    }
  };

  const handleAddContent = async () => {
    if (!newContent.title || !newContent.body) {
      setErrorMessage("Title and body are required fields.");
      return;
    }

    const contentToAdd: ContentItem = {
      ...newContent,
      id: newContent.id || Date.now().toString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      // Update content list
      const updatedList = [...contentList, contentToAdd];
      setContentList(updatedList);

      // Save to localStorage (for simplicity and small data)
      saveContentToLocalStorage(updatedList);

      // Also save to IndexedDB (for larger data handling)
      await saveContentToIndexedDB(contentToAdd);

      // Reset form
      setNewContent({ id: "", title: "", body: "", updatedAt: "" });
      setErrorMessage("");
    } catch (error) {
      console.error("Error saving content:", error);
      setErrorMessage("Failed to save content. Please try again.");
    }
  };

  const handleEditContent = (content: ContentItem) => {
    setEditingContent(content);
    setNewContent(content);
  };

  const handleUpdateContent = async () => {
    if (!editingContent || !newContent.title || !newContent.body) {
      setErrorMessage("Title and body are required fields.");
      return;
    }

    const updatedContent: ContentItem = {
      ...newContent,
      updatedAt: new Date().toISOString(),
    };

    try {
      const updatedList = contentList.map((item) =>
        item.id === editingContent.id ? updatedContent : item
      );
      setContentList(updatedList);

      // Save to localStorage
      saveContentToLocalStorage(updatedList);

      // Also update in IndexedDB
      await saveContentToIndexedDB(updatedContent);

      // Reset form
      setNewContent({ id: "", title: "", body: "", updatedAt: "" });
      setEditingContent(null);
      setErrorMessage("");
    } catch (error) {
      console.error("Error updating content:", error);
      setErrorMessage("Failed to update content. Please try again.");
    }
  };

  const handleDeleteContent = async (id: string) => {
    try {
      const updatedList = contentList.filter((item) => item.id !== id);
      setContentList(updatedList);

      // Update localStorage
      saveContentToLocalStorage(updatedList);

      // Also delete from IndexedDB
      await deleteContentFromIndexedDB(id);
    } catch (error) {
      console.error("Error deleting content:", error);
      setErrorMessage("Failed to delete content. Please try again.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">Admin Login</h1>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={handleLogin}
            className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Admin Content Management
        </h1>

        {/* Content Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {editingContent ? "Edit Content" : "Add New Content"}
          </h2>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
          )}
          <input
            type="text"
            value={newContent.id}
            onChange={(e) =>
              setNewContent({ ...newContent, id: e.target.value })
            }
            placeholder="ID (optional, auto-generated if empty)"
            className="w-full p-2 border rounded mb-4"
            disabled={!!editingContent}
          />
          <input
            type="text"
            value={newContent.title}
            onChange={(e) =>
              setNewContent({ ...newContent, title: e.target.value })
            }
            placeholder="Title"
            className="w-full p-2 border rounded mb-4"
          />
          <textarea
            value={newContent.body}
            onChange={(e) =>
              setNewContent({ ...newContent, body: e.target.value })
            }
            placeholder="Body Content"
            className="w-full p-2 border rounded mb-4"
            rows={4}
          />
          <button
            onClick={editingContent ? handleUpdateContent : handleAddContent}
            className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            {editingContent ? "Update Content" : "Add Content"}
          </button>
          {editingContent && (
            <button
              onClick={() => {
                setNewContent({ id: "", title: "", body: "", updatedAt: "" });
                setEditingContent(null);
              }}
              className="w-full p-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 mt-2"
            >
              Cancel Edit
            </button>
          )}
        </div>

        {/* Content List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Existing Content</h2>
          {contentList.length === 0 ? (
            <p className="text-gray-500">No content available.</p>
          ) : (
            <div className="space-y-4">
              {contentList.map((content) => (
                <div
                  key={content.id}
                  className="border-b pb-4 last:border-b-0"
                >
                  <h3 className="text-lg font-medium">{content.title}</h3>
                  <p className="text-gray-600 truncate">{content.body}</p>
                  <p className="text-sm text-gray-500">
                    Updated: {new Date(content.updatedAt).toLocaleString()}
                  </p>
                  <div className="mt-2 flex space-x-2">
                    <button
                      onClick={() => handleEditContent(content)}
                      className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteContent(content.id)}
                      className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
