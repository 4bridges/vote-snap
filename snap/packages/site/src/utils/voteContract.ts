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

const loadContract = async () => {
  try {
    const questionTitle = 'What is your favorite color?';

    // Example: Call createVote function
    // const txCreateVote = await contract.createVote(questionTitle);
    // await txCreateVote.wait(); // Wait for the transaction to be mined

    const createVote = async (questionTitle: string) => {
      try {
        const accounts = await provider.listAccounts();
        const txCreateVote = await voteContract
          .createVote(questionTitle)
          .send({ from: accounts[0] });
        await txCreateVote.wait();
        console.log('Vote created successfully');
      } catch (error) {
        console.error('Error creating vote:', error);
      }
    };

    const submitVote = async (questionId: string, option: string) => {
      try {
        const accounts = await provider.listAccounts();
        const txSubmitVote = await voteContract.submitVote(questionId, option);
        await txSubmitVote.wait();
        console.log('Vote submitted successfully');
      } catch (error) {
        console.error('Error submitted vote:', error);
      }
    };

    const getResult = async (questionId: string, option: string) => {
      try {
        const accounts = await provider.listAccounts();
        const txResultVote = await voteContract.getResult(questionId, option);
        await txResultVote.wait();
        console.log(
          `Result for ${option} in question ${questionId}:`,
          txResultVote,
        );

        console.log('Vote submitted successfully');
      } catch (error) {
        console.error('Error submitted vote:', error);
      }
    };
  } catch (error) {
    console.error('Error interacting with contract:', error);
  }
};
