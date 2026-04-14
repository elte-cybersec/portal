export interface ResearchArea {
  title: string;
  intro: string;
  description: string;
}

export const researchPageIntro =
  "Our lab works on a broad range of problems in cybersecurity, with a focus on building secure, privacy-preserving, and trustworthy digital systems. We study security challenges in modern machine learning, cloud and identity infrastructures, blockchain ecosystems, applied cryptography, and next-generation mobile networks. Across these areas, our research combines theoretical foundations with practical experimentation, including attack analysis, protocol design, system implementation, and security evaluation.";

export const researchAreas: ResearchArea[] = [
  {
    title: "AI Security",
    intro:
      "Security and privacy of modern machine learning systems, adversarial ML, and federated learning.",
    description:
      "We study the security and privacy of modern machine learning systems, with particular interest in adversarial machine learning, federated learning, and the robustness of distributed AI pipelines. Our work examines how learning systems fail under poisoning, inference, evasion, and privacy attacks, and how these risks can be mitigated through robust training, secure aggregation, anomaly detection, and privacy-preserving mechanisms. We are also interested in broader questions around trustworthy AI deployment, including the security of model supply chains, the protection of training data and model updates, and the emerging attack surface of foundation models and agentic AI systems.",
  },
  {
    title: "Applied Cryptography",
    intro:
      "Secure computation, post-quantum cryptography, and privacy-enhancing cryptographic protocols.",
    description:
      "The lab works on applied cryptography at the intersection of rigorous security models and deployable mechanisms. Our interests include secure multiparty computation, attribute-based encryption, privacy-enhancing cryptographic protocols, and the comparative analysis of real-world cryptographic constructions. A major current focus is post-quantum cryptography: understanding the security, efficiency, and implementation trade-offs of quantum-resistant key exchange, encryption, and signature schemes, especially in constrained environments such as IoT devices, embedded systems, and smart cards. We are also interested in transition questions and how cryptographic systems move from classical to post-quantum standards in practice, as well as quantum key distribution and other quantum-enabled security mechanisms.",
  },
  {
    title: "Cloud Security and Digital Identity",
    intro:
      "Authentication, access control, decentralized identity, and zero-trust architectures for cloud environments.",
    description:
      "Our research in cloud security focuses on authentication, access control, identity federation, and adaptive security mechanisms for modern cloud environments. We are interested in how cloud infrastructures can move beyond static trust assumptions toward context-aware and risk-aware security. A major direction of the lab is the integration of modern identity technologies, including decentralized identity and verifiable credentials, into practical cloud platforms. We also follow broader developments in zero-trust architectures, cloud-native security controls, and operational resilience, especially as these become increasingly important in European cybersecurity practice and governance.",
  },
  {
    title: "Cryptocurrency and Blockchain Security",
    intro:
      "Security, privacy, and transparency in blockchain systems and cryptocurrency ecosystems.",
    description:
      "We investigate security, privacy, and transparency in blockchain-based systems and cryptocurrency ecosystems. One pillar of work studies public ledger data as a rich source for security analysis, network measurement, and behavioural insight, including transaction graph structure, ecosystem-level risk patterns, and the privacy properties of different cryptocurrency designs. Another pillar of work examines the security and privacy of wallet software, user-facing applications, and decentralized finance infrastructures. More broadly, we are interested in how blockchain systems can be analysed as real-world socio-technical systems, where protocol guarantees, implementation choices, and user behaviour interact in complex ways.",
  },
  {
    title: "Modelling and Applied Number Theory",
    intro:
      "Mathematical modelling and number-theoretic methods for cryptographic analysis and secure system design.",
    description:
      "We work on mathematical modelling and applied number theory as tools for understanding and improving security systems. This includes the use of formal models, probabilistic reasoning, and number-theoretic methods in the analysis of cryptographic constructions, protocols, and attack surfaces. We are interested both in the mathematical foundations that support secure system design and in the role of modelling in evaluating the behaviour, efficiency, and limitations of real-world security mechanisms.",
  },
  {
    title: "Next-Generation Network Security",
    intro:
      "Authentication, privacy, and resilience in 5G and next-generation mobile network architectures.",
    description:
      "We study the security of next-generation mobile systems, with a focus on authentication, privacy, slice isolation, and the resilience of open and programmable network infrastructures. Our work examines how modern mobile architectures behave under adversarial conditions, including impersonation attacks, signalling abuse, rogue infrastructure, and cross-slice resource interference. We are particularly interested in security mechanisms that reduce reliance on centralized trust while preserving scalability and performance, such as privacy-preserving authentication based on zero-knowledge techniques. In parallel, we follow current developments in 5G-Advanced and the security evolution toward more zero-trust-oriented network designs, including work around slicing, service-based architectures, and stronger protections for increasingly virtualized and software-driven mobile cores.",
  },
];