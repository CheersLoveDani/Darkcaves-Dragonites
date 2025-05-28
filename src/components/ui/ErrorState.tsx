import React from "react";
import {
  combineClasses,
  transitions,
  typography,
} from "../../utils/designTokens";
import { focusClasses } from "../../utils/responsive";

export type ErrorType = "error" | "warning" | "success" | "info";

interface ErrorStateProps {
  type?: ErrorType;
  title?: string;
  message: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  type = "error",
  title,
  message,
  action,
  className = "",
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case "warning":
        return {
          container:
            "bg-warning-50 dark:bg-warning-900/20 border-warning-200 dark:border-warning-800",
          icon: "text-warning-500",
          title: "text-warning-800 dark:text-warning-200",
          message: "text-warning-700 dark:text-warning-300",
        };
      case "success":
        return {
          container:
            "bg-success-50 dark:bg-success-900/20 border-success-200 dark:border-success-800",
          icon: "text-success-500",
          title: "text-success-800 dark:text-success-200",
          message: "text-success-700 dark:text-success-300",
        };
      case "info":
        return {
          container:
            "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800",
          icon: "text-blue-500",
          title: "text-blue-800 dark:text-blue-200",
          message: "text-blue-700 dark:text-blue-300",
        };
      default: // error
        return {
          container:
            "bg-error-50 dark:bg-error-900/20 border-error-200 dark:border-error-800",
          icon: "text-error-500",
          title: "text-error-800 dark:text-error-200",
          message: "text-error-700 dark:text-error-300",
        };
    }
  };

  const getIcon = () => {
    switch (type) {
      case "warning":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "success":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "info":
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
        );
      default: // error
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
    }
  };

  const styles = getTypeStyles();

  return (
    <div
      className={combineClasses(
        "rounded-lg border p-4",
        styles.container,
        className
      )}
      role="alert"
    >
      <div className="flex">
        <div className={combineClasses("flex-shrink-0", styles.icon)}>
          {getIcon()}
        </div>
        <div className="ml-3 flex-1">
          {title && (
            <h3
              className={combineClasses(
                typography.fontSize.sm,
                typography.fontWeight.medium,
                styles.title,
                "mb-1"
              )}
            >
              {title}
            </h3>
          )}
          <p className={combineClasses(typography.fontSize.sm, styles.message)}>
            {message}
          </p>
          {action && (
            <div className="mt-3">
              <button
                onClick={action.onClick}
                className={combineClasses(
                  "inline-flex items-center px-3 py-2 border border-transparent",
                  typography.fontSize.sm,
                  typography.fontWeight.medium,
                  "rounded-md",
                  type === "error"
                    ? "text-error-800 bg-error-100 hover:bg-error-200 dark:text-error-200 dark:bg-error-900/50 dark:hover:bg-error-900/70"
                    : type === "warning"
                      ? "text-warning-800 bg-warning-100 hover:bg-warning-200 dark:text-warning-200 dark:bg-warning-900/50 dark:hover:bg-warning-900/70"
                      : type === "success"
                        ? "text-success-800 bg-success-100 hover:bg-success-200 dark:text-success-200 dark:bg-success-900/50 dark:hover:bg-success-900/70"
                        : "text-blue-800 bg-blue-100 hover:bg-blue-200 dark:text-blue-200 dark:bg-blue-900/50 dark:hover:bg-blue-900/70",
                  focusClasses.default,
                  transitions.colors,
                  transitions.duration.normal
                )}
              >
                {action.label}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
