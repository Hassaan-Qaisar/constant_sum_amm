import "./App.css";
import React, { useState } from "react";
import WalletConnect from "./Components/WalletConnect";
import TokenBalances from "./Components/TokenBalances";
import MintBurnTokens from "./Components/MintBurnTokens";
import { addLiquidity, swap, removeLiquidity } from "./Components/AMMFunctions";

function App() {
  const [signer, setSigner] = useState(null);
  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");
  const [swapAmount, setSwapAmount] = useState("");
  const [shares, setShares] = useState("");

  const handleAddLiquidity = async () => {
    await addLiquidity(signer, amount0, amount1);
  };

  const handleSwap = async () => {
    const tokenInAddress = "0xYourTokenInAddress"; // Set dynamically based on UI input
    await swap(signer, tokenInAddress, swapAmount);
  };

  const handleRemoveLiquidity = async () => {
    await removeLiquidity(signer, shares);
  };

  console.log(signer)

  return (
    <div>
      <WalletConnect setSigner={setSigner} />
      {signer && (
        <>
          <TokenBalances signer={signer} />
          <MintBurnTokens signer={signer} />
          <div>
            <h2>Add Liquidity</h2>
            <input
              type="text"
              placeholder="Amount0"
              value={amount0}
              onChange={(e) => setAmount0(e.target.value)}
            />
            <input
              type="text"
              placeholder="Amount1"
              value={amount1}
              onChange={(e) => setAmount1(e.target.value)}
            />
            <button onClick={handleAddLiquidity}>Add Liquidity</button>
          </div>
          <div>
            <h2>Swap</h2>
            <input
              type="text"
              placeholder="Swap Amount"
              value={swapAmount}
              onChange={(e) => setSwapAmount(e.target.value)}
            />
            <button onClick={handleSwap}>Swap</button>
          </div>
          <div>
            <h2>Remove Liquidity</h2>
            <input
              type="text"
              placeholder="Shares"
              value={shares}
              onChange={(e) => setShares(e.target.value)}
            />
            <button onClick={handleRemoveLiquidity}>Remove Liquidity</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
