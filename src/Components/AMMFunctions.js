// AMMFunctions.js
import { ethers } from 'ethers';
import { CSAMM_ADDRESS, CSAMM_ABI, ERC20_ABI, TOKEN0_ADDRESS, TOKEN1_ADDRESS } from '../config';

export const addLiquidity = async (signer, amount0, amount1) => {
  const csammContract = new ethers.Contract(CSAMM_ADDRESS, CSAMM_ABI, signer);
  const token0 = new ethers.Contract(TOKEN0_ADDRESS, ERC20_ABI, signer);
  const token1 = new ethers.Contract(TOKEN1_ADDRESS, ERC20_ABI, signer);

  await token0.approve(CSAMM_ADDRESS, amount0);
  await token1.approve(CSAMM_ADDRESS, amount1);

  const tx = await csammContract.addLiquidity(amount0, amount1);
  await tx.wait();
};

export const swap = async (signer, tokenInAddress, amountIn) => {
  const csammContract = new ethers.Contract(CSAMM_ADDRESS, CSAMM_ABI, signer);
  const token = new ethers.Contract(tokenInAddress, ERC20_ABI, signer);

  await token.approve(CSAMM_ADDRESS, amountIn);
  const tx = await csammContract.swap(tokenInAddress, amountIn);
  await tx.wait();
};

export const removeLiquidity = async (signer, shares) => {
  const csammContract = new ethers.Contract(CSAMM_ADDRESS, CSAMM_ABI, signer);
  const tx = await csammContract.removeLiquidity(shares);
  await tx.wait();
};
