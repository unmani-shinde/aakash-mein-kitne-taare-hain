

import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom"
export default function CookieHolder() {

    const location = useLocation()
    const cookieObj = location.state.cookieObject;
    const [cookie,setCookie] = useState({})

    useEffect(()=>{
        setCookie(cookieObj)      
        console.log(cookieObj);
         
        
    },[])

    return(
        <>
        <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border">
            <div className="collapse-title text-xl font-bold">Cookie #{cookieObj.tokenId}</div>
            <div className="collapse-content">
                <p>Cookie Creator: {cookieObj.tokenOwner}</p>
            </div>
        </div>

        <div className="flex justify-between items-center bg-base-200 rounded mt-2 p-4">
    <p className="flex-grow"><b>Network Address:</b> {cookieObj.networkAddress}</p>
    <button className="btn btn-primary">Start Gossip</button>
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
    <input type="text" placeholder="Type your message here..." className="input input-bordered w-full" />
    <button className="btn btn-secondary w-5/12 mt-4 text-lg">Send</button>
  </div>

  
 
 
 
</div>

                
        </div>
        
        </>
    )
    
}