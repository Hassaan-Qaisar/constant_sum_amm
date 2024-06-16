import { ethers } from "ethers";
import {
  CSAMM_ADDRESS,
  CSAMM_ABI,
  ERC20_ABI,
  TOKEN0_ADDRESS,
  TOKEN1_ADDRESS,
} from "../config";

export const addLiquidity = async (
  signer,
  amount0,
  amount1,
  fetchCSAMMInfo
) => {
  try {
    const csammContract = new ethers.Contract(CSAMM_ADDRESS, CSAMM_ABI, signer);
    const token0 = new ethers.Contract(TOKEN0_ADDRESS, ERC20_ABI, signer);
    const token1 = new ethers.Contract(TOKEN1_ADDRESS, ERC20_ABI, signer);

    await token0.approve(CSAMM_ADDRESS, amount0);
    await token1.approve(CSAMM_ADDRESS, amount1);

    const tx = await csammContract.addLiquidity(amount0, amount1);

    const receipt = await tx.wait();
    if (receipt.status === 1) {
      alert("Liquidity Added successfully");
      console.log("liquidity added success");
      fetchCSAMMInfo();
    } else {
      alert("Transaction failed");
      console.log("liquidity added failed");
    }
  } catch (error) {
    console.error("Liquidity added failed", error);
    console.log("liquidity added error");
    alert(`Liquidity added failed: ${error.message}`);
  }
};

export const swap = async (
  signer,
  tokenInAddress,
  amountIn,
  fetchBalances,
  fetchCSAMMInfo
) => {
  try {
    const csammContract = new ethers.Contract(CSAMM_ADDRESS, CSAMM_ABI, signer);
    const token = new ethers.Contract(tokenInAddress, ERC20_ABI, signer);

    await token.approve(CSAMM_ADDRESS, amountIn);
    const tx = await csammContract.swap(tokenInAddress, amountIn);
    const receipt = await tx.wait();

    if (receipt.status === 1) {
      alert("Swapped successfully");
      console.log("swap success");
      fetchBalances();
      fetchCSAMMInfo();
    } else {
      alert("Transaction failed");
      console.log("swap failed");
    }
  } catch (error) {
    console.error("swap failed", error);
    console.log("swap error");
    alert(`Swap failed: ${error.message}`);
  }
};

export const removeLiquidity = async (signer, shares, fetchCSAMMInfo) => {
  try {
    const csammContract = new ethers.Contract(CSAMM_ADDRESS, CSAMM_ABI, signer);
    const tx = await csammContract.removeLiquidity(shares);

    const receipt = await tx.wait();

    if (receipt.status === 1) {
      alert("Liquidity Removed successfully");
      console.log("liquidity remove success");
      fetchCSAMMInfo();
    } else {
      alert("Transaction failed");
      console.log("liquidity remove failed");
    }
  } catch (error) {
    console.error("Liquidity remove failed", error);
    console.log("liquidity remove error");
    alert(`Liquidity remove failed: ${error.message}`);
  }
};
