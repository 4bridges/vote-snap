// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

contract VotePaitSender_Unsafe {
    uint256 public acceptedVoteCount;
    uint256 public rejectedVoteCount;
    mapping(address => bool) public votes;

    address link;
    address router;

    constructor(address _link, address _router) {
        link = _link;
        router = _router;
        LinkTokenInterface(link).approve(router, type(uint256).max);
    }

    function send(
        address receiver,
        uint64 destinationChainSelector,
        bool _vote
    ) external {
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encode(acceptedVoteCount, rejectedVoteCount),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: link
        });

        IRouterClient(router).ccipSend(destinationChainSelector, message);
        vote(_vote);
    }

    function vote(bool _vote) internal {
        votes[msg.sender] = _vote;
        if (_vote) acceptedVoteCount++;
        else rejectedVoteCount++;
    }
}
