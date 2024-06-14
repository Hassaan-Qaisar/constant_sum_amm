import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { CSAMM_ADDRESS, CSAMM_ABI } from '../config'; // Adjust the import path as needed

const CSAMMInfo = ({ signer }) => {
  const [reserve0, setReserve0] = useState(null);
  const [reserve1, setReserve1] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);

  useEffect(() => {
    if (signer) {
      const fetchCSAMMInfo = async () => {
        const csamm = new ethers.Contract(CSAMM_ADDRESS, CSAMM_ABI, signer);

        const res0 = await csamm.reserve0();
        const res1 = await csamm.reserve1();
        const totalSupply = await csamm.totalSupply();

        // Convert from smallest unit (wei) to readable format (tokens)
        const formattedReserve0 = ethers.formatUnits(res0, 18);
        const formattedReserve1 = ethers.formatUnits(res1, 18);
        const formattedTotalSupply = ethers.formatUnits(totalSupply, 18);

        setReserve0(parseFloat(formattedReserve0).toFixed(18));
        setReserve1(parseFloat(formattedReserve1).toFixed(18));
        setTotalSupply(parseFloat(formattedTotalSupply).toFixed(18));
      };
      fetchCSAMMInfo();
    }
  }, [signer]);

  return (
    <div>
      <h3>CSAMM Info</h3>
      <p>Reserve 0: {reserve0}</p>
      <p>Reserve 1: {reserve1}</p>
      <p>Total Supply: {totalSupply}</p>
      <p>Note: There is a 5% transaction fee on swap functions.</p>
    </div>
  );
};

export default CSAMMInfo;
