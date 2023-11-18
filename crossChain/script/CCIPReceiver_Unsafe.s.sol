// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import "forge-std/Script.sol";
import {CCIPReceiver_Unsafe} from "../src/CCIPReceiver_Unsafe.sol";

contract DeployCCIPReceiver_Unsafe is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address sepoliaRouter = 0xD0daae2231E9CB96b94C8512223533293C3693Bf;

        CCIPReceiver_Unsafe receiver = new CCIPReceiver_Unsafe(sepoliaRouter);

        console.log("CCIPReceiver_Unsafe deployed to ", address(receiver));

        vm.stopBroadcast();
    }
}
