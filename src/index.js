import React from 'react';
import ReactDOM from 'react-dom/client';
import * as fcl from "@onflow/fcl"
import App from './App';
import { BrowserRouter, HashRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import '@fontsource/roboto/300.css';

fcl.config({
  "accessNode.api": process.env.REACT_APP_FCL_ENDPOINT,
  "challenge.handshake": "https://flow-wallet-testnet.blocto.app/authn",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "app.detail.title": "Test App",
  "app.detail.icon": "https://placekitten.com/g/200/200",
  "0xNonFungibleToken": process.env.REACT_APP_NFT_ADDRESS,
  "0xFuzzlePieceV2": process.env.REACT_APP_FUZZLE_ADDRESS,
  "0xMetadataViews": process.env.REACT_APP_METADATA_ADDRESS,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter><App /></HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
