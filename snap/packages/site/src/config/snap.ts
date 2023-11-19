/**
 * The snap origin to use.
 * Will default to the local hosted snap if no value is provided in environment.
 *
 * You may be tempted to change this to the URL where your production snap is hosted, but please
 * don't. Instead, rename `.env.production.dist` to `.env.production` and set the production URL
 * there. Running `yarn build` will automatically use the production environment variables.
 */
export const defaultSnapOrigin =
  // eslint-disable-next-line no-restricted-globals
  process.env.SNAP_ORIGIN ?? `local:http://localhost:8080`;

  export const voteContractAddress = '0xEd1943131991C0ca3f7f2B43381cc5547A18Ad25'
  export const JsonRpcProviderAddress = 'https://sepolia.infura.io/v3/a80f928d9a7940779f24bd95f48b3e05';

