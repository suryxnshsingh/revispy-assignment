'use client';
import { useState, useEffect, useCallback } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader, Moon, Sun } from "lucide-react";

interface Category {
  id: number;
  name: string;
}

interface CategorySelectionProps {
  userId: number;
}

const ITEMS_PER_PAGE = 6;

const CategorySelection = ({ userId }: CategorySelectionProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(50);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    }
  }, []);

  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark');
      setIsDarkMode(!isDarkMode);
      localStorage.setItem('theme', isDarkMode ? 'light' : 'dark');
    }
  };

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/categories?page=${page}&limit=${ITEMS_PER_PAGE}`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setCategories(data.categories);
      setTotalItems(data.total || 50);
    } catch (err) {
      setError('Error loading categories. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [page]);

  const fetchUserInterests = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/user/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch user interests');
      const data = await res.json();
      setSelectedCategories(data.interests.map((interest: { id: number }) => interest.id));
    } catch (err) {
      setError('Error loading your interests. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchUserInterests();
  }, [fetchUserInterests]);

  const handleCheckboxChange = async (categoryId: number) => {
    try {
      setSaveStatus('saving');
      const newSelectedCategories = selectedCategories.includes(categoryId)
        ? selectedCategories.filter(id => id !== categoryId)
        : [...selectedCategories, categoryId];

      setSelectedCategories(newSelectedCategories);

      const res = await fetch("/api/user/interests", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          interests: newSelectedCategories,
        }),
      });

      if (!res.ok) throw new Error('Failed to save interests');
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 2000);
    } catch (err) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white dark:bg-neutral-950 text-gray-900 dark:text-gray-100 rounded-xl relative">
      {saveStatus === 'saving' && (
        <Alert className="mb-4 bg-blue-50 dark:bg-blue-900/30">
          <AlertDescription className="flex items-center text-blue-800 dark:text-blue-200">
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Saving your preferences...
          </AlertDescription>
        </Alert>
      )}
      {saveStatus === 'success' && (
        <Alert className="mb-4 bg-green-50 dark:bg-green-900/30">
          <AlertDescription className="text-green-800 dark:text-green-200">
            Preferences saved successfully!
          </AlertDescription>
        </Alert>
      )}
      {saveStatus === 'error' && (
        <Alert variant="destructive" className="mb-4 bg-red-50 dark:bg-red-900/30">
          <AlertDescription className="text-red-800 dark:text-red-200">
            Failed to save preferences. Please try again.
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1 mb-8">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader className="w-8 h-8 animate-spin text-gray-500 dark:text-gray-400" />
          </div>
        ) : (
          categories.map((category) => (
            <div 
              key={category.id} 
              className="flex items-center pl-6 py-1 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCheckboxChange(category.id)}
                className="w-5 h-5 rounded accent-black dark:accent-white cursor-pointer
                  border-gray-300 dark:border-gray-600
                  bg-white dark:bg-gray-700
                  focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
              />
              <label 
                htmlFor={`category-${category.id}`}
                className="ml-3 text-lg cursor-pointer select-none text-gray-900 dark:text-gray-100"
              >
                {category.name}
              </label>
            </div>
          ))
        )}
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex justify-center items-center gap-2">
          <button 
            onClick={() => setPage(1)}
            disabled={page === 1 || isLoading}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 
              disabled:opacity-50 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent
              text-gray-700 dark:text-gray-300"
            aria-label="First page"
          >
            &laquo;
          </button>
          <button 
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1 || isLoading}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 
              disabled:opacity-50 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent
              text-gray-700 dark:text-gray-300"
            aria-label="Previous page"
          >
            &lsaquo;
          </button>
          <span className="px-4 py-2 font-medium text-gray-900 dark:text-gray-100">
            Page {page} of {totalPages}
          </span>
          <button 
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages || isLoading}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 
              disabled:opacity-50 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent
              text-gray-700 dark:text-gray-300"
            aria-label="Next page"
          >
            &rsaquo;
          </button>
          <button 
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages || isLoading}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 
              disabled:opacity-50 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent
              text-gray-700 dark:text-gray-300"
            aria-label="Last page"
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategorySelection;