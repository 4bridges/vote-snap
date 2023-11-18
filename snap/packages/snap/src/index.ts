import type {
  OnRpcRequestHandler,
  OnCronjobHandler,
} from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';
import * as ethers from 'ethers';
import VoteBuilder from '../../../../contracts/build/contracts/VoteBuilder.json';

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
const provider = new ethers.providers.JsonRpcProvider(
  'https://sepolia.infura.io/v3/a80f928d9a7940779f24bd95f48b3e05',
);

const contract = new ethers.Contract(
  '0x335d0fC0E2fe8C59e86F42Dc35b0B92edeB7ac3d',
  VoteBuilder.abi,
  provider,
);

export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'hello':
      const result = snap.request({
        method: 'snap_dialog',
        params: {
          type: 'confirmation',
          content: panel([
            text(`Hello, **${origin}**!`),
            text('This custom confirmation is just for display purposes.'),
            text(
              'But you can edit the snap source code to make it do something, if you want to!',
            ),
          ]),
        },
      });

      return result;
    default:
      throw new Error('Method not found.');
  }
};

export const onCronjob: OnCronjobHandler = async ({ request }) => {
  switch (request.method) {
    case 'exampleMethodOne':
      return snap.request({
        method: 'snap_notify',
        params: {
          type: 'inApp',
          message: `Hello, world!`,
        },
      });

    default:
      throw new Error('Snap: Method not found.');
  }
};
