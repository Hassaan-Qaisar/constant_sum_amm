import React, { useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';

const WalletConnect = ({ setSigner }) => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) throw new Error("MetaMask is not installed");
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setSigner(signer);
      const userAddress = await signer.getAddress();
      setAccount(userAddress);
      alert("Wallet Connected")
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="wallet-connect">
      <button onClick={connectWallet}>Connect Wallet</button>
      {account && <p>Connected Account: {account}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default WalletConnect;
