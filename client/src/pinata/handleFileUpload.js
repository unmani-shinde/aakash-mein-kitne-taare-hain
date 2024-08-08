import pinFiletoIPFS from "./pinFiletoIPFS";
import pinJSONToIPFS from "./pinJSONtoIPFS";

const handleFileUpload = async (fileBlob,fileName,parsedPredictionData) => {
    try {
        console.log(fileBlob);
        
        const image_hash = await pinFiletoIPFS(fileBlob, fileName);

        if (image_hash) {
            // Pin the JSON to IPFS using the image hash
            const json_ipfs = await pinJSONToIPFS(fileName,image_hash,parsedPredictionData);
            return json_ipfs;
        } else {
            console.error("Failed to pin file to IPFS");
        }
    } catch (error) {
        console.log(error);
    }
}



export default handleFileUpload;