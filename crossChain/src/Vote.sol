// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

import {CCIPReceiver} from "@chainlink/contracts-ccip/src/v0.8/ccip/applications/CCIPReceiver.sol";
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";

contract Vote is CCIPReceiver {
    address public owner; // Address of the contract owner
    string public title; // Title of the vote
    mapping(address => bool) public votes; // Mapping to track whether an address has voted or not
    uint public acceptedVoteCount; // Total count of accepted votes
    uint public rejectedVoteCount; // Total count of rejected votes

    address public latestSender; // Address of the latest sender invoking the contract
    string public latestMessage; // Latest message received by the contract
    address link; // Address of the LINK token contract
    address sen_router; // Address of the sender router contract

    /// @dev Modifier to check if the sender has already voted
    modifier hasNotVoted() {
        require(!votes[msg.sender], "You have already voted");
        _;
    }

    constructor(
        string memory voteTitle, // Constructor parameter for vote title
        address sender, // Constructor parameter for contract owner's address
        address _link, // Constructor parameter for LINK token contract address
        address _router, // Constructor parameter for sender router contract address
        address rec_router // Constructor parameter for receiver router contract address
    ) CCIPReceiver(rec_router) {
        /// @dev Initialize the CCIPReceiver contract with the receiver router contract address
        owner = sender; // Set the contract owner
        title = voteTitle; // Set the vote title
        link = _link; // Set the LINK token contract address
        sen_router = _router; // Set the sender router contract address
        LinkTokenInterface(link).approve(sen_router, type(uint256).max); // Approve the sender router contract to spend unlimited LINK tokens
    }

    /// @dev Function to vote (accept or reject)
    function vote(bool _vote) external hasNotVoted {
        votes[msg.sender] = _vote; // Update the vote record for the sender
        if (_vote)
            acceptedVoteCount++; // If the vote is accepted, increment the accepted vote count
        else rejectedVoteCount++; // If the vote is rejected, increment the rejected vote count
    }

    /// @dev Function to send a CCIP message
    function send(
        address receiver, // Address of the message receiver
        string memory someText, // Text to be included in the message
        uint64 destinationChainSelector // Destination chain selector for CCIP message
    ) external {
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver), // Encode the receiver address
            data: abi.encode(someText), // Encode the message text
            tokenAmounts: new Client.EVMTokenAmount[](0), // Empty token amounts array
            extraArgs: "", // Empty extra arguments
            feeToken: link // Set the LINK token as the fee token for the message
        });

        IRouterClient(sen_router).ccipSend(destinationChainSelector, message); // Invoke the sender router contract to send the CCIP message to the specified destination chain
    }

    /// @dev Internal function to handle CCIP messages received by the contract
    function _ccipReceive(
        Client.Any2EVMMessage memory message
    ) internal override {
        latestSender = abi.decode(message.sender, (address)); // Decode and store the address of the message sender
        latestMessage = abi.decode(message.data, (string)); // Decode and store the message data
    }
}
