export const fetchFromPinata = async (img_hash)=>{

    const baseURL = `${import.meta.env.VITE_PINATA_GATEWAY}/${img_hash}?pinataGatewayToken=${import.meta.env.VITE_PINATA_GATEWAY_ACCESS_TOKEN}`;
    console.log(baseURL);
    
    
    return baseURL;
}