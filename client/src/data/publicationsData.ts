export type PublicationType =
  | "conference"
  | "journal"
  | "workshop"
  | "preprint"
  | "book-chapter";

export interface PublicationItem {
  id: string;
  code: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: PublicationType;
  abstract: string;
  tags: string[];
  url: string;
  doi?: string;
  publisher?: string;
}

export const publicationsData: PublicationItem[] = [
  {
    id: "bribers-on-the-chain-2025",
    code: "PUB-2025-001",
    title:
      "Bribers, Bribers on The Chain, Is Resisting All in Vain? Trustless Consensus Manipulation Through Bribing Contracts",
    authors: [],
    venue: "IACR ePrint 2025/1719",
    year: 2025,
    type: "preprint",
    abstract:
      "A study of consensus manipulation through bribing contracts in blockchain systems, focusing on trustless bribery mechanisms and their impact on distributed consensus security.",
    tags: ["#blockchain", "#consensus", "#ethereum", "#smart-contracts"],
    url: "https://ia.cr/2025/1719",
    publisher: "IACR",
  },
  {
    id: "gdpr-compliance-iiot-2025",
    code: "PUB-2025-002",
    title: "Blockchain-Enabled GDPR Compliance Enforcement for IIoT Data Access",
    authors: ["Amina Isazade", "Ali Malik", "Mohammed B. Alshawki"],
    venue: "Journal of Cybersecurity and Privacy",
    year: 2025,
    type: "journal",
    abstract:
      "A blockchain-backed privacy-preserving solution for enforcing GDPR-compliant data access in Industrial IoT systems.",
    tags: ["#blockchain", "#GDPR", "#IIoT", "#privacy", "#access-control"],
    url: "https://doi.org/10.3390/jcp5040084",
    doi: "10.3390/jcp5040084",
    publisher: "MDPI",
  },
  {
    id: "authentication-data-access-iiot-2025",
    code: "PUB-2025-003",
    title: "Authentication and Data Access Challenges in Safeguarding Industrial IoT",
    authors: [],
    venue: "Book Chapter",
    year: 2025,
    type: "book-chapter",
    abstract:
      "A discussion of authentication and data access challenges in Industrial IoT environments, with emphasis on security boundaries and deployment realities.",
    tags: ["#authentication", "#IIoT", "#access-control", "#cybersecurity"],
    url: "https://doi.org/10.1007/978-981-97-3442-9_59",
    doi: "10.1007/978-981-97-3442-9_59",
    publisher: "Springer",
  },
  {
    id: "forking-the-randao-2025",
    code: "PUB-2025-004",
    title: "Forking the RANDAO: Manipulating Ethereum's Distributed Randomness Beacon",
    authors: [],
    venue: "IACR ePrint 2025/037",
    year: 2025,
    type: "preprint",
    abstract:
      "An analysis of Ethereum's RANDAO randomness beacon and how it can be manipulated through selective omission strategies in proof-of-stake consensus.",
    tags: ["#ethereum", "#randao", "#randomness", "#consensus"],
    url: "https://ia.cr/2025/037",
    publisher: "IACR",
  },
  {
    id: "keystone-auth-openstack-2025",
    code: "PUB-2025-005",
    title:
      "Securing Cloud and IoT Identity: An Analysis of Keystone Authentication Mechanisms in OpenStack",
    authors: ["Obada Alnaddaf", "Mohammed Alshawki"],
    venue: "IEEE CIoT 2025",
    year: 2025,
    type: "conference",
    abstract:
      "An analysis of Keystone authentication in OpenStack, examining cloud and IoT identity security and trust boundaries.",
    tags: ["#openstack", "#keystone", "#authentication", "#cloud", "#IoT"],
    url: "https://doi.org/10.1109/CIoT67574.2025.11410152",
    doi: "10.1109/CIoT67574.2025.11410152",
    publisher: "IEEE",
  },
  {
    id: "byzantine-federated-learning-2025",
    code: "PUB-2025-006",
    title: "Byzantine-Resilient Federated Learning: Evaluating MPC Approaches",
    authors: ["Yasin Abdullah", "Mohammed B. Alshawki", "Peter Ligeti", "Wissem Soussi", "Burkhard Stiller"],
    venue: "IEEE ICDCS Workshops 2025",
    year: 2025,
    type: "workshop",
    abstract:
      "An evaluation of MPC-based approaches for Byzantine-resilient federated learning with focus on robustness and practical tradeoffs.",
    tags: ["#federated-learning", "#MPC", "#Byzantine", "#robustness"],
    url: "https://doi.org/10.1109/ICDCSW63273.2025.00101",
    doi: "10.1109/ICDCSW63273.2025.00101",
    publisher: "IEEE",
  },
  {
    id: "post-quantum-ethereum-2025",
    code: "PUB-2025-007",
    title: "Efficient, post-quantum signature verification on Ethereum",
    authors: [],
    venue: "ACM AsiaCCS 2025",
    year: 2025,
    type: "conference",
    abstract:
      "A study of efficient post-quantum signature verification on Ethereum, exploring verification cost and blockchain deployment feasibility.",
    tags: ["#post-quantum", "#ethereum", "#signatures", "#blockchain"],
    url: "https://doi.org/10.1145/3708821.3736193",
    doi: "10.1145/3708821.3736193",
    publisher: "ACM",
  },
  {
    id: "vita-b5g-6g-iot-2025",
    code: "PUB-2025-008",
    title:
      "VITA: Verifiable Decentralized Authentication and Access Control in B5G/6G IoT Environments",
    authors: [],
    venue: "SoftCOM 2025",
    year: 2025,
    type: "conference",
    abstract:
      "A verifiable decentralized authentication and access control approach for B5G/6G IoT environments.",
    tags: ["#B5G", "#6G", "#IoT", "#authentication", "#access-control"],
    url: "https://doi.org/10.23919/SoftCOM66362.2025.11197380",
    doi: "10.23919/SoftCOM66362.2025.11197380",
    publisher: "IEEE",
  },
  {
    id: "regulatory-compliance-verification-2024",
    code: "PUB-2024-001",
    title: "Regulatory Compliance Verification: A Privacy Preserving Approach",
    authors: [],
    venue: "CSNet 2024",
    year: 2024,
    type: "conference",
    abstract:
      "A privacy-preserving protocol for regulatory compliance verification without unnecessary disclosure of sensitive information.",
    tags: ["#privacy", "#compliance", "#verification", "#regulation"],
    url: "https://doi.org/10.1109/CSNet64211.2024.10851761",
    doi: "10.1109/CSNet64211.2024.10851761",
    publisher: "IEEE",
  },
  {
    id: "shop-floor-auditing-2024",
    code: "PUB-2024-002",
    title: "Blockchain-Based Privacy-Preserving Shop Floor Auditing Architecture",
    authors: ["Fatemeh Stodt", "Mohammed B. Alshawki", "Christoph Reich", "Fabrice Theoleyre", "Peter Ligeti"],
    venue: "IEEE Access",
    year: 2024,
    type: "journal",
    abstract:
      "A blockchain-based privacy-preserving architecture for secure and auditable shop-floor processes.",
    tags: ["#blockchain", "#auditing", "#privacy", "#industry"],
    url: "https://doi.org/10.1109/ACCESS.2024.3366492",
    doi: "10.1109/ACCESS.2024.3366492",
    publisher: "IEEE",
  },
  {
    id: "distributed-cryptography-cpabe-2023",
    code: "PUB-2023-001",
    title: "Distributed Cryptography for Lightweight Encryption in Decentralized CP-ABE",
    authors: ["Mohammed B. Alshawki", "Janneke Van Oosterhout", "Péter Ligeti", "Christoph Reich"],
    venue: "WiMob 2023",
    year: 2023,
    type: "conference",
    abstract:
      "A lightweight decentralized CP-ABE approach using distributed cryptography for constrained environments.",
    tags: ["#CP-ABE", "#distributed-cryptography", "#lightweight-security"],
    url: "https://doi.org/10.1109/WiMob58348.2023.10187882",
    doi: "10.1109/WiMob58348.2023.10187882",
    publisher: "IEEE",
  },
  {
    id: "attribute-verifier-iot-2022",
    code: "PUB-2022-001",
    title: "Attribute Verifier for Internet of Things",
    authors: ["Mohammed B. Alshawki", "Yuping Yan", "Peter Ligeti", "Christoph Reich"],
    venue: "ITNAC 2022",
    year: 2022,
    type: "conference",
    abstract:
      "A publication focused on attribute verification mechanisms for Internet of Things environments.",
    tags: ["#IoT", "#attribute-verification", "#access-control"],
    url: "https://doi.org/10.1109/ITNAC55475.2022.9998348",
    doi: "10.1109/ITNAC55475.2022.9998348",
    publisher: "IEEE",
  },
  {
    id: "key-exchange-cpabe-2022",
    code: "PUB-2022-002",
    title: "Security Verification of Key Exchange in Ciphertext-Policy Attribute Based Encryption",
    authors: ["Baasansuren Bat-Erdene", "Yuping Yan", "Mohammed B. M. Kamel", "Peter Ligeti"],
    venue: "ICSIP 2022",
    year: 2022,
    type: "conference",
    abstract:
      "An examination of key exchange security within ciphertext-policy attribute-based encryption.",
    tags: ["#CP-ABE", "#key-exchange", "#verification", "#cryptography"],
    url: "https://doi.org/10.1109/ICSIP55141.2022.9887218",
    doi: "10.1109/ICSIP55141.2022.9887218",
    publisher: "IEEE",
  },
];