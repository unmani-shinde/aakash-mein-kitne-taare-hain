import { useState } from "react";
import SelectChain from "./stepper-components/selectChain";
import Predict from "./Predict";
import { useAccount } from "wagmi";

// Step components
function ChooseMintChain() {
  return <SelectChain isForMint={true}/>
}

function ChooseQueryChains() {
  return <SelectChain isForMint={false}/>;
}

function GetPrediction() {
    const {address} = useAccount();
  return <Predict walletAddr={address.toString()}/>;
}

function MintCookie() {
  return <div className="flex flex-col items-center justify-center w-full"> <p className="mb-4">You're Almost done..Ready to make your Fortune known?</p><button style={{ fontWeight: '700' }} className="button-56" role="button">Mint My Cookie🍪</button></div>;
}

// Main Stepper component
export default function Stepper() {
  const [currentStep, setCurrentStep] = useState(0);
  const [parsedPrediction, setParsedPrediction] = useState({});

  const steps = [
    { title: "Choose Mint Chain", component: <ChooseMintChain /> },
    { title: "Choose Query Chain(s)", component: <ChooseQueryChains /> },
    { title: "Get Prediction", component: <GetPrediction /> },
    { title: "Mint Cookie", component: <MintCookie /> },
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div>
      <ul className="steps steps-vertical lg:steps-horizontal">
        {steps.map((step, index) => (
          <li
            key={index}
            className={`step ${index <= currentStep ? "step-primary" : ""}`}
          >
            {step.title}
          </li>
        ))}
      </ul>
      <div className="mt-8">
        {steps[currentStep].component}
        <div className="flex justify-between mt-4">
          <button
            onClick={prevStep}
            className="btn"
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            className="btn btn-primary"
            disabled={currentStep === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
