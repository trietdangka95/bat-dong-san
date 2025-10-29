"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface TenantConfig {
  id: string;
  name: string;
  domain: string;
  logoUrl?: string;
  theme: string;
  primaryColor: string;
  secondaryColor: string;
  config?: any;
}

interface TenantContextType {
  tenant: TenantConfig | null;
  isLoading: boolean;
  error: string | null;
}

const TenantContext = createContext<TenantContextType>({
  tenant: null,
  isLoading: true,
  error: null,
});

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within a TenantProvider");
  }
  return context;
};

interface TenantProviderProps {
  children: React.ReactNode;
  initialTenant?: TenantConfig;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({
  children,
  initialTenant,
}) => {
  const [tenant, setTenant] = useState<TenantConfig | null>(
    initialTenant || null
  );
  const [isLoading, setIsLoading] = useState(!initialTenant);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialTenant) {
      setTenant(initialTenant);
      setIsLoading(false);
      return;
    }

    // Fetch tenant data from API
    const fetchTenant = async () => {
      try {
        const response = await fetch("/api/tenant");
        if (!response.ok) {
          throw new Error("Failed to fetch tenant data");
        }
        const tenantData = await response.json();
        setTenant(tenantData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTenant();
  }, [initialTenant]);

  const value: TenantContextType = {
    tenant,
    isLoading,
    error,
  };

  return (
    <TenantContext.Provider value={value}>{children}</TenantContext.Provider>
  );
};

// Hook to get tenant theme colors
export const useTenantTheme = () => {
  const { tenant } = useTenant();

  if (!tenant) {
    return {
      primaryColor: "#3B82F6",
      secondaryColor: "#1E40AF",
      theme: "light",
    };
  }

  return {
    primaryColor: tenant.primaryColor,
    secondaryColor: tenant.secondaryColor,
    theme: tenant.theme,
  };
};
