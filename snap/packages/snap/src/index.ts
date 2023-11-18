import type {
  OnRpcRequestHandler,
  OnCronjobHandler,
} from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';
import * as ethers from 'ethers';
import VoteFactory from '../../../../contracts/build/contracts/VoteFactory.json';
import Vote from '../../../../contracts/build/contracts/Vote.json';
import { voteContractAddress } from './config';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
const provider = new ethers.providers.InfuraProvider(
  'sepolia',
  'a80f928d9a7940779f24bd95f48b3e05',
);

const voteFactoryContract = new ethers.Contract(
  voteContractAddress,
  VoteFactory.abi,
  provider,
);

ethereum.request({
  method: 'eth_requestAccounts',
  params: [],
});

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello':
      break;

    // default:
    //   throw new Error('Method not found.');
  }
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  try {
    switch (request.method) {
      case 'checkVote':
        const address = (await ethereum.request({
          method: 'eth_requestAccounts',
          params: [],
        })) as any[];

        const deployedVotes = await voteFactoryContract.getDeployedVotes();

        for (let i = 0; i < deployedVotes.length; i++) {
          const element = deployedVotes[i];
          const voteContract = new ethers.Contract(element, Vote.abi, provider);
          const hasVote = await voteContract.votes(address[0]);

          if (hasVote == false) {
            const title = await voteContract.title();

            snap.request({
              method: 'snap_notify',
              params: {
                type: 'inApp',
                message: title,
              },
            });
          }
        }

      default:
      // throw new Error('Snap: Method not found.');
    }
  } catch (error) {
    console.log(error);
  }
};
