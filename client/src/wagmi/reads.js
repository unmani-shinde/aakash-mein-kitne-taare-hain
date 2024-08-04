import { HelloWorldContract } from "../contracts/HelloWorld";
import { useReadContract } from 'wagmi';

export const useReads = () =>{

    const { data: greeting } = useReadContract({
        abi: HelloWorldContract.abi,
        address: import.meta.env.VITE_HELLO_WORLD_DEPLOYED_CONTRACT_ADDRESS,
        functionName: "getGreeting",
    });

    return { greeting }

}