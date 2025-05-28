// filepath: e:\development\Darkcaves-Dragonites\src\components\ui\Button.tsx
import React from "react";
import { getComponentSize } from "../../utils/designTokens";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "secondary"
    | "outline"
    | "ghost"
    | "danger"
    | "pokemon"
    | "dnd";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const buttonVariants = {
  primary: `
    bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700
    text-white shadow-md hover:shadow-lg
    border-transparent focus:ring-primary-500
  `,
  secondary: `
    bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700
    text-white shadow-md hover:shadow-lg
    border-transparent focus:ring-secondary-500
  `,
  outline: `
    border-2 border-gray-300 dark:border-gray-600 
    bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700
    text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500
    focus:ring-gray-500
  `,
  ghost: `
    hover:bg-gray-100 dark:hover:bg-gray-800 
    text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100
    border-transparent focus:ring-gray-500
  `,
  danger: `
    bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
    text-white shadow-md hover:shadow-lg
    border-transparent focus:ring-red-500
  `,
  pokemon: `
    bg-gradient-to-r from-pokemon-electric to-pokemon-fire hover:from-pokemon-fire hover:to-pokemon-electric
    text-white shadow-lg hover:shadow-xl
    border-transparent focus:ring-pokemon-electric transform hover:scale-105
  `,
  dnd: `
    bg-gradient-to-r from-dnd-legendary to-dnd-epic hover:from-dnd-epic hover:to-dnd-legendary
    text-white shadow-lg hover:shadow-xl
    border-transparent focus:ring-dnd-legendary transform hover:scale-105
  `,
};

const LoadingSpinner = () => (
  <svg
    className="animate-spin -ml-1 mr-2 h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = buttonVariants[variant];
  const sizeConfig = getComponentSize(size);
  const sizeClasses = `${sizeConfig.padding} ${sizeConfig.text} ${sizeConfig.height}`;

  const finalClassName = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  return (
    <button
      className={finalClassName}
      disabled={disabled || isLoading}
      {...props}
    >
      {" "}
      {isLoading ? (
        <LoadingSpinner />
      ) : leftIcon ? (
        <span className="mr-2">{leftIcon}</span>
      ) : null}
      {children}
      {rightIcon && !isLoading && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
};

export default Button;
