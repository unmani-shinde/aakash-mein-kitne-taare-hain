import { Button } from "flowbite-react";
import { useState, useEffect, useRef } from "react";
import { useChain } from "../contextManager";
import { GoogleGenerativeAI } from '@google/generative-ai';
import { handleTransactionsRetrieval } from "../fetch-data/core/transactions";
import { handleERC20TransfersRetrieval } from "../fetch-data/core/erc20transfers";
import { handleTransactionsRetrieval as handleTransactionsFromArbitrumSepolia } from "../fetch-data/arbitrum-sepolia/transactions";
import { handleERC20TransfersRetrieval as handleERC20TransfersRetrievalfromArbitrumSepolia } from "../fetch-data/arbitrum-sepolia/erc20transfers";

export default function Predict({ walletAddr }) {
  const { selectedChain, selectedChains } = useChain();
  const chainIds = selectedChains.map(chain => chain.chainId);
  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

  const isArbitrumDataFetched = useRef(false);
  const isCoreDataFetched = useRef(false);
  const isAmoyDataFetched = useRef(false);
  const isPredictionLoading = useRef(false);
  const isPredictionSet = useRef(false);

  const [modalMessage, setModalMessage] = useState("Crafting, with precision...");
  const [prediction, setPrediction] = useState("");
  const [parsedPrediction, setParsedPrediction] = useState({});

  const predict = async (blockchain_activity) => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const activity = JSON.stringify(blockchain_activity);

    const prompt = `Generate a personalized horoscope prediction based on the following blockchain activity. The activity summary is provided to help you understand the context of the user's recent transactions and interactions. ${activity}. The prediction should have four aspects, with two sentences for each aspect- General Overview, Finance and Career, Personal Growth and Innovation, Social and Relationship Dynamics.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();
  };

  const summarize = async(chain_spec_predictions) =>{

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chain_predictions = JSON.stringify(chain_spec_predictions);

    const prompt = `You have received predictions from multiple blockchain activities. Please summarize all these predictions into a cohesive horoscope prediction, covering the following four aspects with two sentences each: General Overview, Finance and Career, Personal Growth and Innovation, and Social and Relationship Dynamics. Combine the insights from all the provided predictions to generate this comprehensive summary. Here are the predictions: ${chain_predictions}.`;


    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text();

  }

  const user_onchain_activity = {
    userId: walletAddr,
    transactions: [],
    interactions: [],
    recieve_erc20: [],
    send_erc20: []
  };

  const user_onchain_arbi_sep_activity = {
    userId: walletAddr,
    transactions: [],
    interactions: [],
    recieve_erc20: [],
    send_erc20: []
  };

  const user_onchain_polygon_amoy_activity = {
    userId: walletAddr,
    transactions: [],
    interactions: [],
    recieve_erc20: [],
    send_erc20: []
  };

  const handlePredictionforCORE = async () => {
    isCoreDataFetched.current = false;
    setModalMessage(prevMessage => prevMessage + "<br />Fetching from Core DAO Testnet...");
    const json_data_txns = await handleTransactionsRetrieval(walletAddr);
    const json_data_erc20 = await handleERC20TransfersRetrieval(walletAddr);
    user_onchain_activity.transactions = json_data_txns.transactions;
    user_onchain_activity.interactions = json_data_txns.interactions;
    user_onchain_activity.recieve_erc20 = json_data_erc20.receive_erc20;
    user_onchain_activity.send_erc20 = json_data_erc20.send_erc20;
    isCoreDataFetched.current = true;
    setModalMessage(prevMessage => prevMessage + "<br />Profile data successfully fetched from Core DAO Testnet!");
    console.log(user_onchain_activity);
  };

  const handlePredictionforArbiSep = async () => {
    isArbitrumDataFetched.current = false;
    setModalMessage(prevMessage => prevMessage + "<br />Fetching from Arbitrum Sepolia...");
    const json_data_txns = await handleTransactionsFromArbitrumSepolia(walletAddr);
    const json_data_erc20 = await handleERC20TransfersRetrievalfromArbitrumSepolia(walletAddr);
    user_onchain_arbi_sep_activity.transactions = json_data_txns.transactions;
    user_onchain_arbi_sep_activity.interactions = json_data_txns.interactions;
    user_onchain_arbi_sep_activity.recieve_erc20 = json_data_erc20.receive_erc20;
    user_onchain_arbi_sep_activity.send_erc20 = json_data_erc20.send_erc20;
    isArbitrumDataFetched.current = true;
    setModalMessage(prevMessage => prevMessage + "<br />Profile data successfully fetched from Arbitrum Sepolia!");
    console.log(user_onchain_arbi_sep_activity);
  };

  const handlePredictionforPolyAmoy = async () => {
    setModalMessage(prevMessage => prevMessage + "<br />Fetching from Polygon Amoy...");
    // Assuming you have similar functions for Polygon Amoy
    // const json_data = await handlePolygonAmoyRetrieval(walletAddr);
    // user_onchain_polygon_amoy_activity.transactions = json_data.transactions;
    // user_onchain_polygon_amoy_activity.interactions = json_data.interactions;
    // user_onchain_polygon_amoy_activity.recieve_erc20 = json_data.receive_erc20;
    // user_onchain_polygon_amoy_activity.send_erc20 = json_data.send_erc20;
    setModalMessage(prevMessage => prevMessage + "<br />Profile data successfully fetched from Polygon Amoy!");
  };

  const handleUpdatesDisplay = async () => {
    const modal = document.getElementById('my_modal_1');
    if (modal) {
      modal.showModal();
      isPredictionLoading.current = true;
      if (chainIds.includes(421614)) {
        await handlePredictionforArbiSep();
      }
      if (chainIds.includes(1115)) {
        await handlePredictionforCORE();
      }
      if (chainIds.includes(80002)) {
        await handlePredictionforPolyAmoy();
      }
      // Update modal content after all data has been fetched
      const modalContent = modal.querySelector('.modal-box p');
      if (modalContent) {
        modalContent.innerHTML = modalMessage;
      }

      setTimeout(async () => {
        modal.close();
        isPredictionSet.current = true;
        
        let prediction_arbitrum = await predict(user_onchain_arbi_sep_activity);
        let prediction_core = await predict(user_onchain_activity);
        // let prediction_polygon = await predict(user_onchain_polygon_amoy_activity);
        const chain_spec_predictions = {
            "Arbitrum Sepolia": prediction_arbitrum,
            "Core DAO Testnet": prediction_core,
        }
        let final_Prediction = await summarize(chain_spec_predictions);
        setPrediction(final_Prediction);
        const data = parsePrediction(final_Prediction);
        setParsedPrediction(data);
        isPredictionLoading.current = false;
      }, 4000);
      
    } else {
      console.error('Modal not found');
    }
  };

  useEffect(() => {
    const modal = document.getElementById('my_modal_1');
    if (modal) {
      const modalContent = modal.querySelector('.modal-box p');
      if (modalContent) {
        modalContent.innerHTML = modalMessage;
      }
    }
  }, [modalMessage]);

  const parsePrediction = (prediction) => {
    const regex = /\*\*General Overview:\*\*(.*?)\*\*Finance and Career:\*\*(.*?)\*\*Personal Growth and Innovation:\*\*(.*?)\*\*Social and Relationship Dynamics:\*\*(.*)/s;
    const match = regex.exec(prediction);
  
    return {
      generalOverview: match[1]?.trim(),
      financeAndCareer: match[2]?.trim(),
      personalGrowth: match[3]?.trim(),
      socialAndRelationships: match[4]?.trim(),
    };
  };

  return (
    <>
      Review Details:
      <div className="flex flex-col items-center justify-center">
        <h1><b>Selected Chain to Mint Cookie: </b>{selectedChain.chainName}</h1>
        <h1 className="mb-8">
          <b>Selected Chains to Query Activity:</b>{" "}
          {selectedChains.map((chain, index) => chain.chainName).join(", ")}
        </h1>

        {!isPredictionLoading.current && isPredictionSet.current &&

        <div className="flex flex-col w-full items-center justify-center">
            <h1><b>Your Fortune Cookie Says: </b></h1>
            <div className="flex flex-row">
                <h3 className="font-bold">General Overview:</h3>
                <p>{parsedPrediction.generalOverview}</p>
            </div>

            <div className="flex flex-row">
                <h3 className="font-bold">Finance and Career:</h3>
                <p>{parsedPrediction.financeAndCareer}</p>
            </div>

            <div className="flex flex-row">
                <h3 className="font-bold">Personal Growth and Innovation:</h3>
                <p>{parsedPrediction.personalGrowth}</p>
            </div>

            <div className="flex flex-row">
                <h3 className="font-bold">Social and Relationship Dynamics:</h3>
                <p>{parsedPrediction.socialAndRelationships}</p>
            </div>

        </div>
        }
        {isPredictionLoading.current && !isPredictionSet.current && <span className="loading loading-spinner loading-lg"></span>}
        {!isPredictionLoading.current && !isPredictionSet.current && <button style={{ fontWeight: '700' }} className="button-56" role="button" onClick={handleUpdatesDisplay}>Click to Predict 🪄</button>}
      </div>
      
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Creating your Decentralized Cosmic Profile!</h3>
          <p className="py-4">Do not press ESC key or click the button below, this could interfere with profile creation.</p>
          <hr />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}
