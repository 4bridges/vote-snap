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

    # Source the .env file to set the environment variables
    source .env

    read -p "Enter sender address (CCIP_SENDER_UNSAFE_ADDRESS): " sender_address
    sender_address=$(echo "${sender_address}" | tr -d '[:space:]')
    read -p "Enter receiver address (CCIP_RECEIVER_UNSAFE_ADDRESS): " receiver_address
    receiver_address=$(echo "${receiver_address}" | tr -d '[:space:]')
    cast send "${sender_address}" --rpc-url avalancheFuji --private-key="$PRIVATE_KEY" "send(address,uint64,bool)" "${receiver_address}" 16015286601757825753 true
}

run_command4() {
    echo "Running Command 4..."
    forge script ./script/VotePairSender_Unsafe.s.sol:DeployVotePairSender_Unsafe -vvv --broadcast --rpc-url avalancheFuji
}

# Function to run the second command
run_command5() {
    echo "Running Command 5..."
    forge script ./script/VotePairReciever_Unsafe.s.sol:DeployVotePairReceiver_Unsafe -vvv --broadcast --rpc-url ethereumSepolia
}

# Function to run the third command
run_command6() {
    echo "Running Command 6..."

    # Source the .env file to set the environment variables
    source .env

    read -p "Enter sender address (CCIP_SENDER_UNSAFE_ADDRESS): " sender_address
    sender_address=$(echo "${sender_address}" | tr -d '[:space:]')
    read -p "Enter receiver address (CCIP_RECEIVER_UNSAFE_ADDRESS): " receiver_address
    receiver_address=$(echo "${receiver_address}" | tr -d '[:space:]')
    cast send "${sender_address}" --rpc-url avalancheFuji --private-key="$PRIVATE_KEY" "send(address,uint64,bool)" "${receiver_address}" 16015286601757825753 true
}

# Menu options
menu() {
    echo "Select an option:"
    echo "1. Run DeployCCIPSender_Unsafe"
    echo "2. Run DeployCCIPReceiver_Unsafe"
    echo "3. Run send command(Before send Link to Sender)"
    echo "4. Run DeployVotePairSender_Unsafe"
    echo "5. Run DeployVotePairReceiver_Unsafe"
    echo "6. Run send command (Before send Link to Sender)"
    echo "0. Exit"

    read -p "Enter your choice: " choice
    echo

    case $choice in
        1) run_command1 ;;
        2) run_command2 ;;
        3) run_command3 ;;
        4) run_command4 ;;
        5) run_command5 ;;
        6) run_command6 ;;
        0) exit ;;
        *) echo "Invalid option. Please try again." ;;
    esac

    echo
    menu
}

# Run the menu
menu
