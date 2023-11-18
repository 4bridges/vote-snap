// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;
import {Client} from "@chainlink/contracts-ccip/src/v0.8/ccip/libraries/Client.sol";
import {IRouterClient} from "@chainlink/contracts-ccip/src/v0.8/ccip/interfaces/IRouterClient.sol";
import {LinkTokenInterface} from "@chainlink/contracts/src/v0.8/shared/interfaces/LinkTokenInterface.sol";

contract CCIPSender_Unsafe {
    uint256 votes;

    address link;
    address router;

    constructor(address _link, address _router) {
        link = _link;
        router = _router;
        LinkTokenInterface(link).approve(router, type(uint256).max);
    }

    function vote(
        address receiver,
        string memory someText,
        uint64 destinationChainSelector
    ) external {
        votes += 1;
        send(receiver, someText, destinationChainSelector);
    }

    function send(
        address receiver,
        string memory someText,
        uint64 destinationChainSelector
    ) external {
        Client.EVM2AnyMessage memory message = Client.EVM2AnyMessage({
            receiver: abi.encode(receiver),
            data: abi.encode(someText),
            tokenAmounts: new Client.EVMTokenAmount[](0),
            extraArgs: "",
            feeToken: link
        });

        IRouterClient(router).ccipSend(destinationChainSelector, message);
    }
}
