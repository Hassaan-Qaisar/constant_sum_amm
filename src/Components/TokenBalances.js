import React from 'react';

const TokenBalances = ({ token0Balance, token1Balance }) => {

  return (
    <div>
      <h2>Your Balances</h2>
      <p>Token0: {token0Balance}</p>
      <p>Token1: {token1Balance}</p>
    </div>
  );
};

export default TokenBalances;
