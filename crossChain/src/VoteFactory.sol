// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;
import {Vote} from "./Vote.sol";

contract VoteFactory {
    address[] public deployedVotes; // Array to keep track of deployed votes

    /**
     * @dev Creates a new vote contract and adds its address to deployedVotes array.
     * @param voteTitle The title of the vote.
     * @param _link The link associated with the vote.
     * @param _sen_router The address of the sender router.
     * @param _rec_router The address of the receiver router.
     */
    function createVote(
        string memory voteTitle,
        address _link,
        address _sen_router,
        address _rec_router
    ) public {
        address newVote = address(
            new Vote(voteTitle, msg.sender, _link, _sen_router, _rec_router)
        );
        deployedVotes.push(newVote);
    }

    /**
     * @dev Returns an array of all deployed vote contract addresses.
     * @return An array of all deployed vote contract addresses.
     */
    function getDeployedVotes() public view returns (address[] memory) {
        return deployedVotes;
    }
}
