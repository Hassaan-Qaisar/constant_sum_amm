# Constant Sum AMM

## Table of Contents

- [Introduction](#introduction)
- [Project Structure](#project-structure)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Testing](#testing)
- [Contributing](#contributing)

## Introduction

The Constant Sum AMM is a simple "Constant Sum - Automated Market Maker" allowing liquidity providers to add assets and users to exchange one asset for another with a 5% transaction fee. The frontend is built with React, and the smart contracts are written in Solidity and deployed on the Ethereum testnet. Forge Foundry is used for setup, building, and testing the project.

## Project Structure

The repository is organized into the following folders:

- `home directory`: Contains the React frontend of the application.
- `solidity`: Contains the Solidity smart contract files:
  - `CSAMM.sol`
  - `ERC20.sol`
  - `IERC20.sol`
- `foundry`: Contains the test cases and setup for Forge Foundry.

## Features

- Add assets by liquidity providers
- Exchange one asset for another with a 5% transaction fee
- Deploy and interact with ERC20 tokens
- Smart contract testing using Forge Foundry

## Technologies

- **Frontend**: React
- **Smart Contracts**: Solidity
- **Testing and Deployment**: Forge Foundry
- **Blockchain**: Ethereum testnet

## Installation

To set up and run the project locally, follow these steps:

### Prerequisites

- Node.js and npm installed
- MetaMask extension installed in your browser
- Ethereum wallet with some test seploia (e.g., from a testnet faucet)
- Forge Foundry installed

### Smart Contract Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Hassaan-Qaisar/constant_sum_amm
    cd constant_sum_amm
    ```

2. Navigate to the `solidity` directory and install dependencies:
    ```bash
    cd contracts
    forge install
    ```

3. Compile and deploy the smart contracts:
    ```bash
    forge build
    ```

4. Deploy two ERC20 tokens and note their addresses. Provide these addresses to the `CSAMM` contract.

### Frontend Setup

1. Navigate to the home directory, install dependencies, and start the React frontend:
    ```bash
    npm install
    npm start
    ```

## Usage

### Interact with the Application

1. Open your browser and navigate to `http://localhost:3000`.
2. Connect your MetaMask wallet to the application.
3. Use the interface to add liquidity and exchange assets.

## Testing

1. Navigate to the `foundry` directory and run the tests:
    ```bash
    cd ../foundry/hello_foundary
    forge test
    ```

## Contributing

Contributions are welcome! If you would like to contribute to this repository, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new Pull Request.
