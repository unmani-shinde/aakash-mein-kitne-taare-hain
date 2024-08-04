import { useWriteContract } from "wagmi";
import { HelloWorldContract } from "../contracts/HelloWorld";

export const useWrites = () => {
    const { writeContract, isError, isSuccess, isPending } = useWriteContract();

    const handleUpdateGreeting = (newGreeting) => {
        try {
            writeContract({
                abi: HelloWorldContract.abi,
                address: import.meta.env.VITE_HELLO_WORLD_DEPLOYED_CONTRACT_ADDRESS,
                functionName: 'setGreeting',
                args: [newGreeting]
            });
        } catch (error) {
            console.error("There was an error updating the greeting: ", error);
        }
    };

    // Return an object containing handleUpdateGreeting
    return { handleUpdateGreeting, isError, isSuccess, isPending };
};
