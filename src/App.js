import "./App.css";
import React, { useEffect, useState } from "react";
import WalletConnect from "./Components/WalletConnect";
import TokenBalances from "./Components/TokenBalances";
import MintBurnTokens from "./Components/MintBurnTokens";
import CSAMMInfo from "./Components/CSAMMInfo";
import { addLiquidity, swap, removeLiquidity } from "./Components/AMMFunctions";
import { TOKEN0_ADDRESS, TOKEN1_ADDRESS, ERC20_ABI, CSAMM_ADDRESS, CSAMM_ABI, } from "./config";
const { ethers } = require("ethers");

function App() {
  const [signer, setSigner] = useState(null);
  const [amount0, setAmount0] = useState("");
  const [amount1, setAmount1] = useState("");
  const [swapAmount, setSwapAmount] = useState("");
  const [shares, setShares] = useState("");
  const [token0Balance, setToken0Balance] = useState("");
  const [token1Balance, setToken1Balance] = useState("");
  const [reserve0, setReserve0] = useState(null);
  const [reserve1, setReserve1] = useState(null);
  const [totalSupply, setTotalSupply] = useState(null);

  const handleAddLiquidity = async () => {
    await addLiquidity(signer, amount0, amount1, fetchCSAMMInfo);
    setAmount0("");
    setAmount1("");
  };

  const handleSwap = async (tokenAddress) => {
    await swap(signer, tokenAddress, swapAmount, fetchBalances, fetchCSAMMInfo);
    setSwapAmount("")
  };

  const handleRemoveLiquidity = async () => {
    await removeLiquidity(signer, shares, fetchCSAMMInfo);
    setShares("")
  };

  const fetchBalances = async () => {
    if (signer) {
      const token0 = new ethers.Contract(TOKEN0_ADDRESS, ERC20_ABI, signer);
      const token1 = new ethers.Contract(TOKEN1_ADDRESS, ERC20_ABI, signer);
      const userAddress = await signer.getAddress();
      const balance0 = await token0.balanceOf(userAddress);
      const balance1 = await token1.balanceOf(userAddress);

      const formattedBalance0 = ethers.utils.formatUnits(balance0, 18);
      const formattedBalance1 = ethers.utils.formatUnits(balance1, 18);

      setToken0Balance(parseFloat(formattedBalance0).toFixed(18));
      setToken1Balance(parseFloat(formattedBalance1).toFixed(18));
    }
  };

  const fetchCSAMMInfo = async () => {
    const csamm = new ethers.Contract(CSAMM_ADDRESS, CSAMM_ABI, signer);

    const res0 = await csamm.reserve0();
    const res1 = await csamm.reserve1();
    const totalSupply = await csamm.totalSupply();

    const formattedReserve0 = ethers.utils.formatUnits(res0, 18);
    const formattedReserve1 = ethers.utils.formatUnits(res1, 18);
    const formattedTotalSupply = ethers.utils.formatUnits(totalSupply, 18);

    setReserve0(parseFloat(formattedReserve0).toFixed(18));
    setReserve1(parseFloat(formattedReserve1).toFixed(18));
    setTotalSupply(parseFloat(formattedTotalSupply).toFixed(18));
  };

  useEffect(() => {
    fetchBalances();
    fetchCSAMMInfo();
  }, [signer, token0Balance, token1Balance, reserve0, reserve1]);

  return (
    <div className="container">
      <WalletConnect setSigner={setSigner} />
      {signer && (
        <>
          <TokenBalances
            token0Balance={token0Balance}
            token1Balance={token1Balance}
          />
          <MintBurnTokens signer={signer} fetchBalances={fetchBalances} />
          <CSAMMInfo reserve0={reserve0} reserve1={reserve1} totalSupply={totalSupply} fetchCSAMMInfo={fetchCSAMMInfo} />
          <div className="add-liquidity">
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
          <div className="swap">
            <h2>Swap</h2>
            <input
              type="text"
              placeholder="Swap Amount"
              value={swapAmount}
              onChange={(e) => setSwapAmount(e.target.value)}
            />
            <button onClick={() => handleSwap(TOKEN0_ADDRESS)}>
              Swap Token0
            </button>
            <button onClick={() => handleSwap(TOKEN1_ADDRESS)}>
              Swap Token1
            </button>
          </div>
          <div className="remove-liquidity">
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
