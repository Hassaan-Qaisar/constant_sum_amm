import React, { useState } from 'react';
import { TOKEN0_ADDRESS, TOKEN1_ADDRESS, ERC20_ABI } from '../config';

const { ethers } = require("ethers");

const MintBurnTokens = ({ signer }) => {
  const [mintAmount, setMintAmount] = useState('');
  const [burnAmount, setBurnAmount] = useState('');

  const mintTokens = async (tokenAddress) => {
    const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    // const tx = await token.mint(ethers.parseUnits(mintAmount, 18));
    const tx = await token.mint(mintAmount);
    await tx.wait();
    alert('Tokens minted successfully');
  };

  const burnTokens = async (tokenAddress) => {
    const token = new ethers.Contract(tokenAddress, ERC20_ABI, signer);
    // const tx = await token.burn(ethers.parseUnits(burnAmount, 18));
    const tx = await token.burn(burnAmount);
    await tx.wait();
    alert('Tokens burned successfully');
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
