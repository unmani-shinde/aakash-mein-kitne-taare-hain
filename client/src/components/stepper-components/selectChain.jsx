import { useState, useEffect } from "react";
import { chainDetails } from "../../../../chainDetails";
import { useLocation } from "react-router-dom";
import { useChain } from "../../contextManager";
import { useSwitchChain,useAccount } from 'wagmi'




export default function SelectChain({ isForMint }) {
  const { selectedChain, setSelectedChain, selectedChains, setSelectedChains } = useChain();
  const location = useLocation();
  const account = useAccount();
  const { chains, switchChain } = useSwitchChain()

  const handleSelectChain = (chain) => {
    if (isForMint) {
      setSelectedChain(chain);
    } else {
      setSelectedChains((prevChains) => {
        if (prevChains.some((selected) => selected.chainId === chain.chainId)) {
          return prevChains.filter((selected) => selected.chainId !== chain.chainId);
        } else {
          return [...prevChains, chain];
        }
      });
    }
  };

  useEffect(() => {
    if (isForMint) {
      location.state = { selectedChain };
    } else {
      location.state = { selectedChains };
    }
  }, [selectedChain, selectedChains, isForMint, location]);

  const isSelected = (chain) => {
    if (isForMint) {
      return chain.chainId === selectedChain.chainId;
    } else {
      return selectedChains.some((selected) => selected.chainId === chain.chainId);
    }
  };

  return (
    <ul className="menu menu-lg bg-base-200 rounded-box max-w-screen p-8">
      <li className="text-xl font-bold mb-4">
        Select a Chain to {isForMint ? "Mint your Cookie" : "Query your Activity"}
      </li>
      {isForMint && selectedChain.chainId!==account.chainId && <button onClick={() => switchChain({ chainId: selectedChain.chainId })}>
          <p className="text-lg">Switch to Selected Chain</p>
        </button>}
      {chainDetails.map((chain, index) => (
        <li key={index}>
          <div
            onClick={() => handleSelectChain(chain)}
            className={`flex flex-row items-center ${isSelected(chain) && isForMint ? "active" : ""}`}
          >
            <div className="flex flex-row w-11/12">
              <img className="h-8 w-auto" src={chain.chainTickerURL} alt={`${chain.chainName} logo`} />
              <a>{chain.chainName}</a>
            </div>
            <div className="w-1/12">
              {!isForMint && (
                <input
                  type="checkbox"
                  checked={isSelected(chain)}
                  className="ml-2 checkbox checkbox-lg"
                  onChange={() => handleSelectChain(chain)}
                />
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
