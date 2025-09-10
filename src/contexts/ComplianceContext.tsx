
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface ComplianceGuideline {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  url: string; // Added URL field
}

export interface ComplianceResult {
  id: string;
  name: string;
  status: 'PASS' | 'WARNING' | 'FAIL';
  description: string;
  recommendation?: string;
  reason?: string;
}

export interface ComplianceReport {
  guideline: ComplianceGuideline;
  overallRating: 'Compliant' | 'Non-compliant' | 'Needs Review';
  results: ComplianceResult[];
  timestamp: Date;
  fileName?: string;
  fileUrl?: string;
}

interface ComplianceContextType {
  selectedGuideline: ComplianceGuideline | null;
  setSelectedGuideline: (guideline: ComplianceGuideline | null) => void;
  currentReport: ComplianceReport | null;
  setCurrentReport: (report: ComplianceReport | null) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (analyzing: boolean) => void;
}

const ComplianceContext = createContext<ComplianceContextType | undefined>(undefined);

export const useCompliance = () => {
  const context = useContext(ComplianceContext);
  if (!context) {
    throw new Error('useCompliance must be used within a ComplianceProvider');
  }
  return context;
};

interface ComplianceProviderProps {
  children: ReactNode;
}

export const ComplianceProvider: React.FC<ComplianceProviderProps> = ({ children }) => {
  const [selectedGuideline, setSelectedGuideline] = useState<ComplianceGuideline | null>(null);
  const [currentReport, setCurrentReport] = useState<ComplianceReport | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <ComplianceContext.Provider
      value={{
        selectedGuideline,
        setSelectedGuideline,
        currentReport,
        setCurrentReport,
        isAnalyzing,
        setIsAnalyzing
      }} data-id="tgox07rxb" data-path="src/contexts/ComplianceContext.tsx">
      {children}
    </ComplianceContext.Provider>);

};