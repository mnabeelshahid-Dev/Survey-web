import {
  useQuery,
} from '@tanstack/react-query'

// Define the type for your survey questions
interface Question {
  id: number;
  title: string;
  type: string;
  options?: string[]; // Optional for dropdowns
}

interface SurveyData {
  questions: Question[];
}

// Fetch function to get survey questions
const fetchSurveyQuestions = async (): Promise<SurveyData> => {
  const response = await fetch('data/survey.json');
  if (!response.ok) {
    throw new Error('Network response failed');
  }
  return response.json();
};

// Custom hook to use survey questions
export const useSurveyQuestions = () => {
  return useQuery<SurveyData, Error>(['surveyQuestions'], fetchSurveyQuestions);
};