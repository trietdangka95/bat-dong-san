"use client";

import React from "react";
import { useTenantTheme } from "@/contexts/TenantContext";

interface ThemedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
}

const ThemedButton: React.FC<ThemedButtonProps> = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
}) => {
  const { primaryColor, secondaryColor } = useTenantTheme();

  const baseClasses =
    "font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses = {
    primary: `text-white border border-transparent`,
    secondary: `text-white border border-transparent`,
    outline: `bg-transparent border-2 text-gray-700 hover:text-white`,
  };

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed hover:shadow-md hover:scale-100"
    : "hover:scale-105";

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: primaryColor,
          borderColor: primaryColor,
          "--hover-bg": secondaryColor,
        };
      case "secondary":
        return {
          backgroundColor: secondaryColor,
          borderColor: secondaryColor,
          "--hover-bg": primaryColor,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: primaryColor,
          color: primaryColor,
          "--hover-bg": primaryColor,
        };
      default:
        return {};
    }
  };

  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabledClasses}
    ${className}
  `.trim();

  const buttonStyles = {
    ...getVariantStyles(),
    "--focus-ring": primaryColor,
  } as React.CSSProperties;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      style={buttonStyles}
    >
      {children}
    </button>
  );
};

export default ThemedButton;
