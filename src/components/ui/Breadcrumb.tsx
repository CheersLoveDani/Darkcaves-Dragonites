import React from "react";
import {
  combineClasses,
  transitions,
  typography,
} from "../../utils/designTokens";

interface BreadcrumbItem {
  label: string;
  href?: string;
  onClick?: () => void;
  current?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator,
  className = "",
}) => {
  const defaultSeparator = (
    <svg
      className="w-4 h-4 text-gray-400 dark:text-gray-500"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 111.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
        clipRule="evenodd"
      />
    </svg>
  );

  return (
    <nav
      className={combineClasses("flex items-center space-x-2", className)}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isCurrent = item.current || isLast;

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className="mx-2">{separator || defaultSeparator}</span>
              )}

              {isCurrent ? (
                <span
                  className={combineClasses(
                    typography.fontSize.sm,
                    typography.fontWeight.medium,
                    "text-gray-900 dark:text-gray-100",
                    "cursor-default"
                  )}
                  aria-current="page"
                >
                  {item.label}
                </span>
              ) : (
                <button
                  onClick={item.onClick}
                  className={combineClasses(
                    typography.fontSize.sm,
                    typography.fontWeight.medium,
                    "text-primary-600 dark:text-primary-400",
                    "hover:text-primary-800 dark:hover:text-primary-300",
                    "hover:underline",
                    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-1",
                    "dark:focus:ring-offset-gray-800",
                    "rounded-sm px-1 py-0.5",
                    transitions.colors,
                    transitions.duration.fast
                  )}
                  type="button"
                >
                  {item.label}
                </button>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
