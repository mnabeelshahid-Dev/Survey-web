import React, { createContext, useState, ReactNode } from 'react';

// Define types for DOB and Survey responses
interface DOB {
  dd: string;
  mm: string;
  yyyy: string;
}

interface SurveyResponses {
  title: string;
  dob: DOB;
  performance: string;
  stressSources: string;
  workBalance: string;
}

interface SurveyContextType {
  responses: SurveyResponses;
  setResponses: React.Dispatch<React.SetStateAction<SurveyResponses>>;
}

// Create the context with undefined as default
export const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [responses, setResponses] = useState<SurveyResponses>({
    title: '',
    dob: { dd: '', mm: '', yyyy: '' },
    performance: '',
    stressSources: '',
    workBalance: '',
  });

  return (
    <SurveyContext.Provider value={{ responses, setResponses }}>
      {children}
    </SurveyContext.Provider>
  );
};
