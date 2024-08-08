import axios from 'axios';

const pinJSONToIPFS = async (filename, image_hash, parsedPredictionData) => {
  try {
    //console.log("Parsed Prediction Data:", parsedPredictionData);

    const data = JSON.stringify({
      pinataContent: {
        name: filename,
        description: "Added from Oracular Protocol",
        image: image_hash,
        prediction_general_overview: parsedPredictionData.generalOverview,
        prediction_finance_and_career: parsedPredictionData.financeAndCareer,
        prediction_personal_growth: parsedPredictionData.personalGrowth,
        prediction_social_relationships: parsedPredictionData.socialAndRelationships
      },
      pinataMetadata: {
        name: filename
      },
    });

    console.log("Cookie Data: ",data);
    

    const res = await axios.post("https://api.pinata.cloud/pinning/pinJSONToIPFS", data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_PINATA_JWT_KEY?.toString()}`
      },
    });

    const json_hash = res.data.IpfsHash;
    return json_hash;
  } catch (error) {
    console.log("Error in pinJSONToIPFS:", error);
  }
};

export default pinJSONToIPFS;
