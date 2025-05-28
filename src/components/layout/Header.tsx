// filepath: e:\development\Darkcaves-Dragonites\src\components\layout\Header.tsx
import React from "react";
import { ThemeToggle } from "../ui";
import {
  combineClasses,
  transitions,
  typography,
  elevation,
} from "../../utils/designTokens";

interface HeaderProps {
  onMenuToggle?: () => void;
  sidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  return (
    <header
      className={combineClasses(
        "bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700",
        "h-16 flex items-center px-4",
        elevation.sm,
        "sticky top-0 z-40"
      )}
    >
      {/* Menu Toggle Button */}
      <button
        onClick={onMenuToggle}
        className={combineClasses(
          "p-2 rounded-md text-gray-600 dark:text-gray-300",
          "hover:bg-gray-100 dark:hover:bg-gray-700",
          "focus:outline-none focus:ring-2 focus:ring-primary-500",
          transitions.colors,
          transitions.duration.normal
        )}
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

      {/* App Title and Logo Area */}
      <div className="flex items-center ml-4">
        {/* Logo/Icon placeholder */}
        <div
          className={combineClasses(
            "w-8 h-8 rounded-lg mr-3 flex items-center justify-center",
            "bg-gradient-to-br from-primary-500 to-secondary-500",
            "shadow-md"
          )}
        >
          <span className="text-white font-bold text-lg">D&D</span>
        </div>

        <div className="flex flex-col">
          <h1
            className={combineClasses(
              typography.fontSize.xl,
              typography.fontWeight.bold,
              typography.fontFamily.pokemon,
              "text-gray-900 dark:text-white leading-tight"
            )}
          >
            Darkcaves & Dragonites
          </h1>
          <span
            className={combineClasses(
              typography.fontSize.xs,
              "text-gray-500 dark:text-gray-400 leading-none"
            )}
          >
            Pokemon to D&D Converter
          </span>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Header Actions */}
      <div className="flex items-center space-x-3">
        {/* Search shortcut hint */}
        <div
          className={combineClasses(
            "hidden sm:flex items-center px-3 py-1.5 rounded-md",
            "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400",
            typography.fontSize.sm,
            "border border-gray-200 dark:border-gray-600"
          )}
        >
          <span>Press</span>
          <kbd className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-gray-200 dark:bg-gray-600 rounded">
            /
          </kbd>
          <span className="ml-1">to search</span>
        </div>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* User menu placeholder */}
        <button
          className={combineClasses(
            "p-2 rounded-full text-gray-600 dark:text-gray-300",
            "hover:bg-gray-100 dark:hover:bg-gray-700",
            "focus:outline-none focus:ring-2 focus:ring-primary-500",
            transitions.colors,
            transitions.duration.normal
          )}
          aria-label="User menu"
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>{" "}
        </button>
      </div>
    </header>
  );
};

export default Header;
