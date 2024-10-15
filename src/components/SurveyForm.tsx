import React, { useCallback, useContext, useState } from "react";
import { useSurveyQuestions } from "../api/surveyApi";
import { SurveyContext } from "../context/SurveyContext";
import DobPicker from "./DatePicker";

interface Response {
  title: string;
  dob: {
    dd: string;
    mm: string;
    yyyy: string;
  };
  performance: string;
  stressSources: string;
  [key: number]: string | undefined;
}

interface Option {
  id: string;
  title: string;
}

interface Question {
  id: number;
  title: string;
  type: string;
  options: Option[];
}

interface SurveyData {
  questions: Question[];
}

const SurveyForm: React.FC = () => {
  const { data = {} as SurveyData, error, isLoading } = useSurveyQuestions();
  const { responses = {} as Response, setResponses }: any =
    useContext(SurveyContext);

  const handleInputChange = (field: keyof Response, value: string | number) => {
    setResponses((prev: any) => ({ ...prev, [field]: value }));
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = useCallback((field: string, date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      setResponses((prev: any) => ({
        ...prev,
        [field]: { dd: day, mm: month, yyyy: year },
      }));
    }
  }, [setResponses]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Responses saved to localStorage", responses);
  };

  const handleChange = (id: number, value: string) => {
    setResponses((prev: any) => ({ ...prev, [id]: value }));
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto p-6 space-y-8 bg-teal-100 rounded-lg shadow-lg"
    >
      <div>
        <label className="block mb-2 text-lg font-medium">Title</label>
        <select
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-300"
          onChange={(e) => handleInputChange("title", e.target.value)}
        >
          <option value="Mr">Mr</option>
          <option value="Ms">Ms</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
          <option value="NA">NA</option>
        </select>
      </div>

      <div>
        <DobPicker
          selectedDate={selectedDate}
          handleDateChange={(e) => handleDateChange("dob", e)}
        />
      </div>

      <div>
        <label className="block mb-2 text-lg font-medium">
          Rate the performance of other workers (1-10)
        </label>
        <div className="flex space-x-2">
          {[...Array(10)].map((_, i) => (
            <button
              key={i}
              type="button"
              className={`p-2 border rounded-full w-10 h-10 text-center transition-colors duration-200 ${
                responses.performance === (i + 1).toString()
                  ? "bg-teal-600 text-white"
                  : "bg-white"
              }`}
              onClick={() =>
                handleInputChange("performance", (i + 1).toString())
              }
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block mb-2 text-lg font-medium">
          Sources of Stress
        </label>
        <textarea
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-teal-300"
          maxLength={250}
          placeholder="Describe any sources of stress (max 250 characters)"
          onChange={(e) => handleInputChange("stressSources", e.target.value)}
        ></textarea>
      </div>

      <div>
        <label className="block mb-2 text-lg font-medium">
          Work-Life Balance
        </label>
        {data.questions ? (
          data.questions.map((question: any) => (
            <div key={question.id} className="p-4 border-b">
              <label className="block text-lg">{question.title}</label>
              {question.type === "dropdown" ? (
                <select
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  className="border w-full p-2 mt-2 rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                >
                  {question.options?.map((option: any) => {
                    return (
                      <option key={option.id} value={option}>
                        {option}
                      </option>
                    );
                  })}
                </select>
              ) : (
                <input
                  type="text"
                  className="border w-full p-2 mt-2 rounded-md focus:outline-none focus:ring focus:ring-teal-300"
                  onChange={(e) => handleChange(question.id, e.target.value)}
                />
              )}
            </div>
          ))
        ) : (
          <p>No data available.</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default SurveyForm;
