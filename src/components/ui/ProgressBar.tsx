import React from "react";

export const ProgressBar: React.FC<{ value: number; className?: string }> = ({
  value,
  className = "",
}) => (
  <div className={`w-full bg-gray-300 dark:bg-gray-700 rounded ${className}`}>
    <div
      className="bg-blue-600 dark:bg-blue-400 h-full rounded transition-all"
      style={{ width: `${value}%`, height: "1rem" }}
    />
  </div>
);
