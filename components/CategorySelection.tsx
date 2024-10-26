'use client';
import { useState, useEffect, useCallback } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader } from "lucide-react";

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
  const [totalItems, setTotalItems] = useState(50); // Total number of items is 50
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const fetchCategories = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`/api/categories?page=${page}&limit=${ITEMS_PER_PAGE}`);
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data = await res.json();
      setCategories(data.categories);
      setTotalItems(data.total || 50); // Fallback to 50 if total is not provided
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

  // Calculate the current page range for display
  const startItem = (page - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(page * ITEMS_PER_PAGE, totalItems);

  if (error) {
    return (
      <Alert variant="destructive" className="m-4">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Status Message */}
      {saveStatus === 'saving' && (
        <Alert className="mb-4 bg-blue-50">
          <AlertDescription className="flex items-center">
            <Loader className="w-4 h-4 mr-2 animate-spin" />
            Saving your preferences...
          </AlertDescription>
        </Alert>
      )}
      {saveStatus === 'success' && (
        <Alert className="mb-4 bg-green-50">
          <AlertDescription>Preferences saved successfully!</AlertDescription>
        </Alert>
      )}
      {saveStatus === 'error' && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>Failed to save preferences. Please try again.</AlertDescription>
        </Alert>
      )}

      {/* Categories List */}
      <div className="space-y-3 mb-8">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader className="w-8 h-8 animate-spin text-gray-500" />
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                checked={selectedCategories.includes(category.id)}
                onChange={() => handleCheckboxChange(category.id)}
                className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label 
                htmlFor={`category-${category.id}`}
                className="ml-3 text-lg cursor-pointer select-none"
              >
                {category.name}
              </label>
            </div>
          ))
        )}
      </div>

      {/* Pagination with item range display */}
      <div className="flex flex-col items-center gap-4">
        <div className="text-sm text-gray-600">
          Showing {startItem} to {endItem} of {totalItems} categories
        </div>
        <div className="flex justify-center items-center gap-2">
          <button 
            onClick={() => setPage(1)}
            disabled={page === 1 || isLoading}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
            aria-label="First page"
          >
            &laquo;
          </button>
          <button 
            onClick={() => setPage(p => Math.max(p - 1, 1))}
            disabled={page === 1 || isLoading}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
            aria-label="Previous page"
          >
            &lsaquo;
          </button>
          <span className="px-4 py-2 font-medium">
            Page {page} of {totalPages}
          </span>
          <button 
            onClick={() => setPage(p => Math.min(p + 1, totalPages))}
            disabled={page === totalPages || isLoading}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
            aria-label="Next page"
          >
            &rsaquo;
          </button>
          <button 
            onClick={() => setPage(totalPages)}
            disabled={page === totalPages || isLoading}
            className="p-2 rounded hover:bg-gray-100 disabled:opacity-50 disabled:hover:bg-transparent"
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