import { Button } from "flowbite-react";
import { useReads } from "../wagmi/reads";
import { useState } from "react";
import { HelloWorldContract } from "../contracts/HelloWorld";
import { useWriteContract } from "wagmi";

export default function HelloWorld() {

    const { greeting } = useReads();
    const [message,setMessage] = useState('');
    const { writeContract, isError, isSuccess, isPending } = useWriteContract();

    const handleUpdateGreeting = () => {
        try {
            writeContract({
                abi: HelloWorldContract.abi,
                address: import.meta.env.VITE_HELLO_WORLD_DEPLOYED_CONTRACT_ADDRESS,
                functionName: 'setGreeting',
                args: [message]
            });
        } catch (error) {
            console.error("There was an error updating the greeting: ", error);
        }
    };
    

    return(<div>
        <h1 className="text-4xl">Hello World Test</h1>
        <h2>Greeting: {greeting}</h2>
        <hr></hr>
        <h2>New Greeting</h2>
        <Button onClick={handleUpdateGreeting}>Change Greeting</Button>
        <label>Enter New Greeting</label>
        <input type="text" placeholder="Old brown fox.." onChange={(e)=>{setMessage(e.target.value)}} />
        </div>)
    
}