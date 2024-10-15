import React from "react";
import SurveyForm from "../components/SurveyForm";

const Home: React.FC = () => {
  return (
    <div className="relative">
      <div className="bg-cover bg-center">
        <div className="relative max-w-2xl mx-auto p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
          <h1 className="text-3xl mb-6">Survey</h1>
          <SurveyForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
