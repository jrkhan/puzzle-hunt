import React from 'react';
import ReactDOM from 'react-dom/client';
import * as fcl from "@onflow/fcl"
import App from './App';
import { HashRouter } from "react-router-dom";
import reportWebVitals from './reportWebVitals';
import '@fontsource/nunito'

fcl.config({
  "flow.network": "testnet",
  "accessNode.api": process.env.REACT_APP_FCL_ENDPOINT,
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
  "app.detail.title": "Puzzle Alley",
  "app.detail.icon": "https://storage.googleapis.com/flow-puzzle-hunt/pa-logo.png",
  "0xNonFungibleToken": process.env.REACT_APP_NFT_ADDRESS,
  "0xFuzzlePieceV2": process.env.REACT_APP_FUZZLE_ADDRESS,
  "0xMetadataViews": process.env.REACT_APP_METADATA_ADDRESS,
  "service.OpenID.scopes": "email"
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
