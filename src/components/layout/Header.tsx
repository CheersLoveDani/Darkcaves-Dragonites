// filepath: e:\development\Darkcaves-Dragonites\src\components\layout\Header.tsx
import React from "react";

interface HeaderProps {
  onMenuToggle?: () => void;
  sidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 h-16 flex items-center px-4">
      {/* Menu Toggle Button */}
      <button
        onClick={onMenuToggle}
        className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        aria-label="Toggle sidebar"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* App Title */}
      <div className="flex items-center ml-4">
        <h1 className="text-xl font-bold text-gray-900 dark:text-white">
          Darkcaves & Dragonites
        </h1>
        <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
          Pokemon to D&D Converter
        </span>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Header Actions */}
      <div className="flex items-center space-x-2">
        {/* Theme Toggle Placeholder */}
        <button
          className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
