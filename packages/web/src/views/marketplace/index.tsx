import React, { useEffect, useState } from 'react';
import { ArtCard } from '../../components/ArtCard';
import { Layout, Row, Col, Tabs } from 'antd';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { useCreatorArts, useUserArts } from '../../hooks';
import { useMeta } from '../../contexts';
import { CardLoader } from '../../components/MyLoader';
import { useWallet } from '@solana/wallet-adapter-react';
import Footer from "../../components/ACKCS/Footers/Footer.js";
import Sidebar from "./Sidebar.js";

const { TabPane } = Tabs;

const { Content } = Layout;

export enum ArtworkViewState {
  Metaplex = '0',
  Owned = '1',
  Created = '2',
}

export const MarketplaceView = () => {
  const { connected, publicKey } = useWallet();
  const ownedMetadata = useUserArts();
  const createdMetadata = useCreatorArts(publicKey?.toBase58() || '');
  const { metadata, isLoading, pullAllMetadata, storeIndexer } = useMeta();
  const [activeKey, setActiveKey] = useState(ArtworkViewState.Metaplex);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const items =
    activeKey === ArtworkViewState.Owned
      ? ownedMetadata.map(m => m.metadata)
      : activeKey === ArtworkViewState.Created
      ? createdMetadata
      : metadata;

  useEffect(() => {
    if (connected) {
      // setActiveKey(ArtworkViewState.Owned);
    } else {
      setActiveKey(ArtworkViewState.Metaplex);
    }
  }, [connected, setActiveKey]);

  const artworkGrid = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {!isLoading
        ? items.map((m, idx) => {
            const id = m.pubkey;
            return (
              <Link to={`/art/${id}`} key={idx}>
                <ArtCard
                  key={id}
                  pubkey={m.pubkey}
                  preview={false}
                  height={250}
                  width={250}
                />
              </Link>
            );
          })
        : [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
    </Masonry>
  );

  return (
    <>
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
        <section className="relative py-2 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <Sidebar />
                <div className="absolute md:ml-64">
                    {/* <Dropdown /> bg-blueGray-100*/}
                    <div className="nftlist flex flex-wrap px-3 py-3">
                      {!isLoading
                        ? items.map((m, idx) => {
                            const id = m.pubkey;
                            return (
                              <Link to={`/art/${id}`} key={idx} className="px-2 py-2">
                                <ArtCard
                                  key={id}
                                  pubkey={m.pubkey}
                                  preview={false}
                                  height={150}
                                  width={150}
                                />
                              </Link>
                            );
                          })
                        : [...Array(7)].map((_, idx) => <CardLoader key={idx} />)}
                    </div>
                </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};
