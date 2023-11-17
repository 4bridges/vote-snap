// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Vote.sol";

contract VoteBuilder {
    Vote public voteContract;

    constructor(address voteContractAddress) {
        voteContract = Vote(voteContractAddress);
    }

    function createVote(string memory questionTitle) public {
        voteContract.addQuestion(questionTitle);
    }

    function submitVote(uint256 questionId, string memory option) public {
        voteContract.vote(questionId, option);
    }

    function getResult(uint256 questionId, string memory option) public view returns (uint256) {
        return voteContract.getVotes(questionId, option);
    }
}
