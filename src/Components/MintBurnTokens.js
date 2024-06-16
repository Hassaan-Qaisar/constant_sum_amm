import React, { useState } from "react";
import { TOKEN0_ADDRESS, TOKEN1_ADDRESS, ERC20_ABI } from "../config";

const { ethers } = require("ethers");

const MintBurnTokens = ({ signer, fetchBalances }) => {
  const [mintAmount, setMintAmount] = useState("");
  const [burnAmount, setBurnAmount] = useState("");

  const mintTokens = async (tokenAddress) => {
    try {
      const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
      const tx = await token.mint(mintAmount);

      const receipt = await tx.wait();
      if (receipt.status === 1) {
        alert("Tokens minted successfully");
        console.log("mint success")
        fetchBalances(); 
        setMintAmount("");
      } else {
        alert("Transaction failed");
        console.log("mint failed")
      }
    } catch (error) {
      console.error("Minting failed", error);
      console.log("mint error")
      alert(`Minting failed: ${error.message}`);
    }
  };

  const burnTokens = async (tokenAddress) => {
    try {
    const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    const tx = await token.burn(burnAmount);

    const receipt = await tx.wait();
    if (receipt.status === 1) {
      alert('Tokens burned successfully');
      console.log("burn success")
      fetchBalances(); 
      setBurnAmount("");
    } else {
      alert('Transaction failed');
      console.log("burn failed")
    }
  } catch (error) {
    console.error("Burning failed", error);
    alert(`Burning failed: ${error.message}`);
  }
  };

  return (
    <div>
      <h2>Mint/Burn Tokens</h2>
      <div>
        <h3>Mint Tokens</h3>
        <input
          type="text"
          placeholder="Amount to Mint"
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
        />
        <button onClick={() => mintTokens(TOKEN0_ADDRESS)}>Mint Token0</button>
        <button onClick={() => mintTokens(TOKEN1_ADDRESS)}>Mint Token1</button>
      </div>
      <div>
        <h3>Burn Tokens</h3>
        <input
          type="text"
          placeholder="Amount to Burn"
          value={burnAmount}
          onChange={(e) => setBurnAmount(e.target.value)}
        />
        <button onClick={() => burnTokens(TOKEN0_ADDRESS)}>Burn Token0</button>
        <button onClick={() => burnTokens(TOKEN1_ADDRESS)}>Burn Token1</button>
      </div>
    </div>
  );
};

export default MintBurnTokens;
