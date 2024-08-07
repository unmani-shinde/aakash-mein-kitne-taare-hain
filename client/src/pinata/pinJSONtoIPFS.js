import axios from 'axios';

const pinJSONToIPFS = async (filename,image_hash,parsedPredictionData) =>{
    try {
        const data = JSON.stringify({
          pinataContent: {
            name: filename,
            description: "Added from Oracular Protocol",
            image: image_hash,
            external_url: "https://ipfs.io/ipfs/"
          },
          pinataMetadata: {
            name: filename
          },
          parsedPredictionData
        })
        
        const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS",data, {
            headers: {
              'Content-Type': `application/json`,
              'Authorization': `Bearer ${import.meta.env.VITE_PINATA_JWT_KEY?.toString()}`
            },
          });
          
        const json_hash = res.data.IpfsHash;
        return json_hash;
      } catch (error) {
        console.log(error);
      }
}


export default pinJSONToIPFS;