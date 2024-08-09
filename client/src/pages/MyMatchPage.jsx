import MatchMe from "../components/MatchMe";
import NavigationBar from "../components/NavigationBar";

export default function FindMyMatchPage(){

    return(

        <>
    <NavigationBar/>
    <div className="h-72 flex-grow grid place-content-center items-center">
    <h1 className="pb-4 text-5xl font-bold text-center">Our Users: Match Me If You Can!</h1>
    <p className="mb-4 text-lg">Meanwhile us, Barney Stinson style: Challenge Accepted!</p>
    <MatchMe/>
        
    </div>
    
    </>




    )

    
    
}<p className="text-center">Loading Matches...</p>