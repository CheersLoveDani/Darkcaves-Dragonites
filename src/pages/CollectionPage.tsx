import React from "react";

export const CollectionPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          My Collection
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Manage your saved Pokemon and D&D stat blocks
        </p>
      </div>

      {/* Coming Soon Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Collection Coming Soon
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            This feature will allow you to save your favorite Pokemon, organize
            them into collections, and quickly access their D&D stat blocks.
          </p>
          <div className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Save Pokemon to personal collection
            </div>
            <div className="flex items-center justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Organize by type, party, or custom tags
            </div>
            <div className="flex items-center justify-center">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
              Export collections as D&D stat blocks
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollectionPage;
