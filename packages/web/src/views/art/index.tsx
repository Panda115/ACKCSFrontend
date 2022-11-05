import React, { useState } from 'react';
import {
  Row,
  Col,
  Divider,
  Layout,
  Tag,
  Button,
  Skeleton,
  List,
  Card,
} from 'antd';
import { useParams } from 'react-router-dom';
import { useArt, useExtendedArt } from '../../hooks';

import { ArtContent } from '../../components/ArtContent';
import { shortenAddress, useConnection, useUserAccounts } from '@oyster/common';
import { useWallet } from '@solana/wallet-adapter-react';
import { MetaAvatar } from '../../components/MetaAvatar';
import { sendSignMetadata } from '../../actions/sendSignMetadata';
import { ViewOn } from '../../components/ViewOn';
import { ArtType } from '../../types';
import { ArtMinting } from '../../components/ArtMinting';
import Footer from "../../components/ACKCS/Footers/Footer.js";
import { Link } from 'react-router-dom';

const { Content } = Layout;

export const ArtView = () => {
  const { id } = useParams<{ id: string }>();
  const wallet = useWallet();
  const [remountArtMinting, setRemountArtMinting] = useState(0);

  const connection = useConnection();
  const art = useArt(id);
  let badge = '';
  let maxSupply = '';
  if (art.type === ArtType.NFT) {
    badge = 'Unique';
  } else if (art.type === ArtType.Master) {
    badge = 'NFT 0';
    if (art.maxSupply !== undefined) {
      maxSupply = art.maxSupply.toString();
    } else {
      maxSupply = 'Unlimited';
    }
  } else if (art.type === ArtType.Print) {
    badge = `${art.edition} of ${art.supply}`;
  }
  const { ref, data } = useExtendedArt(id);

  // const { userAccounts } = useUserAccounts();

  // const accountByMint = userAccounts.reduce((prev, acc) => {
  //   prev.set(acc.info.mint.toBase58(), acc);
  //   return prev;
  // }, new Map<string, TokenAccount>());

  const description = data?.description;
  const attributes = data?.attributes;

  const pubkey = wallet?.publicKey?.toBase58() || '';

  const tag = (
    <div className="info-header">
      <Tag color="blue">UNVERIFIED</Tag>
    </div>
  );

  const unverified = (
    <>
      {tag}
      <div style={{ fontSize: 12 }}>
        <i>
          This artwork is still missing verification from{' '}
          {art.creators?.filter(c => !c.verified).length} contributors before it
          can be considered verified and sellable on the platform.
        </i>
      </div>
      <br />
    </>
  );

  const { accountByMint } = useUserAccounts();
  const artMintTokenAccount = accountByMint.get(art.mint!);
  const isArtOwnedByUser =
    ((accountByMint.has(art.mint!) &&
      artMintTokenAccount?.info.amount.toNumber()) ||
      0) > 0;

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
        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <div className="container mx-auto px-4 mt-10 mb-8">
                    <div className="flex flex-wrap">
                        <Content>
                          <Col>
                            <Row ref={ref}>
                              <Col
                                xs={{ span: 24 }}
                                md={{ span: 12 }}
                                style={{ paddingRight: '30px' }}
                              >
                                <ArtContent
                                  style={{ width: '100%', height: 'auto', margin: '0 auto' }}
                                  height={300}
                                  width={300}
                                  className="artwork-image"
                                  pubkey={id}
                                  active={true}
                                  allowMeshRender={true}
                                  artView={true}
                                />
                              </Col>
                              {/* <Divider /> */}
                              <Col
                                xs={{ span: 24 }}
                                md={{ span: 12 }}
                                style={{ textAlign: 'left', fontSize: '1.4rem' }}
                              >
                                <Row>
                                  <div style={{ fontWeight: 700, fontSize: '2rem' }}>
                                    {art.title || <Skeleton paragraph={{ rows: 0 }} />}
                                  </div>
                                </Row>
                                {/* <Row>
                                  <Col span={6}>
                                    <h6>Royalties</h6>
                                    <div className="royalties">
                                      {((art.seller_fee_basis_points || 0) / 100).toFixed(2)}%
                                    </div>
                                  </Col>
                                  <Col span={12}>
                                    <ViewOn id={id} />
                                  </Col>
                                </Row> */}
                                <Row>
                                  <Col>
                                    <h6 style={{ marginTop: 5 }}>Created By</h6>
                                    <div className="creators">
                                      {(art.creators || []).map((creator, idx) => {
                                        return (
                                          <div
                                            key={idx}
                                            style={{
                                              display: 'flex',
                                              alignItems: 'center',
                                              marginBottom: 5,
                                            }}
                                          >
                                            <MetaAvatar creators={[creator]} size={30} />
                                            <div>
                                              <span className="creator-name">
                                                {creator.name ||
                                                  shortenAddress(creator.address || '')}
                                              </span>
                                              <div style={{ marginLeft: 10 }}>
                                                {!creator.verified &&
                                                  (creator.address === pubkey ? (
                                                    <Button
                                                      onClick={async () => {
                                                        try {
                                                          await sendSignMetadata(
                                                            connection,
                                                            wallet,
                                                            id,
                                                          );
                                                        } catch (e) {
                                                          console.error(e);
                                                          return false;
                                                        }
                                                        return true;
                                                      }}
                                                    >
                                                      Approve
                                                    </Button>
                                                  ) : (
                                                    tag
                                                  ))}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </Col>
                                </Row>
                                {/* <Row>
                                  <Col>
                                    <h6 style={{ marginTop: 5 }}>Edition</h6>
                                    <div className="art-edition">{badge}</div>
                                  </Col>
                                </Row>
                                {art.type === ArtType.Master && (
                                  <Row>
                                    <Col>
                                      <h6 style={{ marginTop: 5 }}>Max Supply</h6>
                                      <div className="art-edition">{maxSupply}</div>
                                    </Col>
                                  </Row>
                                )} */}
                                {/* <Button
                                      onClick={async () => {
                                        if(!art.mint) {
                                          return;
                                        }
                                        const mint = new PublicKey(art.mint);

                                        const account = accountByMint.get(art.mint);
                                        if(!account) {
                                          return;
                                        }

                                        const owner = wallet.publicKey;

                                        if(!owner) {
                                          return;
                                        }
                                        const instructions: any[] = [];
                                        await updateMetadata(undefined, undefined, true, mint, owner, instructions)

                                        sendTransaction(connection, wallet, instructions, [], true);
                                      }}
                                    >
                                      Mark as Sold
                                    </Button> */}

                                {/* TODO: Add conversion of MasterEditionV1 to MasterEditionV2 */}
                                {/* <ArtMinting
                                  id={id}
                                  key={remountArtMinting}
                                  onMint={async () => await setRemountArtMinting(prev => prev + 1)}
                                /> */}
                                {
                                  isArtOwnedByUser && (
                                    <Link to={`/auction/create/0`}>
                                      <button className="bg-lightBlue-500 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                        Sell
                                      </button>
                                    </Link>
                                  )
                                }
                                <Row>
                                  <Col span={11}>
                                  </Col>
                                  <Col span={2}>
                                  </Col>
                                  <Col span={11}>
                                  </Col>
                                </Row>
                              </Col>
                              <Col span="12">
                                <Divider />
                                {art.creators?.find(c => !c.verified) && unverified}
                                <br />
                                <div className="info-header">Description</div>
                                <div className="info-content">{description}</div>
                                <br />
                                {/*
                                  TODO: add info about artist
                                <div className="info-header">ABOUT THE CREATOR</div>
                                <div className="info-content">{art.about}</div> */}
                              </Col>
                              {/* <Col span="12">
                                {attributes && (
                                  <>
                                    <Divider />
                                    <br />
                                    <div className="info-header">Attributes</div>
                                    <List size="large" grid={{ column: 4 }}>
                                      {attributes.map(attribute => (
                                        <List.Item key={attribute.trait_type}>
                                          <Card title={attribute.trait_type}>
                                            {attribute.value}
                                          </Card>
                                        </List.Item>
                                      ))}
                                    </List>
                                  </>
                                )}
                              </Col> */}
                            </Row>
                          </Col>
                        </Content>

                        {/* <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                            <img
                            alt="..."
                            className="max-w-full rounded-lg shadow-lg"
                            src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                            />
                        </div>
                        <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                            <div className="md:pr-12">
                                <button className="bg-lightBlue-500 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                    Make Offer
                                </button>
                                <button className="bg-lightBlue-500 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                    Buy NFT
                                </button>
                            </div>
                            <div className="md:pr-12">
                                <button className="bg-lightBlue-500 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                    Sell
                                </button>
                                <button className="bg-lightBlue-500 text-white active:bg-blueGray-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">
                                    Edit
                                </button>
                            </div>
                        </div> */}
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
