#!/bin/bash

# Function to run the command for deploying CCIP Sender
run_deploy_ccip_sender() {
    echo "Running DeployCCIPSender_Unsafe command..."
    forge script ./script/CCIPSender_Unsafe.s.sol:DeployCCIPSender_Unsafe -vvv --broadcast --rpc-url avalancheFuji
}

# Function to run the command for deploying CCIP Receiver
run_deploy_ccip_receiver() {
    echo "Running DeployCCIPReceiver_Unsafe command..."
    forge script ./script/CCIPReceiver_Unsafe.s.sol:DeployCCIPReceiver_Unsafe -vvv --broadcast --rpc-url ethereumSepolia
}

# Function to run the command for sending CCIP
run_send_ccip() {
    echo "Running send command (Before send Link to Sender)..."

    # Source the .env file to set the environment variables
    source .env

    read -p "Enter sender address (CCIP_SENDER_UNSAFE_ADDRESS): " sender_address
    sender_address=$(echo "${sender_address}" | tr -d '[:space:]')
    read -p "Enter receiver address (CCIP_RECEIVER_UNSAFE_ADDRESS): " receiver_address
    receiver_address=$(echo "${receiver_address}" | tr -d '[:space:]')
    cast send "${sender_address}" --rpc-url avalancheFuji --private-key="$PRIVATE_KEY" "send(address,uint64,bool)" "${receiver_address}" 16015286601757825753 true
}

# Function to run the command for deploying Vote Pair Sender
run_deploy_vote_pair_sender() {
    echo "Running DeployVotePairSender_Unsafe command..."
    forge script ./script/VotePairSender_Unsafe.s.sol:DeployVotePairSender_Unsafe -vvv --broadcast --rpc-url avalancheFuji
}

# Function to run the command for deploying Vote Pair Receiver
run_deploy_vote_pair_receiver() {
    echo "Running DeployVotePairReceiver_Unsafe command..."
    forge script ./script/VotePairReciever_Unsafe.s.sol:DeployVotePairReceiver_Unsafe -vvv --broadcast --rpc-url ethereumSepolia
}

# Function to run the command for sending Vote Pair
run_send_vote_pair() {
    echo "Running send command (Before send Link to Sender)..."

    # Source the .env file to set the environment variables
    source .env

    read -p "Enter sender address (CCIP_SENDER_UNSAFE_ADDRESS): " sender_address
    sender_address=$(echo "${sender_address}" | tr -d '[:space:]')
    read -p "Enter receiver address (CCIP_RECEIVER_UNSAFE_ADDRESS): " receiver_address
    receiver_address=$(echo "${receiver_address}" | tr -d '[:space:]')
    cast send "${sender_address}" --rpc-url avalancheFuji --private-key="$PRIVATE_KEY" "send(address,uint64,bool)" "${receiver_address}" 16015286601757825753 true
}

# Menu options
display_menu() {
    echo "Select an option:"
    echo "1. Run DeployCCIPSender_Unsafe"
    echo "2. Run DeployCCIPReceiver_Unsafe"
    echo "3. Run send command (Before send Link to Sender)"
    echo "4. Run DeployVotePairSender_Unsafe"
    echo "5. Run DeployVotePairReceiver_Unsafe"
    echo "6. Run send command (Before send Link to Sender)"
    echo "0. Exit"

    read -p "Enter your choice: " choice
    echo

    case $choice in
        1) run_deploy_ccip_sender ;;
        2) run_deploy_ccip_receiver ;;
        3) run_send_ccip ;;
        4) run_deploy_vote_pair_sender ;;
        5) run_deploy_vote_pair_receiver ;;
        6) run_send_vote_pair ;;
        0) exit ;;
        *) echo "Invalid option. Please try again." ;;
    esac

    echo
    display_menu
}

# Run the menu
display_menu

