//import React, { useState } from 'react';

import { ConnectKitButton } from "connectkit";
import { useAccount } from "wagmi";

export default function NavigationBar() {

    const {isConnected} = useAccount();


//   const [isDrawerOpen, setDrawerOpen] = useState(false);

//   const toggleDrawer = () => {
//     setDrawerOpen(!isDrawerOpen);
//   };

  return (
    <div className="drawer">
  <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col">
    {/* Navbar */}
    <div className="navbar bg-base-100 w-full">
      <div className="flex-none lg:hidden">
        <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </label>
      </div>
      <div className="mx-2 flex-1 px-2"><a href="/" className="btn btn-ghost text-2xl">Oracular Protocol✨</a></div>
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal">
          {/* Navbar menu content here */}
          {!isConnected && <li><ConnectKitButton/></li>}
          {isConnected && (<>
            <li className="font-semibold text-md"><a href="/mint-a-fortune-cookie">Mint A Fortune Cookie</a></li>
            <li className="font-semibold text-md"><a>The Gossip Network</a></li>
            <li className="font-semibold text-md"><a>Find My Match</a></li>
          </>)}
         
        </ul>
      </div>
    </div>
  </div>
  <div className="drawer-side z-50">
    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 min-h-full w-80 p-12">
      {/* Sidebar content here */}
      <li className="mb-4"><ConnectKitButton/></li>
      <li className="font-semibold text-lg pb-10"><a href="/mint-a-fortune-cookie">Mint A Fortune Cookie »</a></li>
            <li className="font-semibold text-lg pb-10"><a>The Gossip Network »</a></li>
            <li className="font-semibold text-lg pb-10"><a>Find My Match »</a></li>
    </ul>
  </div>
</div>
    // <>
    //   <div className="navbar bg-base-100">
    //     <div className="flex-none">
    //       <button className="btn btn-square btn-ghost" onClick={toggleDrawer}>
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           className="inline-block h-5 w-5 stroke-current">
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M4 6h16M4 12h16M4 18h16"></path>
    //         </svg>
    //       </button>
    //     </div>
    //     <div className="flex-1">
    //       <a className="btn btn-ghost text-xl">Oracular Protocol</a>
    //     </div>
    //     <div className="flex-none">
    //       <button className="btn btn-square btn-ghost">
    //         <svg
    //           xmlns="http://www.w3.org/2000/svg"
    //           fill="none"
    //           viewBox="0 0 24 24"
    //           className="inline-block h-5 w-5 stroke-current">
    //           <path
    //             strokeLinecap="round"
    //             strokeLinejoin="round"
    //             strokeWidth="2"
    //             d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
    //         </svg>
    //       </button>
    //     </div>
    //   </div>

    //   <div className={`drawer ${isDrawerOpen ? 'drawer-open' : ''}`}>
    //     <div className="drawer-content">
    //       {/* Page content here */}
    //     </div>
    //     <div className="drawer-side">
    //       <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay" onClick={toggleDrawer}></label>
    //       <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
    //         {/* Sidebar content here */}
    //         <li><a>Sidebar Item 1</a></li>
    //         <li><a>Sidebar Item 2</a></li>
    //       </ul>
    //     </div>
    //   </div>
    // </>
  );
}
