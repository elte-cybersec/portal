export interface ResearchArea {
  title: string;
  description: string;
}

export const MainTitle =
  "The ELTE Cybersecurity Lab, part of the Department of Computer Algebra, studies how complex digital systems fail under attack and how they can be made more secure in practice.";

export const researchAreas: ResearchArea[] = [
  {
    title: "AI Security",
    description:
      "Robustness and privacy of machine learning systems, especially in federated and distributed settings. Interests include poisoning attacks, privacy leakage, anomaly detection, and the security of emerging foundation-model ecosystems.",
  },
  {
    title: "Cloud Security",
    description:
      "Identity, authentication, access control, and adaptive security mechanisms for modern cloud infrastructures — including decentralized identity and zero-trust-inspired approaches.",
  },
  {
    title: "Cryptocurrency & Blockchain Security",
    description:
      "Public ledgers, wallet privacy, and the security implications of decentralized applications and financial infrastructures.",
  },
  {
    title: "Applied Cryptography",
    description:
      "Secure computation, advanced encryption, and post-quantum cryptography, with attention to both formal security proofs and practical deployment.",
  },
  {
    title: "5G & Next-Generation Network Security",
    description:
      "Authentication, network slicing, impersonation threats, and privacy-preserving protocols for modern mobile and next-generation network systems.",
  },
];