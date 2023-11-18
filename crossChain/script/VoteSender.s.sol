// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "forge-std/Script.sol";
import {VoteFactory} from "../src/VoteFactory.sol";

contract VoteFactory_Unsafe is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address fujiLink = 0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846;
        address fujiRouter = 0x554472a2720E5E7D5D3C817529aBA05EEd5F82D8;
        address sepoliaRouter = 0xD0daae2231E9CB96b94C8512223533293C3693Bf;

        VoteFactory sender = new VoteFactory();
        // "Fund Cookies?",
        // fujiLink,
        // fujiRouter,
        // sepoliaRouter
        // );

        console.log("VoteFactory_Unsafe deployed to ", address(sender));

        vm.stopBroadcast();
    }
}
