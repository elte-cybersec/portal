# Secure Federated Averaging

This research project explores privacy-preserving techniques in federated learning using Secure Aggregation, gradient defense strategies such as pruning, quantization, and noise, and gradient inversion attack simulations.

## Overview

This project demonstrates how client-side defenses and secure aggregation can improve privacy in federated learning. Built on top of [Flower](https://flower.dev/), the system includes a federated server with SecAgg+ support, multiple clients applying gradient defenses, an adversary module to simulate gradient inversion attacks, and visual and numerical evaluation of privacy versus utility trade-offs.

## Features

- Flower-based federated learning with secure aggregation
- Defense strategies: pruning, quantization, and noise injection
- Gradient inversion attack simulator
- CIFAR-100 dataset and lightweight CNN
- Visual reconstruction comparison and MSE logging
- Modular code design for experimentation

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/bahh99/flower-secagg-privacy.git
cd flower-secagg-privacy
```

### 2. Create Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

If using Poetry:

```bash
poetry install
```

## Project Structure

- `secaggexample/client_app.py`: FL client with defense strategies
- `secaggexample/server_app.py`: Federated server with SecAgg+
- `attack.py`: Gradient inversion attack logic
- `gradient_utils.py`: Helper functions for defense and gradients
- `model.py`: CNN model
- `results/`: Output images from attack simulations
- `config/`: Experiment configurations
- `pyproject.toml`: Flower federation and dependency settings
- `README.md`: Project documentation

## Running Experiments

### 1. Start the Server

```bash
flwr run --app=secaggexample.server_app:app --num-supernodes=5
```

### 2. Start Clients

```bash
python3 secaggexample/client_app.py
```

Repeat this step for as many clients as needed.

### 3. View Output

- Aggregation logs are printed on the server terminal
- Visual results of gradient inversion are saved in `/results/`
- Reconstructed images are saved as `noise.png`, `quantization.png`, and related outputs

## Evaluation Summary

| Training Round | Attacker Active | Defense Strategy | MSE | Interpretation |
| --- | --- | --- | --- | --- |
| 2 | Yes | None | 0.17 | Successful reconstruction, privacy risk present |
| 3 | Yes | Gaussian Noise + Clipping | 5003.13 | Attack failed due to effective defense |
| 4 | Yes | Pruning | 103.52 | Partial leakage, some structure visible |
| 5 | Yes | Quantization (4-bit) | 85.77 | Moderate disruption, but not fully secure |
| 6 | Yes | Noise Injection | 1820.66 | Poor visual match, defense effective |
| 7 | No | N/A | N/A | Control round with no attack performed |

## Security Considerations

This project includes simulated attacks for research purposes only. It is not intended for production use. Defense strategies are basic and are not replacements for differential privacy or encrypted computation.

## Contributing

Pull requests are welcome. For major changes, open an issue first to discuss the proposal.

## References

- Bonawitz, K., et al. (2017). [Practical Secure Aggregation for Privacy-Preserving Machine Learning](https://arxiv.org/abs/1611.04482)
- Aono, Y., et al. (2017). [Privacy-preserving Deep Learning via Additively Homomorphic Encryption](https://ieeexplore.ieee.org/document/7958568)
- Zhu, L., Liu, Z., & Han, S. (2019). [Deep Leakage from Gradients](https://arxiv.org/abs/1906.08935)
- Flower Federated Learning Framework: [https://flower.dev](https://flower.dev)
- PyTorch Documentation: [https://pytorch.org](https://pytorch.org)
- CIFAR-100 Dataset: [https://www.cs.toronto.edu/~kriz/cifar.html](https://www.cs.toronto.edu/~kriz/cifar.html)

## PORTAL_METADATA

```portal
slug: Secure-Federated-Averaging
title: Secure Federated Averaging
summary: Research project on privacy-preserving federated learning with secure aggregation, gradient defenses, and gradient inversion attack evaluation.
startDate: 2025-04-27
endDate: 2025-04-30
repositoryUrl: https://github.com/bahh99/flower-secagg-privacy
logos:
  - secure-federated.png
```
