import React from 'react';

const CSAMMInfo = ({ reserve0, reserve1, totalSupply }) => {

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
