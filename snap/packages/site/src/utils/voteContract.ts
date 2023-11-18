import { ethers } from 'ethers';
import VoteFactory from '../../../../../contracts/build/contracts/VoteFactory.json'; 
import { voteContractAddress } from '../config/snap';

//@ts-ignore
export const provider = new ethers.providers.Web3Provider(window.ethereum);

export const signer = provider.getSigner(); 
export const voteContract = new ethers.Contract(
  voteContractAddress,
  VoteFactory.abi,
  signer,
);