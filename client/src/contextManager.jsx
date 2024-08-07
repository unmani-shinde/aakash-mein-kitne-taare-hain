import React, { createContext, useState, useContext } from "react";

const ChainContext = createContext();

export const ChainProvider = ({ children }) => {
  const [selectedChain, setSelectedChain] = useState({});
  const [selectedChains, setSelectedChains] = useState([]);
  

  return (
    <ChainContext.Provider value={{ selectedChain, setSelectedChain, selectedChains, setSelectedChains }}>
      {children}
    </ChainContext.Provider>
  );
};

export const useChain = () => useContext(ChainContext);
