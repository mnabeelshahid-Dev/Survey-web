import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SurveyProvider } from './context/SurveyContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Set up TanStack Query client
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <QueryClientProvider client={queryClient}>
    <SurveyProvider>
      <App />
    </SurveyProvider>
  </QueryClientProvider>
);