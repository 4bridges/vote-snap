import { ethers } from 'ethers';
import VoteBuilderContractABI from '../../../../../contracts/build/contracts/VoteBuilder.json'; // Import the ABI from the compiled contract
import { voteContractAddress } from '../config/snap'; // Import the contract address
import { JsonRpcProviderAddress } from '../config/snap';

console.log('Vote contract address: ', voteContractAddress);

const loadContract = async () => {
    try {
        const provider = new ethers.providers.JsonRpcProvider(JsonRpcProviderAddress);
        // Or use your preferred Ethereum node URL

        const signer = provider.getSigner(); // Replace with your signer if necessary
        const contract = new ethers.Contract(voteContractAddress, VoteBuilderContractABI.abi, signer);

        const questionTitle = "What is your favorite color?";
        
        // Example: Call createVote function
        // const txCreateVote = await contract.createVote(questionTitle);
        // await txCreateVote.wait(); // Wait for the transaction to be mined


        const createVote = async (questionTitle : string) => {
            try {
                const accounts = await provider.listAccounts();
                const txCreateVote = await contract.createVote(questionTitle).send({ from: accounts[0] });
                await txCreateVote.wait();
                console.log('Vote created successfully');
            } catch (error) {
                console.error('Error creating vote:', error);
            }
        };

        const submitVote = async (questionId : string, option : string) => {
            try {
                const accounts = await provider.listAccounts();
                const txSubmitVote = await contract.submitVote(questionId, option);
                await txSubmitVote.wait(); 
                console.log('Vote submitted successfully');
            } catch (error) {
                console.error('Error submitted vote:', error);
            }
        };

        const getResult = async (questionId : string, option : string) => {
            try {
                const accounts = await provider.listAccounts();
                const txResultVote = await contract.getResult(questionId, option);
                await txResultVote.wait(); 
                console.log(`Result for ${option} in question ${questionId}:`, txResultVote);
        
                console.log('Vote submitted successfully');
            } catch (error) {
                console.error('Error submitted vote:', error);
            }
        };
        

        
        
    } catch (error) {
        console.error('Error interacting with contract:', error);
    }
};

loadContract();
