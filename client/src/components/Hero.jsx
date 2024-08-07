import { useAccount } from "wagmi"
import { ConnectKitButton } from "connectkit";

export default function Hero() {

    const { isConnected } = useAccount();

    return(
        <div className="hero bg-base-100 flex flex-col pt-32 justify-center">
  <div className="hero-content text-center">
    <div className="max-w-screen">
      <h1 className="text-5xl font-bold tracking-wide">Make your horoscope as reliable as your crypto wallet(s).</h1>
      <p className="py-6 text-xl">
      Oracular Protocol is a cosmic solution that’s as fun as it is futuristic. Let your on-chain activity speak for you. We're here to make sure no one can fake their stars – or their blockchain history! Trade your Fortunes, or meet the One, at the click of a button!
      </p>
      <div className="flex flex-row justify-center items-center w-full">
        {isConnected && <ConnectKitButton/>}
        <a href={isConnected?"/mint-a-fortune-cookie":"#"} className="ml-4 text-md btn btn-secondary">{isConnected?"Get Your Cookie!":"Connect your Wallet!"}</a>

      </div>
      
    </div>
  </div>
</div>
    )
    
}