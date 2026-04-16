export type PublicationType =
  | "conference"
  | "journal"
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
  venueIcon?: string;
}

export const publicationsData: PublicationItem[] = [
  {
    id: "bribers-on-the-chain-2025",
    code: "PUB-2025-001",
    title:
      "Bribers, Bribers on The Chain, Is Resisting All in Vain? Trustless Consensus Manipulation Through Bribing Contracts",
    authors: [
      "Bence Soóki-Tóth",
      "István András Seres",
      "Kamilla Kara",
      "Ábel Nagy",
      "Balázs Pejó",
      "Gergely Biczók",
    ],
    venue: "ACM CCS 2025",
    year: 2025,
    type: "conference",
    abstract:
      "The long-term success of cryptocurrencies largely depends on the incentive compatibility provided to the validators. Bribery attacks, facilitated trustlessly via smart contracts, threaten this foundation. This work introduces, implements, and evaluates three novel and efficient bribery contracts targeting Ethereum validators. The first bribery contract enables a briber to fork the blockchain by buying votes on their proposed blocks. The second contract incentivizes validators to voluntarily exit the consensus protocol, thus increasing the adversary's relative staking power. The third contract builds a trustless bribery market that enables the briber to auction off their manipulative power over the RANDAO, Ethereum's distributed randomness beacon. Finally, we provide an initial game-theoretical analysis of one of the described bribery markets.",
    tags: ["#blockchain", "#consensus", "#ethereum", "#smart-contracts"],
    url: "https://ia.cr/2025/1719",
    publisher: "ACM",
    venueIcon: "ccs25.png",
  },
  {
    id: "gdpr-compliance-iiot-2025",
    code: "PUB-2025-002",
    title:
      "Blockchain-Enabled GDPR Compliance Enforcement for IIoT Data Access",
    authors: ["Amina Isazade", "Ali Malik", "Mohammed B. Alshawki"],
    venue: "Journal of Cybersecurity and Privacy",
    year: 2025,
    type: "journal",
    abstract:
      "The General Data Protection Regulation (GDPR) imposes additional demands and obligations on service providers that handle and process personal data. In this paper, we examine how advanced cryptographic techniques can be employed to develop a privacy-preserving solution for ensuring GDPR compliance in Industrial Internet of Things (IIoT) systems. The primary objective is to ensure that sensitive data from IIoT devices is encrypted and accessible only to authorized entities, in accordance with Article 32 of the GDPR. The proposed system combines Decentralized Attribute-Based Encryption (DABE) with smart contracts on a blockchain to create a decentralized way of managing access to IIoT systems. The proposed system is used in an IIoT use case where industrial sensors collect operational data that is encrypted according to DABE. The encrypted data is stored in the IPFS decentralized storage system. The access policy and IPFS hash are stored in the blockchain’s smart contracts, allowing only authorized and compliant entities to retrieve the data based on matching attributes. This decentralized system ensures that information is stored encrypted and secure until it is retrieved by legitimate entities, whose access rights are automatically enforced by smart contracts. The implementation and evaluation of the proposed system have been analyzed and discussed, showing the promising achievement of the proposed system.",
    tags: ["#cryptography","#GDPR", "#Industrial", "#IoT","#Attribute-Based Encryption","#smart contracts", "#blockchain","#data privacy", "#access control"],
    url: "https://doi.org/10.3390/jcp5040084",
    doi: "10.3390/jcp5040084",
    publisher: "MDPI",
    venueIcon: "ieee_access.png",
  },
  {
    id: "authentication-data-access-iiot-2024",
    code: "PUB-2024-003",
    title:
      "Authentication and Data Access Challenges in Safeguarding Industrial IoT",
    authors: ["Mohammed-Oussama Fadel", "Mohammed B. Alshawki"],
    venue: "ICRIC 2023 (Springer LNEE vol. 1195)",
    year: 2024,
    type: "book-chapter",
    abstract:
      "A discussion of authentication and data access challenges in Industrial IoT environments, with emphasis on security boundaries and deployment realities.",
    tags: ["#authentication", "#IIoT", "#access-control", "#cybersecurity"],
    url: "https://doi.org/10.1007/978-981-97-3442-9_59",
    doi: "10.1007/978-981-97-3442-9_59",
    publisher: "Springer",
    venueIcon: "Proceedings of International Conference on Recent Innovations in Computing.webp",
  },
  {
    id: "forking-the-randao-2025",
    code: "PUB-2025-004",
    title:
      "Forking the RANDAO: Manipulating Ethereum's Distributed Randomness Beacon",
    authors: [
      "Ábel Nagy",
      "János Tapolcai",
      "István András Seres",
      "Bence Ladóczki",
    ],
    venue: "ACM CCS 2025",
    year: 2025,
    type: "conference",
    abstract:
      "Proof-of-stake consensus protocols often rely on distributed randomness beacons (DRBs) to generate randomness for leader selection. This work analyses the manipulability of Ethereum's DRB implementation, RANDAO, in its current consensus mechanism. Even with its efficiency, RANDAO remains vulnerable to manipulation through the deliberate omission of blocks from the canonical chain. Previous research has shown that economically rational players can withhold blocks --~known as a block withholding attack or selfish mixing~-- when the manipulated RANDAO outcome yields greater financial rewards.",
    tags: [ "#randao", "#randomness", "#consensus"],
    url: "https://ia.cr/2025/037",
    doi: "10.1145/3719027.3744852",
    publisher: "ACM",
    venueIcon: "ccs25.png",
  },
  {
    id: "keystone-auth-openstack-2025",
    code: "PUB-2025-005",
    title:
      "Securing Cloud and IoT Identity: An Analysis of Keystone Authentication Mechanisms in OpenStack",
    authors: ["Obada Alnaddaf", "Mohammed B. Alshawki"],
    venue: "IEEE CIoT 2025",
    year: 2025,
    type: "conference",
    abstract:
      "Authentication is a critical security component in both cloud and IoT environments, and Keystone offers multiple methods to perform various deployment scenarios and security requirements. This paper presents a comprehensive analysis of authentication mechanisms available in OpenStack's identity service, Keystone. It systematically examines four key authentication methods: Password Authentication, Time-based One-Time Passwords (TOTP), OAuth Authentication, and Application Credential Authentication. Through hands-on demonstrations and comparative analysis, we evaluated the strengths and limitations of each method. The findings aim to guide cloud and IoT administrators and architects, specifically in 5G networks, in selecting and implementing the most suitable authentication methods for their OpenStack deployments based on their specific security requirements, integration needs, and operational constraints.",
    tags: ["#openstack", "#keystone", "#authentication", "#cloud", "#IoT"],
    url: "https://doi.org/10.1109/CIoT67574.2025.11410152",
    doi: "10.1109/CIoT67574.2025.11410152",
    publisher: "IEEE",
    venueIcon: "ciot_2025.png",
  },
  {
    id: "byzantine-federated-learning-2025",
    code: "PUB-2025-006",
    title: "Byzantine-Resilient Federated Learning: Evaluating MPC Approaches",
    authors: [
      "Yasin Abdullah",
      "Mohammed B. Alshawki",
      "Peter Ligeti",
      "Wissem Soussi",
      "Burkhard Stiller",
    ],
    venue: "IEEE ICDCS 2025",
    year: 2025,
    type: "conference",
    abstract:
      "Federated learning (FL) has emerged as a paradigm shift for collaborative machine learning to preserve data privacy. However, without considering the security measures through relevant cryptographic mechanisms, the collaborative process is vulnerable to various attacks. This paper evaluates the strength and scalability of Semi2k protocol for secure Multi Party Computation (MPC) under two major attacks, namely label-flipping and min-max attacks. We established a controlled simulations involving various numbers of malicious clients and MPC nodes. Our result showed that Semi2k offers limited protection against min-max attacks, showing no advantage over non-MPC setups in short training runs. However, it significantly improves accuracy under label-flipping attacks at 500 iterations, though overall accuracy declines with more malicious clients. Longer training improves resilience to label-flipping but increases communication overhead. Communication costs grow linearly with participants, highlighting a trade-off between scalability and efficiency.",
    tags: ["#federated-learning", "#MPC", "#Byzantine", "#robustness"],
    url: "https://doi.org/10.1109/ICDCSW63273.2025.00101",
    doi: "10.1109/ICDCSW63273.2025.00101",
    publisher: "IEEE",
    venueIcon: "ICDCS2025.png",
  },
  {
    id: "post-quantum-ethereum-2025",
    code: "PUB-2025-007",
    title: "poqeth: Efficient, post-quantum signature verification on Ethereum",
    authors: [
      "Ruslan Kysil",
      "István András Seres",
      "Péter Kutas",
      "Nándor Kelecsényi",
    ],
    venue: "ACM AsiaCCS 2025",
    year: 2025,
    type: "conference",
    abstract:
      "This work explores the application and efficient deployment of (standardized) post-quantum (PQ) digital signature algorithms in the blockchain environment. Specifically, we implement and evaluate four PQ signatures in the Ethereum Virtual Machine: W-OTS+, XMSS, SPHINCS+, and MAYO. We focus on optimizing the gas costs of the verification algorithms as that is the signature schemes’ only algorithm executed on-chain, thus incurring financial costs (transaction fees) for the users. Hence, the verification algorithm is the signature schemes’ main bottleneck for decentralized applications." +
      "We examine two methods to verify post-quantum digital signatures on-chain. Our practical performance evaluation shows that full on-chain verification is often prohibitively costly. Naysayer proofs (FC’24) allow a novel optimistic verification mode. We observe that the Naysayer verification mode is generally the cheapest, at the cost of additional trust assumptions. We release our implementation called poqeth as an open-source library.",
    tags: ["#post-quantum", "#ethereum", "#signatures", "#blockchain"],
    url: "https://doi.org/10.1145/3708821.3736193",
    doi: "10.1145/3708821.3736193",
    publisher: "ACM",
    venueIcon: "ccs25.png",
  },
  {
    id: "vita-b5g-6g-iot-2025",
    code: "PUB-2025-008",
    title:
      "VITA: Verifiable Decentralized Authentication and Access Control in B5G/6G IoT Environments",
    authors: [
      "Mohammed B. Alshawki",
      "Yehao Zhou",
      "Sándor Laki",
      "Péter Ligeti",
    ],
    venue: "SoftCOM 2025",
    year: 2025,
    type: "conference",
    abstract:
      "As mobile networks continue to grow, enhancing security, reducing latency, and preserving user privacy are key challenges, especially in next-generation networks. An important approach is to bring authentication and access control mechanisms closer to the network edge. However, current methods often result in high delays and computational load, which is problematic for devices with limited resources. This paper addresses this issue by proposing a verifiable and decentralized end to end authentication and access control framework, named VITA. The framework aims to reduce latency and processing overhead when establishing secure communication with external service providers. VITA uses blockchain technology to move parts of the authentication and access control process away from the central network, which reduces bottlenecks and improves scalability. VITA offers a secure, scalable, and lightweight solution suitable for resource-constrained IoT environments in Beyond 5G (B5G) and 6 G networks. The results analysis showed that VITA reduces the authentication latency by 80.1 % compared to the traditional approach. Furthermore, subsequent token-based authentication and access reduced the latency by about 96.1 %.",
    tags: ["#Access control","#Performance evaluation","#Privacy","#5G mobile communication","#Scalability","#Authentication","#Process control","#Blockchains","#Internet of Things","#Trust management"],
    url: "https://doi.org/10.23919/SoftCOM66362.2025.11197380",
    doi: "10.23919/SoftCOM66362.2025.11197380",
    publisher: "IEEE",
    venueIcon: "softcom2025.png",
  },
  {
    id: "regulatory-compliance-verification-2024",
    code: "PUB-2024-001",
    title: "Regulatory Compliance Verification: A Privacy Preserving Approach",
    authors: ["Massimo Morello", "Petri Sainio", "Mohammed B. Alshawki"],
    venue: "CSNet 2024",
    year: 2024,
    type: "conference",
    abstract:
      "During the regulatory compliance verification, the verifier may need to gain access to private information that can present risks to the privacy of the entities being verified. Therefore, while ensuring that entities are compliant with the reg-ulations, such as GDPR, the regulatory compliance verification process need to safeguard the privacy of those entities. This paper proposes a privacy preserving regulatory compliance verification protocol, which has been integrated and implemented in a use case to verify the compliance with the article 32 of the GDPR. It provides a regulatory verification protocol, based on the attribute verification protocol, that reveals no private information of the entity being verified, other than the fact that it is compliant. Our results showed that the proposed protocol can efficiently verify the regulatory compliance of an entity by an external verifier.",
    tags: ["#Privacy","#Data privacy","#Protocols","#NIST","#Regulation","#Security","#Computer crime","#Standards"],
    url: "https://doi.org/10.1109/CSNet64211.2024.10851761",
    doi: "10.1109/CSNet64211.2024.10851761",
    publisher: "IEEE",
    venueIcon: "csnet24.png",
  },
  {
    id: "shop-floor-auditing-2024",
    code: "PUB-2024-002",
    title: "Blockchain-Based Privacy-Preserving Shop Floor Auditing Architecture",
    authors: [
      "Fatemeh Stodt",
      "Mohammed B. Alshawki",
      "Christoph Reich",
      "Fabrice Theoleyre",
      "Peter Ligeti",
    ],
    venue: "IEEE Access",
    year: 2024,
    type: "journal",
    abstract:
      "In the rapidly evolving realm of the Industrial Internet of Things (IIoT), securing shop floor operations, especially in audit processes, is of critical importance. This paper confronts the challenge of ensuring data integrity and trust in IIoT systems by leveraging the capabilities of blockchain technology. The unique characteristics of blockchain, such as its immutable and decentralized ledger, establish a solid and transparent foundation for verifying shop floor transactions and activities. We introduce a privacy-centric approach, meticulously designed to comply with stringent data privacy regulations. This method allows auditors to authenticate both IIoT data and devices, ensuring confidentiality and adhering to regulatory standards. Our practical implementation strategy, tailored for shop floor environments, not only enhances the security of device and data integrity but also showcases robustness against specific adversarial threats, including network intrusion, data tampering, and unauthorized access. The findings indicate that our approach not only strengthens security protocols but also integrates effortlessly with existing IIoT infrastructures. It presents an efficient, scalable solution that elevates the safety and reliability of IIoT ecosystems, making it a significant step forward in the quest for secure and compliant industrial operations.",
    tags: ["#Blockchains","#Industrial Internet of Things","#Scalability","#Computer architecture","#Smart contracts","#Real-time systems","#Microprogramming","#Privacy","#Job shop scheduling"],
    url: "https://doi.org/10.1109/ACCESS.2024.3366492",
    doi: "10.1109/ACCESS.2024.3366492",
    publisher: "IEEE",
    venueIcon: "ieee_access.png",
  },
  {
    id: "distributed-cryptography-cpabe-2023",
    code: "PUB-2023-001",
    title:
      "Distributed Cryptography for Lightweight Encryption in Decentralized CP-ABE",
    authors: [
      "Mohammed B. Alshawki",
      "Janneke Van Oosterhout",
      "Péter Ligeti",
      "Christoph Reich",
    ],
    venue: "WiMob 2023",
    year: 2023,
    type: "conference",
    abstract:
      "Decentralized Attribute-based Encryption (DABE) is an extension of public key cryptography that allows the ciphertext to be decrypted by any node that has a predefined set of attributes. DABE can be used to control access to Internet of Things (IoT) devices and data based on attributes such as the type of device, the location, and the role of the user. Due to its heavy computation requirements, the DABE either can not be implemented on the weak devices or will be implemented with significant delay.In this paper, we study two distributed solutions of lightweight encryption in DABE using secret sharing and outsourcing. The analysis of our results showed that both approaches provided a lightweight encryption property of DABE. The secret sharing outperformed the outsourcing in small number of attributes, and both provided close efficient results in case of high number of attributes.",
    tags: ["#Wireless communication","#Public key cryptography","#Encryption","#Outsourcing","#Internet of Things","#Mobile computing"],
    url: "https://doi.org/10.1109/WiMob58348.2023.10187882",
    doi: "10.1109/WiMob58348.2023.10187882",
    publisher: "IEEE",
    venueIcon: "wimob.png",
  },
  {
    id: "attribute-verifier-iot-2022",
    code: "PUB-2022-001",
    title: "Attribute Verifier for Internet of Things",
    authors: [
      "Mohammed B. Alshawki",
      "Yuping Yan",
      "Peter Ligeti",
      "Christoph Reich",
    ],
    venue: "ITNAC 2022",
    year: 2022,
    type: "conference",
    abstract:
      "Identity management, authentication, and attribute verification are among the main concerns in many Internet of Things (IoT) applications. Considering the privacy concerns, attribute verification became more important in many applications. Many of the proposed models in this field suffer from privacy and scalability issues as they depend on a centralized entity. In this paper, we proposed a decentralized attribute verifier based on a challenge-response approach. To address various IoT attribute verification requirements, the proposed model provides two modes of attribute verification, namely 1-out-of-n verification and n-out-of-n verification modes, in which the participants can prove the nossession of one or all of the given target attributes.",
    tags: ["#Privacy","#Scalability","#Computational modeling","#Authentication","#Communications technology","#Complexity theory","#Computational efficiency"],
    url: "https://doi.org/10.1109/ITNAC55475.2022.9998348",
    doi: "10.1109/ITNAC55475.2022.9998348",
    publisher: "IEEE",
    venueIcon: "itnac.png",
  },
  {
    id: "key-exchange-cpabe-2022",
    code: "PUB-2022-002",
    title:
      "Security Verification of Key Exchange in Ciphertext-Policy Attribute Based Encryption",
    authors: [
      "Baasansuren Bat-Erdene",
      "Yuping Yan",
      "Mohammed B. Alshawki",
      "Peter Ligeti",
    ],
    venue: "ICSIP 2022",
    year: 2022,
    type: "conference",
    abstract:
      "Attribute-based encryption (ABE) is an extension scheme of identity-based encryption and public-key encryption. It can achieve fine-grained access control and one-to-many encryption mode, suitable for practical applications. In addition to mathematical proofs, it is essential to verify its security properties using different protocols. This paper proposes two key exchange protocols to securely exchange the user secret keys in ABE. ProVerif is an automated cryptographic protocol verifier that we have used during protocol verification. We specifically aim to protect the confidentiality of the generated keys. The proposed protocols are formally analysed and their security property has been formally proved.",
    tags: ["#Access control","#Protocols","#Identity-based encryption","#Image processing","#Public key","#Encryption","#Cryptographic protocols"],
    url: "https://doi.org/10.1109/ICSIP55141.2022.9887218",
    doi: "10.1109/ICSIP55141.2022.9887218",
    publisher: "IEEE",
    venueIcon: "ICSIP.png",
  },
];