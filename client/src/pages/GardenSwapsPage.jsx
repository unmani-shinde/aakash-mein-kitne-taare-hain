import NavigationBar from "../components/NavigationBar";
import ToBTCComponent from "../components/toBTCComponent";
import ToWBTCComponent from "../components/toWBTCComponent";

export default function GardenSwaps() {

    return(
        <>
            <NavigationBar/>
            <div className="w-full pt-4 flex flex-col text-center items-center justify-center">
                <h1 className="pb-4 text-4xl font-bold text-center">Participate with Bitcoin, is that Possible?</h1>
                <p className="py-4 text-lg">Say no more! We let the <b>Garden Finance SDK</b> take care of that for you. Use your Bitcoin as Wrapped Bitcoin on Arbitrum and participate in Gossip Networks and Matching Algorithms easily!</p>
            </div>

            <div className="flex w-full flex-col lg:flex-row">
                <div className="card bg-base-300 rounded-box grid h-64 flex-grow place-items-center">
                    Swap BTC to wBTC
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                            <button className="mt-4 mb-4 btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>PROCEED</button>
                            <dialog id="my_modal_1" className="modal">
  <div className="modal-box" style={{ maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
    <h3 className="font-bold text-lg">Hello!</h3>
    <p className="py-4">Press ESC key or click the button below to close</p>
    <div className="modal-action" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <ToWBTCComponent />
      <form method="dialog" className="mt-4">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>


                    
                    
                    </div>
                <div className="divider lg:divider-horizontal">OR</div>
                <div className="card bg-base-300 rounded-box grid h-64 flex-grow place-items-center">Swap wBTC to BTC
                <button className="mt-4 mb-4 btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>PROCEED</button>
                            <dialog id="my_modal_5" className="modal">
                            <div className="modal-box" style={{ maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto', padding: '20px' }}>
                                <h3 className="font-bold text-lg">Hello!</h3>
                                <p className="py-4">Press ESC key or click the button below to close</p>
                                <div className="modal-action" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <ToBTCComponent/>
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                                </div>
                            </div>
</dialog>
                    


                </div>
            </div>
    
        </>
    )
    
}