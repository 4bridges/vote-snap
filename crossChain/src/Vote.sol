// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract Vote {
    struct Question {
        string text;
        mapping(bytes32 => uint256) votes;
    }

    mapping(uint256 => Question) public questions;
    uint256 public questionCount;

    constructor() {
        questionCount = 0;
    }

    function addQuestion(string memory questionTitle) public {
        questionCount++;
        questions[questionCount].text = questionTitle;
    }

    function vote(uint256 questionId, string memory option) public {
        bytes32 normalizedOption = keccak256(abi.encodePacked(option));
        require(
            normalizedOption == keccak256(abi.encodePacked("Yes")) ||
                normalizedOption == keccak256(abi.encodePacked("No")),
            "Invalid option. Only 'Yes' or 'No' are allowed."
        );

        Question storage q = questions[questionId];
        q.votes[normalizedOption]++;
    }

    function getVotes(
        uint256 questionId,
        string memory option
    ) public view returns (uint256) {
        bytes32 normalizedOption = keccak256(abi.encodePacked(option));
        return questions[questionId].votes[normalizedOption];
    }
}
