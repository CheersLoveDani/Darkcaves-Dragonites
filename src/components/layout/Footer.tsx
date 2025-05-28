// filepath: e:\development\Darkcaves-Dragonites\src\components\layout\Footer.tsx
import React from "react";

interface FooterProps {
  className?: string;
}

export const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  return (
    <footer
      className={`bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 ${className}`}
    >
      <div className="flex items-center justify-between">
        {/* App Status */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
            <span>Connected to PokeAPI</span>
          </div>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
            <span>Database Ready</span>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <button className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            Help
          </button>
          <button className="hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
            About
          </button>
          <span className="text-gray-400 dark:text-gray-500">|</span>
          <span className="text-xs">Built with Tauri & React</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
