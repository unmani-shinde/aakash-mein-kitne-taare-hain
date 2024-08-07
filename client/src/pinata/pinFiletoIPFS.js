import axios from 'axios';

const pinFiletoIPFS = async (file,file_name) =>{

    console.log("Uploading Image File...");
    const formData = new FormData();        
    formData.append('file', file)

    const pinataMetadata = JSON.stringify({
        name: file_name,
        })
        formData.append('pinataMetadata',pinataMetadata);
    
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', pinataOptions);

    try{
        
        
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        
      headers: {
        'Content-Type': `multipart/form-data`,
        'Authorization': `Bearer ${import.meta.env.VITE_PINATA_JWT_KEY?.toString()}`
      }
      });
      const image_hash = res.data.IpfsHash;
      console.log("Image uploaded to: ",image_hash);
      return image_hash

    } catch (error) {
      console.log("pin file error", error);
    }

}




export default pinFiletoIPFS