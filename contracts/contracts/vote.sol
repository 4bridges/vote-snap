// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VoteFactory{
    address[] public deployedVotes;

      function createVote(string memory voteTitle) public {
        address newVote = address(new Vote(voteTitle, msg.sender));
        
        deployedVotes.push(newVote);
    }

     function getDeployedVotes() public view returns(address[] memory){
        return deployedVotes;
    }

}

contract Vote {
    address public owner;
    string public title;
    mapping(address => bool) public votes;
    uint public acceptedVoteCount;
    uint public rejectedVoteCount;

    modifier hasNotVoted() {
        require(!votes[msg.sender], "You have already voted");
        _;
    }

    constructor(string memory voteTitle, address sender)  {
        owner = sender;
        title = voteTitle;
    }

    function vote(bool _vote) external hasNotVoted {
        votes[msg.sender] = _vote;
        if (_vote)
            acceptedVoteCount++;
        else
            rejectedVoteCount++;
        
    }

    

}