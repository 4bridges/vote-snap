import Web3 from 'web3';
import { abi } from '../../../../../contracts/build/contracts/VoteBuilder.json';
import { voteContractAddress } from '../config';
console.log('wwe: ',voteContractAddress);

let web3;

if (typeof window !== 'undefined') web3 = new Web3(window.ethereum);
else web3 = new Web3();

export const voteContract = new web3.eth.Contract(abi, voteContractAddress);
