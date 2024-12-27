"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { createContext, ReactNode, useState } from "react";

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

type SidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
};

export const SidebarContext = createContext<SidebarContextType | undefined>(
  undefined
);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{ isOpen, toggleSidebar, isMobileOpen, toggleMobileSidebar }}
    >
      {children}
    </SidebarContext.Provider>
  );
};
