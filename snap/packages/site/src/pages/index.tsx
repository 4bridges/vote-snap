import { useContext, useState, ChangeEvent, useEffect } from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';

import {
  ConnectButton,
  InstallFlaskButton,
  ReconnectButton,
  SendVoteButton,
  SendYesButton,
  SendNoButton,
  Card,
} from '../components';
import { defaultSnapOrigin } from '../config';
import { MetamaskActions, MetaMaskContext } from '../hooks';
import {
  connectSnap,
  getSnap,
  isLocalSnap,
  shouldDisplayReconnectButton,
} from '../utils';

import {
  provider,
  voteContract,
  getVoteContract,
  signer,
} from '../utils/voteContract';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  margin-top: 7.6rem;
  margin-bottom: 7.6rem;
  ${({ theme }) => theme.mediaQueries.small} {
    padding-left: 2.4rem;
    padding-right: 2.4rem;
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: auto;
  }
`;

const Heading = styled.h1`
  margin-top: 0;
  margin-bottom: 2.4rem;
  text-align: center;
`;

const Span = styled.span`
  color: ${(props) => props.theme.colors.primary?.default};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  margin-top: 0;
  margin-bottom: 0;
  ${({ theme }) => theme.mediaQueries.small} {
    font-size: ${({ theme }) => theme.fontSizes.text};
  }
`;

const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 64.8rem;
  width: 100%;
  height: 100%;
  margin-top: 1.5rem;
`;

const Notice = styled.div`
  background-color: ${({ theme }) => theme.colors.background?.alternative};
  border: 1px solid ${({ theme }) => theme.colors.border?.default};
  color: ${({ theme }) => theme.colors.text?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;

  & > * {
    margin: 0;
  }
  ${({ theme }) => theme.mediaQueries.small} {
    margin-top: 1.2rem;
    padding: 1.6rem;
  }
`;

const ErrorMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.error?.muted};
  border: 1px solid ${({ theme }) => theme.colors.error?.default};
  color: ${({ theme }) => theme.colors.error?.alternative};
  border-radius: ${({ theme }) => theme.radii.default};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
  margin-top: 2.4rem;
  max-width: 60rem;
  width: 100%;
  ${({ theme }) => theme.mediaQueries.small} {
    padding: 1.6rem;
    margin-bottom: 1.2rem;
    margin-top: 1.2rem;
    max-width: 100%;
  }
`;

const Input = styled.input`
  display: flex;
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  font-size: ${(props) => props.theme.fontSizes.small};
  border-radius: ${(props) => props.theme.radii.button};
  border: 1px solid ${(props) => props.theme.colors.background?.inverse};
  background-color: ${(props) => props.theme.colors.background?.inverse};
  color: ${(props) => props.theme.colors.text?.inverse};
  font-weight: bold;
  padding: 1rem;
  margin: 0 1rem 1rem 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.colors.background?.inverse};
    color: ${(props) => props.theme.colors.text?.default};
  }

  ${({ theme }) => theme.mediaQueries.small} {
    width: 100%;
    box-sizing: border-box;
  }
`;

const Index = () => {
  const [state, dispatch] = useContext(MetaMaskContext);

  const [voteTitle, setVoteTitle] = useState<string>('');
  const [voteElements, setVoteElements] = useState<JSX.Element>();

  useEffect(() => {
    rednerVotes();
  }, []);

  const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
    ? state.isFlask
    : state.snapsDetected;

  const hardcodedAddress = '0x1C957c2d4225e63f4404e0f817384022807e87fB';

  const rednerVotes = async () => {
    const deployedContracts = await voteContract.getDeployedVotes();

    if (deployedContracts.length == 0) return;

    const contract = new ethers.Contract(
      deployedContracts[0],
      getVoteContract().abi,
      signer,
    );
    const summary = await contract.getSummery();

    if (!summary[1])
      setVoteElements(
        <Card
          content={{
            title: 'Submit your vote',
            description: summary[0],
            button: (
              <div style={{ display: 'flex' }}>
                <SendYesButton
                  onClick={() => {
                    handleAnswerClick(contract, true);
                  }}
                  style={{ marginRight: '8px' }}
                />
                <SendNoButton
                  onClick={() => {
                    handleAnswerClick(contract, false);
                  }}
                />
              </div>
            ),
          }}
        />,
      );
    else {
      const acceptedVotes = await contract.acceptedVoteCount();
      const rejectedVote = await contract.rejectedVoteCount();

      setVoteElements(
        <Card
          content={{
            title: 'Your vote sumbited!',
            description: `${
              summary[0]
            } \n Disaggree Count: ${rejectedVote.toString()} \n Agree Count: ${acceptedVotes.toString()}`,
          }}
        />,
      );
    }
  };

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      await provider.send('eth_requestAccounts', []);
      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };

  const handleAnswerClick = async (
    address: ethers.Contract,
    answer: boolean,
  ) => {
    try {
      await address.vote(answer);
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };

  const handleSubmitClick = async () => {
    try {
      const currentAccount = window.ethereum.selectedAddress;

      if (currentAccount?.toLowerCase() !== hardcodedAddress.toLowerCase()) {
        alert('Only manager can make votes');
        return;
      }

      const res = await voteContract.createVote(voteTitle);

      setVoteTitle('');
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };

  const handleVoteTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVoteTitle(event.target.value);
  };

  return (
    <Container>
      <Heading>
        Welcome to <Span>vote-snap</Span>
      </Heading>
      {/* <Subtitle>
        Get started by editing <code>src/index.ts</code>
      </Subtitle> */}
      <CardContainer>
        {state.error && (
          <ErrorMessage>
            <b>An error happened:</b> {state.error.message}
          </ErrorMessage>
        )}
        {!isMetaMaskReady && (
          <Card
            content={{
              title: 'Install',
              description:
                'Snaps is pre-release software only available in MetaMask Flask, a canary distribution for developers with access to upcoming features.',
              button: <InstallFlaskButton />,
            }}
            fullWidth
          />
        )}
        {!state.installedSnap && (
          <Card
            content={{
              title: 'Connect',
              description:
                'Get started by connecting to and installing the example snap.',
              button: (
                <ConnectButton
                  onClick={handleConnectClick}
                  disabled={!isMetaMaskReady}
                />
              ),
            }}
            disabled={!isMetaMaskReady}
          />
        )}
        {shouldDisplayReconnectButton(state.installedSnap) && (
          <Card
            content={{
              title: 'Reconnect',
              description:
                'While connected to a local running snap this button will always be displayed in order to update the snap if a change is made.',
              button: (
                <ReconnectButton
                  onClick={handleConnectClick}
                  disabled={!state.installedSnap}
                />
              ),
            }}
            disabled={!state.installedSnap}
          />
        )}
        <Card
          content={{
            title: 'Vote making Area',
            description: `Only manager can make voting`,
            button: (
              <SendVoteButton
                onClick={handleSubmitClick}
                disabled={!state.installedSnap}
              />
            ),
            input: (
              <Input
                type="text"
                placeholder="Vote title"
                onChange={handleVoteTitleChange}
                value={voteTitle}
              />
            ),
          }}
          disabled={!state.installedSnap}
          fullWidth={
            isMetaMaskReady &&
            Boolean(state.installedSnap) &&
            !shouldDisplayReconnectButton(state.installedSnap)
          }
        />
        {voteElements}
      </CardContainer>
    </Container>
  );
};

export default Index;
