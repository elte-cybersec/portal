# GDPR-Compliant IIoT Data Encryption with CP-ABE and IPFS

This project demonstrates a privacy-preserving encryption and storage mechanism for IIoT data using **Ciphertext-Policy Attribute-Based Encryption (CP-ABE)** combined with **IPFS** for decentralized storage. The system is inspired by **GDPR Article 32**, focusing on secure and controlled access to sensitive information based on user attributes.

## Features

- **CP-ABE (BSW07)** encryption scheme using [Charm-Crypto](https://github.com/JHUISI/charm)
- Attribute-based access policies aligned with GDPR Article 32
- Decentralized data storage on IPFS
- Secure key generation and encryption/decryption processes

## Technologies Used

- Python 3.x
- [Charm-Crypto](https://github.com/JHUISI/charm)
- IPFS (via `ipfshttpclient`)
- Solidity (for smart contract integration, not included here)

## Installation

1. **Clone the repository**

    ```bash
    
    git clone https://github.com/elte-cybersec/gdpr-compliant-IIoT.git
    cd gdpr-compliant-IIoT

    ```

2. **Set up Python environment**

    ```bash
    python3 -m venv venv
    source venv/bin/activate 
    ```

3. **Install dependencies**

    ```bash
    pip install -r requirements.txt
    ```

4. **Ensure IPFS daemon is running**

    First, install IPFS, then run:

    ```bash
    ipfs daemon
    ```

## Commands

Below are the commands you need to run for setting up and running the project.

```bash
# Activate Python environment (if using pyenv and a named virtualenv)
source ~/.pyenv/versions/charm-abe/bin/activate

# Start IPFS daemon
ipfs daemon

# Run Anvil (local Ethereum node)
anvil

# Run the CP-ABE encryption script
python run_cp_schemes.py

# Deploy the smart contract
forge create src/DataAccessControl.sol:DataAccessControl \
  --rpc-url http://127.0.0.1:8545 \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
  --broadcast

# Interact with the contract
forge script script/Interact.s.sol:Interact \
  --rpc-url http://127.0.0.1:8545 \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
  --broadcast
