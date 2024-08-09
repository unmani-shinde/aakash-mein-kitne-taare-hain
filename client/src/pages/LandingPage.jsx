

import NavigationBar from "../components/NavigationBar";
import Hero from "../components/Hero";

export default function Home() {
    

    return(<>
        <NavigationBar/>
        <Hero/>
        {/* <div className="flex flex-col items-center justify-center">


        


{account.isConnected?
<div>
<p className="pt-12">Connected Address: {account.address}</p>
<div className="flex flex-col">
    <Predict walletAddr={account.address.toString()} />
    <CookieMint walletAddr={account.address.toString()}/> 
</div>
</div>
:
<>
<p>Connect Wallet</p>
</>}


</div> */}
    </>
    
   )
    
}