// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

contract VotePairReceiver_Unsafe is CCIPReceiver {
    uint256 public acceptedVoteCount;
    uint256 public rejectedVoteCount;
    mapping(address => bool) public votes;

    address public latestSender;

    constructor(address router) CCIPReceiver(router) {}

    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        latestSender = abi.decode(message.sender, (address));
        (acceptedVoteCount, rejectedVoteCount) = abi.decode(
            message.data,
            (uint256, uint256)
        );
    }
}
