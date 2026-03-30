# HE Evaluation

This project demonstrates privacy-preserving client-cloud data computation using Homomorphic Encryption and traditional cryptographic techniques. It evaluates how BFV scheme parameters affect HE performance under real cloud conditions on Azure and compares the results with AES, RSA-AES, Blowfish, and ChaCha20.

## Project Motivation and Scope

The study contributes to ongoing research on balancing performance and security in secure cloud data processing. The implementation combines homomorphic encryption experiments with traditional cryptographic baselines to measure privacy, efficiency, and practical deployment behavior.

## Key Features

- HE parameter tuning with TenSEAL, based on Microsoft SEAL
- Traditional cryptography integration for AES, RSA-AES, Blowfish, and ChaCha20
- Cloud-hosted computation through a web-based Azure application
- Performance metrics for encryption, decryption, computation time, CPU and memory usage, and throughput
- Runtime resource monitoring with `psutil`

## Repository Contents

### Client_HE_Parameter.py

Encrypts files using TenSEAL's BFV scheme, allows parameter tuning, and uploads ciphertext and context to Azure Blob Storage.

### Client_traditionalweb.py

Encrypts and decrypts files using traditional cryptographic schemes, prompts the user to select an algorithm, and measures encryption and decryption time.

### Server_HE_trad_compute.py

Provides a Flask-based web interface hosted on an Azure VM. It downloads encrypted data from Azure Blob Storage and runs either homomorphic computation on ciphertext or plaintext computation after decryption for traditional algorithms. It also logs performance metrics and returns results to the client.

## Setup Instructions

### 1. Create Python Virtual Environment

```bash
python -m venv venv
source venv/bin/activate
```

### 2. Clone the Project

```bash
git clone https://github.com/elte-cybersec/HE-Evaluation.git
cd HE-Evaluation
```

### 3. Install Requirements

```bash
pip install -r requirements.txt
```

## Running the Project

### Client-side Encryption

```bash
python Client_HE_Parameter.py
python Client_traditionalweb.py
```

### Server-side Application

```bash
python Server_HE_trad_compute.py
```

Navigate to `http://<your_vm_ip>:80` in a browser to access the web UI.

## Performance Metrics Captured

- Encryption time
- Decryption time
- Addition and multiplication time
- CPU usage before and after computation
- Memory usage before and after computation
- Throughput

## Practical Notes

- Cloud runtime: Hosted in a Windows Azure VM with 16GB RAM and 4 CPUs
- File sizes tested: 2 MB and 5 MB files
- Parameter sets: BFV evaluated across 6 parameter sets with varying `n` and `p` values
- Security advantage: HE preserves data privacy during computation, while traditional schemes expose data during computation

## PORTAL_METADATA

```portal
slug: HE-Evaluation
title: HE Evaluation
summary: Evaluation of homomorphic encryption performance on Azure using BFV and TenSEAL, compared with traditional cryptographic schemes.
startDate: 2025-04-27
endDate: 2025-04-30
repositoryUrl: https://github.com/elte-cybersec/HE-Evaluation
logos:
  - he-evaluation.png
  - he-evaluation2.png
```
