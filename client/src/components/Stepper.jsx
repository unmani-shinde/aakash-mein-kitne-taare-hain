import { useState } from "react";
import { usePrediction } from "../predictionContext";
import SelectChain from "./stepper-components/selectChain";
import Predict from "./Predict";
import { useAccount,useWriteContract} from "wagmi";
import { OracularProtocolContract } from "../contracts/OracularProtocol";
import { OracleProtocolAddress } from "../contracts/OracularProtocol";
import handleFileUpload from "../pinata/handleFileUpload";

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

  const { parsedPredictionData } = usePrediction();
  const { writeContractAsync, data,isPending,isError,isSuccess} = useWriteContract();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  
  const handleMint = async () => {
    const modal = document.getElementById('my_modal_2');
    if (modal) {
      modal.showModal();
    }

    if (selectedFile) {
      const fileName = selectedFile.name;
      console.log("File Name: ", fileName);
      let fileBlob = new Blob([selectedFile]);
      const formData = new FormData();
      formData.append('file', fileBlob);  
      try {
        let metadata = await handleFileUpload(selectedFile, fileName,parsedPredictionData);

        await writeContractAsync({
          abi: OracularProtocolContract.abi,
          address: OracleProtocolAddress,
          functionName: 'mintMyCookie',
          args:[metadata]
      })
      }catch(error){
        console.log('there was an error');        
      }
  }
}

 
  return (<div className="flex flex-col items-center justify-center w-full"> <p className="mb-4">You're Almost done..Ready to make your Fortune known?</p>

<label className="form-control w-full max-w-xs">
  <div className="label">
    <span className="label-text">Select a File <span className="text-red-800 text-xl">*</span></span>
   
  </div>
  <input onChange={handleFileChange} required type="file" className="file-input file-input-bordered w-full max-w-xs" />
  <div className="label mb-4">
    <span className="label-text-alt">PNG, IMG Files</span>
  </div>
</label>
  
  <button onClick={handleMint} style={{ fontWeight: '700' }} className="button-56" role="button">Mint My Cookie🍪</button>

  {/* Open the modal using document.getElementById('ID').showModal() method */}

<dialog id="my_modal_2" className="modal">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Mint Cookie</h3>
    {!isPending && !isError && !isSuccess &&<p className="py-4">Uploading Cookie Metadata to IPFS...</p>}
    {isPending && !isError && !isSuccess &&<p className="py-4">Minting Cookie...</p>}
    {!isPending && isError && !isSuccess && <p className="py-4 text-red-900 ">Cookie Minting Failed.</p>}
    {!isPending && !isError && isSuccess && <div className="flex flex-col">
      <p className="font-semibold py-2 ">Cookie Minting Succesful!</p>
      <hr></hr>
      <p className="py-2">Transaction Hash</p>
      <p className="break-words whitespace-normal">{data}</p>

      </div>}
    {!isError && !isSuccess && <span className="loading loading-spinner loading-lg"></span>}
  </div>
  <form method="dialog" className="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
  
  
  </div>)
}

// Main Stepper component
export default function Stepper() {
  const [currentStep, setCurrentStep] = useState(0);

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
