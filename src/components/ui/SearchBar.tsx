// filepath: e:\development\Darkcaves-Dragonites\src\components\ui\SearchBar.tsx
import React, { useState, useRef } from "react";
import Button from "./Button";
import { combineClasses } from "../../utils/designTokens";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  isLoading?: boolean;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "pokemon" | "dnd";
}

const SearchIcon = () => (
  <svg
    className="h-5 w-5 text-gray-400 dark:text-gray-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const ClearIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const searchVariants = {
  default:
    "border-gray-300 dark:border-gray-600 focus:border-primary-500 dark:focus:border-primary-400",
  pokemon:
    "border-pokemon-electric/30 focus:border-pokemon-electric dark:border-pokemon-electric/40",
  dnd: "border-dnd-legendary/30 focus:border-dnd-legendary dark:border-dnd-legendary/40",
};

const searchSizes = {
  sm: "h-9 pl-9 pr-4 text-sm",
  md: "h-10 pl-10 pr-4 text-base",
  lg: "h-12 pl-12 pr-5 text-lg",
};

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Search Pokemon by name or ID...",
  isLoading = false,
  className = "",
  value,
  onChange,
  onClear,
  size = "md",
  variant = "default",
}) => {
  const [internalQuery, setInternalQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Use controlled value if provided, otherwise use internal state
  const currentQuery = value !== undefined ? value : internalQuery;
  const setQuery = onChange || setInternalQuery;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuery.trim()) {
      onSearch(currentQuery.trim());
    }
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
    if (onClear) onClear();
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape" && currentQuery) {
      handleClear();
    }
  };

  const sizeClass = searchSizes[size];
  const variantClass = searchVariants[variant];

  return (
    <form
      onSubmit={handleSubmit}
      className={combineClasses("flex space-x-3", className)}
    >
      <div className="relative flex-1">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon />
        </div>

        {/* Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={currentQuery}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={combineClasses(
            "w-full rounded-lg border bg-white dark:bg-gray-800",
            "text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400",
            "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:focus:ring-primary-400",
            "transition-all duration-200 ease-out",
            sizeClass,
            variantClass
          )}
          disabled={isLoading}
        />

        {/* Clear Button */}
        {currentQuery && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
            aria-label="Clear search"
          >
            <ClearIcon />
          </button>
        )}
      </div>
      {/* Search Button */}
      <Button
        type="submit"
        variant={
          variant === "pokemon"
            ? "pokemon"
            : variant === "dnd"
              ? "dnd"
              : "primary"
        }
        size={size}
        isLoading={isLoading}
        disabled={!currentQuery.trim() || isLoading}
      >
        Search
      </Button>{" "}
    </form>
  );
};

export default SearchBar;
