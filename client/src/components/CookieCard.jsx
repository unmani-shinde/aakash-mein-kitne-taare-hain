import { useReadContract } from "wagmi"
import { OracleProtocolAddress, OracularProtocolContract } from "../contracts/OracularProtocol";

export default function CookieCard({cookie}) {

    const { data: gossipNetworkAddress } = useReadContract({
        abi:OracularProtocolContract.abi,
        address:OracleProtocolAddress,
        functionName:'getCookieMap',
        args:[BigInt(cookie.tokenId)]
    })


    return(<div className="card bg-base-100 w-72 shadow-xl mb-4">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Shoes"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Cookie #{cookie.tokenId}</h2>
          <p className="text-left whitespace-normal break-words">
  <b>Crafted By: </b>{cookie.tokenOwner}
</p>

          <div className="card-actions justify-end">
            <button className="btn btn-primary">{gossipNetworkAddress=="0x00"?"View Gossip":"Add to Gossip"}</button>
          </div>
        </div>
      </div>)
    
}