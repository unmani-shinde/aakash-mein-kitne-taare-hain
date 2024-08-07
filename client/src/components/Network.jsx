import { useEffect } from "react";
import { FetchCookiesMinted } from "../query/queryForCookiesMinted";



export default function Network() {

    useEffect(() => {
        async function fetchData() {
          try {
            const response = await FetchCookiesMinted();
            console.log(response);
           
          } catch (error) {
            console.log("There was an error: ",error); 
          } 
        }
    
        fetchData();
      }, []);


    return (
      <div className="flex w-full flex-col lg:flex-row">
        <div className="card bg-base-300 rounded-box flex-grow items-center pt-8 lg:w-4/12" style={{ height:'580px', overflowY: 'auto', overflowX: 'hidden' }}>
          <p className="font-bold text-lg pb-4">My Cookies</p>
  
          <div className="card bg-base-100 w-72 shadow-xl mb-4">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
  
          <div className="card bg-base-100 w-72 shadow-xl mb-4">
            <figure>
              <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Shoes!</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="divider lg:divider-horizontal">&</div>
        
        <div className="card bg-base-300 rounded-box flex-grow pt-8 lg:w-8/12">
          <p className="font-bold text-lg">Cookies In the Network</p>
        </div>
      </div>
    );
  }
  