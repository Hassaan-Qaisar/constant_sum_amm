// WalletConnect.js
import React, { useState } from 'react';
// const { ethers } = require("ethers");
// import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';


const WalletConnect = ({ setSigner }) => {
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask is not installed");
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setSigner(signer);
      alert("Wallet Connected")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <button onClick={connectWallet}>Connect Wallet</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default WalletConnect;
