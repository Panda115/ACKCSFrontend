import React from "react";
import Navbar from "components/Navbars/AuthNavbar.js";
import Footer from "components/Footers/Footer.js";
import WalletButton from 'features/wallet/WalletButton'
import Sidebar from "./Sidebar.js";
import Dropdown from "./Dropdown.js";

export default function CreateAsset() {
  return (
    <>
      <Navbar transparent WalletButton={WalletButton} />
      <main className="profile-page">
        <section className="relative block h-500-px">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <Sidebar />
                <div className="absolute md:ml-64 bg-blueGray-100">
                    {/* <Dropdown /> */}
                    <div className="flex flex-wrap">
                        <div className="w-full md:w-4/12 px-4 text-center">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full my-6 shadow-lg rounded-lg">
                            <div className="px-4 py-5 flex-auto">
                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                                <i className="fas fa-award"></i>
                                </div>
                                <h6 className="text-xl font-semibold">
                                Set up your wallet
                                </h6>
                                <p className="mt-2 mb-4 text-blueGray-500">
                                Once you’ve set up your wallet of choice, connect it to
                                OpenSea by clicking the wallet icon in the top right
                                corner..
                                </p>
                            </div>
                            </div>
                        </div>
                        <div className="w-full md:w-4/12 px-4 text-center">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full my-6 shadow-lg rounded-lg">
                            <div className="px-4 py-5 flex-auto">
                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                                <i className="fas fa-award"></i>
                                </div>
                                <h6 className="text-xl font-semibold">
                                Set up your wallet
                                </h6>
                                <p className="mt-2 mb-4 text-blueGray-500">
                                Once you’ve set up your wallet of choice, connect it to
                                OpenSea by clicking the wallet icon in the top right
                                corner..
                                </p>
                            </div>
                            </div>
                        </div>
                        <div className="w-full md:w-4/12 px-4 text-center">
                            <div className="relative flex flex-col min-w-0 break-words bg-white w-full my-6 shadow-lg rounded-lg">
                            <div className="px-4 py-5 flex-auto">
                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400">
                                <i className="fas fa-award"></i>
                                </div>
                                <h6 className="text-xl font-semibold">
                                Set up your wallet
                                </h6>
                                <p className="mt-2 mb-4 text-blueGray-500">
                                Once you’ve set up your wallet of choice, connect it to
                                OpenSea by clicking the wallet icon in the top right
                                corner..
                                </p>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
