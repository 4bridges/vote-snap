#!/bin/bash

# Function to run the first command
run_command1() {
    echo "Running Command 1..."
    forge script ./script/CCIPSender_Unsafe.s.sol:DeployCCIPSender_Unsafe -vvv --broadcast --rpc-url avalancheFuji
}

# Function to run the second command
run_command2() {
    echo "Running Command 2..."
    forge script ./script/CCIPReceiver_Unsafe.s.sol:DeployCCIPReceiver_Unsafe -vvv --broadcast --rpc-url ethereumSepolia
}

# Function to run the third command
run_command3() {
    echo "Running Command 3..."
    read -p "Enter sender address (CCIP_SENDER_UNSAFE_ADDRESS): " sender_address
    read -p "Enter receiver address (CCIP_RECEIVER_UNSAFE_ADDRESS): " receiver_address
    forge script ./script/CCIPSender_Unsafe.s.sol:send -vvv --rpc-url avalancheFuji --private-key=$PRIVATE_KEY "send(address,string,uint64)" $receiver_address "CCIP Masterclass" 16015286601757825753
}

# Menu options
menu() {
    echo "Select an option:"
    echo "1. Run DeployCCIPSender_Unsafe"
    echo "2. Run DeployCCIPReceiver_Unsafe"
    echo "3. Run send command"
    echo "0. Exit"

    read -p "Enter your choice: " choice
    echo

    case $choice in
        1) run_command1 ;;
        2) run_command2 ;;
        3) run_command3 ;;
        0) exit ;;
        *) echo "Invalid option. Please try again." ;;
    esac

    echo
    menu
}

# Run the menu
menu
