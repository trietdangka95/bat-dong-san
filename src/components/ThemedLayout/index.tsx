"use client";

import React from "react";
import { useTenant, useTenantTheme } from "@/contexts/TenantContext";

interface ThemedLayoutProps {
  children: React.ReactNode;
}

const ThemedLayout: React.FC<ThemedLayoutProps> = ({ children }) => {
  const { tenant } = useTenant();
  const { primaryColor, secondaryColor, theme } = useTenantTheme();

  // Generate CSS variables for tenant theme
  const themeStyles = {
    "--tenant-primary": primaryColor,
    "--tenant-secondary": secondaryColor,
    "--tenant-theme": theme,
  } as React.CSSProperties;

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
      style={themeStyles}
    >
      {/* Custom CSS for tenant theming */}
      <style jsx global>{`
        :root {
          --tenant-primary: ${primaryColor};
          --tenant-secondary: ${secondaryColor};
        }

        .tenant-primary {
          background-color: var(--tenant-primary);
        }

        .tenant-primary-text {
          color: var(--tenant-primary);
        }

        .tenant-secondary {
          background-color: var(--tenant-secondary);
        }

        .tenant-secondary-text {
          color: var(--tenant-secondary);
        }

        .tenant-border {
          border-color: var(--tenant-primary);
        }

        .tenant-hover:hover {
          background-color: var(--tenant-secondary);
        }

        .tenant-gradient {
          background: linear-gradient(
            to right,
            var(--tenant-primary),
            var(--tenant-secondary)
          );
        }
      `}</style>

      {children}
    </div>
  );
};

export default ThemedLayout;
