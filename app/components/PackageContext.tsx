"use client";

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface PackageContextProps {
  selectedPackage: string;
  setSelectedPackage: (packageValue: string) => void;
}

const PackageContext = createContext<PackageContextProps | undefined>(undefined);

export const PackageProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPackage, setSelectedPackage] = useState('');

  const setSelected = (packageValue: string) => {
    setSelectedPackage(packageValue);
  };

  const value = useMemo(() => ({ selectedPackage, setSelectedPackage: setSelected }), [selectedPackage]);

  return (
    <PackageContext.Provider value={value}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = () => {
  const context = useContext(PackageContext);
  if (!context) {
    throw new Error("usePackage must be used within a PackageProvider");
  }
  return context;
};