import CookieMint from "../components/CookieMint";
import NavigationBar from "../components/NavigationBar";
import { useAccount } from "wagmi";

export default function MintFortuneCookiePage() {

    const {isConnected, isConnecting, address} = useAccount();

    return(<>
            <NavigationBar/>
            {isConnecting && <span className="loading loading-ring loading-lg"></span>}
            {isConnected && <CookieMint walletAddr={address.toString()}/>}
            </>)
    
}