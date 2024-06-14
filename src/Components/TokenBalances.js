// TokenBalances.js
import React, { useEffect, useState } from 'react';
import { TOKEN0_ADDRESS, TOKEN1_ADDRESS, ERC20_ABI } from '../config';
const { ethers } = require("ethers");

const TokenBalances = ({ signer }) => {
  const [token0Balance, setToken0Balance] = useState("");
  const [token1Balance, setToken1Balance] = useState(0);

  useEffect(() => {
    if (signer) {
      const fetchBalances = async () => {
        const token0 = new ethers.Contract(TOKEN0_ADDRESS, ERC20_ABI, signer);
        const token1 = new ethers.Contract(TOKEN1_ADDRESS, ERC20_ABI, signer);
        const userAddress = await signer.getAddress();
        const balance0 = await token0.balanceOf(userAddress);
        const balance1 = await token1.balanceOf(userAddress);

        console.log(userAddress)

        const formattedBalance0 = ethers.formatUnits(balance0, 18);
        const formattedBalance1 = ethers.formatUnits(balance1, 18);

        setToken0Balance(parseFloat(formattedBalance0).toFixed(18));
        setToken1Balance(parseFloat(formattedBalance1).toFixed(18));
      };
      fetchBalances();
    }
  }, [signer]);

  return (
    <div>
      <h2>Your Balances</h2>
      <p>Token0: {token0Balance}</p>
      <p>Token1: {token1Balance}</p>
    </div>
  );
};

export default TokenBalances;
