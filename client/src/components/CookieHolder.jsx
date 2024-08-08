

import { useEffect,useState,useRef } from "react";
import { useLocation } from "react-router-dom"
import { useAccount } from "wagmi";
import { useReadContract, useWriteContract } from "wagmi";
import { CookieContract } from "../contracts/Cookie"

export default function CookieHolder() {

  const location = useLocation();
  const cookieObj = location.state?.cookieObject; // Safe access with optional chaining
  const [cookie, setCookie] = useState({});
  const [myComment, setMyComment] = useState('');
  const [networkDetails, setNetworkDetails] = useState({});
  const [gossipers, setGossipers] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const { address } = useAccount();
  const { writeContractAsync, data, isPending, isError, isSuccess } = useWriteContract();

  useEffect(() => {
    if (cookieObj) {
        setCookie(cookieObj);
        console.log(cookieObj);
        
    }
}, [cookieObj]);
  // Fetch network details
  const { data: details } = useReadContract({
      abi: CookieContract.abi,
      address: cookie.networkAddress,
      functionName: "spillTheTea",
      args: [],
       // Ensure contract function is only called when address is present
  });

  useEffect(() => {
      if (details) {
          setNetworkDetails(details);
      }
  }, [details]);

  // Fetch gossipers
  const { data: allGossipers } = useReadContract({
      abi: CookieContract.abi,
      address: cookie.networkAddress,
      functionName: 'getAllGossipers',
      args: [],
     
  });

  useEffect(() => {
      if (allGossipers) {
          setGossipers(allGossipers);
      }
  }, [allGossipers]);

  // Fetch comments
  const { data: comments } = useReadContract({
      abi: CookieContract.abi,
      address: cookie.networkAddress,
      functionName: "getAllComments",
      args: [],
     
  });

  useEffect(() => {
      if (comments) {
          setAllComments(comments);
      }
  }, [comments]);

  

  useEffect(() => {
      console.log(allComments);
      console.log(gossipers);
  }, [allComments, gossipers]);

    const handleAddingAComment = async () =>{
      const modal = document.getElementById('my_modal_7').showModal()
      if(modal){
        modal.showModal()
      
      }
      await writeContractAsync({
        abi:CookieContract.abi,
        address:cookie.networkAddress,
        functionName:"addAComment",
        args:[myComment]
      })  
    }

    const handleGossipSesh = async () =>{
      const modal = document.getElementById('my_modal_5').showModal()
      if(modal){
        modal.showModal()
      }
      if(networkDetails.current[1]){
        await handleEndGossip();
      }
      else{
        await handleStartGossip();
      }
    }

    const handleStartGossip = async () =>{
      await writeContractAsync({
        abi: CookieContract.abi,
        address:cookie.networkAddress,
        functionName:'startGossip',
        args:[]
      })
    }

    const handleEndGossip = async () =>{

      await writeContractAsync({
        abi: CookieContract.abi,
        address:cookie.networkAddress,
        functionName:'endGossip',
        args:[]
      })

    }

    return(
        <>
        <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border">
            <div className="collapse-title text-xl font-bold">Cookie #{Number(cookieObj.tokenId)}</div>
            <div className="collapse-content">
                <p>Cookie Creator: {cookieObj.tokenOwner}</p>
            </div>
        </div>

        <div className="flex justify-between items-center bg-base-200 rounded mt-2 p-4">
        <p className="flex-grow">
        <b>Network Address:</b>{cookieObj.networkAddress} 
        
        
        
      </p>

      {networkDetails.current && networkDetails.current.length > 0 && (
  <button onClick={handleGossipSesh} className="btn btn-primary">{!networkDetails.current[1]?"Start Gossip":"End Gossip"}</button>
)}
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
  <h3 className="font-bold text-lg">
  {networkDetails?.current && networkDetails.current[1] ? "Ending" : "Starting"} Gossip...
</h3>

    {isPending && !isError && !isSuccess && <p className="py-4">Transaction in Progress</p>}
              {!isPending && isError && !isSuccess && <p className="py-4 text-red-900">Transaction Failed</p>}
              {!isPending && !isError && isSuccess && (
                <p className="py-4 text-green-700 whitespace-normal break-words">
                  Transaction Successful! Hash: {data}
                </p>
              )}
    <div className="modal-action">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>

</div>


        <div className="flex w-full flex-col lg:flex-row pt-4">
                <div style={{height:"450px"}} className="card bg-base-300 rounded-box grid flex-grow">

                <p className="py-1 font-semibold">- SPECULATIONS - </p>




                </div>





                <div className="divider lg:divider-horizontal"></div>


                <div style={{height:"450px"}} className="card bg-base-300 rounded-box grid flex-grow">
  <p className="py-1 font-semibold">- COMMENTS - </p>
  <div className="overflow-y-auto h-full flex flex-col">
    <div className="chat chat-start">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="chat-header">
        Obi-Wan Kenobi
        <time className="text-xs opacity-50">12:45</time>
      </div>
      <div className="chat-bubble">You were the Chosen One!</div>
      <div className="chat-footer opacity-50">Delivered</div>
    </div>



    <div className="chat chat-end">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <div className="chat-header">
        Anakin
        <time className="text-xs opacity-50">12:46</time>
      </div>
      <div className="chat-bubble">I hate you!</div>
      <div className="chat-footer opacity-50">Seen at 12:46</div>
    </div>
  </div>

  <div className="w-full flex flex-col justify-center items-center">
    <input onChange={(e)=>{setMyComment(e.target.value)}} type="text" placeholder="Type your message here..." className="input input-bordered w-full" />
    <button onClick={handleAddingAComment} className="btn btn-secondary w-5/12 mt-4 text-lg">Send</button>
    <dialog id="my_modal_7" className="modal modal-bottom sm:modal-middle">
  <div className="modal-box">
    <h3 className="font-bold text-lg">Registering your Comment!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action">
    {isPending && !isError && !isSuccess && <p className="py-4">Transaction in Progress</p>}
              {!isPending && isError && !isSuccess && <p className="py-4 text-red-900">Transaction Failed</p>}
              {!isPending && !isError && isSuccess && (
                <p className="py-4 text-green-700 whitespace-normal break-words">
                  Transaction Successful! Hash: {data}
                </p>
              )}
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
  </div>

  
 
 
 
</div>

                
        </div>
        
        </>
    )
    
}