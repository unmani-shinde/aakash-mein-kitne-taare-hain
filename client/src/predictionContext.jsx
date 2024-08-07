// PredictionContext.js
import React, { createContext, useContext, useState } from 'react';

const PredictionContext = createContext();

export const usePrediction = () => useContext(PredictionContext);

export const PredictionProvider = ({ children }) => {
  const [parsedPredictionData, setParsedPredictionData] = useState({});

  return (
    <PredictionContext.Provider value={{ parsedPredictionData, setParsedPredictionData }}>
      {children}
    </PredictionContext.Provider>
  );
};
