import type { ProjectsPageData } from "../types";

export const projectsPageData: ProjectsPageData = {
  projects: [
    {
      slug: "b5g-network-security",
      title: "B5G Network Security",
      description:
        "Beyond 5G networks introduce highly distributed, software-defined, and cloud-native infrastructures that support massive connectivity, ultra-low latency, and critical services. These new capabilities also expand the attack surface across user equipment, edge nodes, core network functions, and service-based interfaces. This project investigates security mechanisms for B5G and future mobile networks, with a focus on authentication, core-network protection, and malicious user-equipment detection. The goal is to design intelligent, scalable, and standards-aware security solutions that can operate in dynamic and heterogeneous network environments. This project is closely connected to our work on Distributed ML Security, especially for privacy-preserving detection models, and to Cloud Security, where B5G core functions are increasingly deployed.",
      mainObjectives: [
        "Develop distributed authentication mechanisms for next-generation networks.",
        "Improve the security of web application firewall components protecting B5G core services.",
        "Detect rogue or compromised user equipment using intelligent and privacy-aware techniques.",
        "Support secure deployment of B5G services across edge and cloud environments.",
        "Reduce dependency on centralized trust anchors and single points of failure.",
      ],
      relatedProjects: ["Distributed ML Security", "Cloud Security"],
      subProjects: [
        {
          title: "Distributed Secondary Authentication",
          description:
            "Secondary authentication is an important security function in modern mobile networks, especially when users access external data networks, private slices, enterprise services, or third-party applications. Traditional authentication models are often centralized, which may introduce latency, scalability limits, and single points of failure. This sub-project explores distributed secondary authentication for B5G networks. The goal is to design authentication schemes that can operate across multiple network domains, edge nodes, and cloud-native network functions while preserving security, privacy, and performance.",
          researchFocus: [
            "Distributed identity verification for B5G users and services.",
            "Authentication delegation across edge and core network components.",
            "Low-latency authentication for network slicing and private networks.",
            "Resilience against replay attacks, credential theft, and impersonation.",
            "Integration with zero-trust and service-based architecture principles.",
          ],
          codebases: [],
        },
        {
          title: "WAF Core Security",
          description:
            "B5G core networks rely heavily on service-based interfaces, APIs, and cloud-native applications. These interfaces are often exposed internally across distributed network functions and externally to third-party services. Web Application Firewalls can play a key role in protecting these APIs from attacks such as injection, unauthorized access, abuse of service endpoints, and malformed requests. This sub-project studies the role of WAF core security in protecting B5G core network services. The work focuses on adapting WAF mechanisms to telecom-specific environments, where high availability, low latency, and protocol awareness are critical.",
          researchFocus: [
            "API security for service-based B5G core architecture.",
            "WAF policies for telecom network functions.",
            "Detection of malformed, unauthorized, or suspicious API traffic.",
            "Protection against attacks targeting network exposure functions and service interfaces.",
            "Performance-aware WAF deployment in edge and core environments.",
          ],
          codebases: ["5G"],
        },
        {
          title: "Rogue UE Detection",
          description:
            "Rogue User Equipment can threaten B5G networks by impersonating legitimate devices, generating abnormal traffic, abusing radio resources, or participating in coordinated attacks. Detecting rogue UEs is challenging because future networks support massive numbers of devices, including IoT, vehicles, sensors, and industrial equipment. This sub-project focuses on rogue UE detection using behavioral analysis, network telemetry, and machine learning. The objective is to identify suspicious or compromised devices without relying only on static identifiers or centralized inspection.",
          researchFocus: [
            "Behavioral profiling of user equipment.",
            "Detection of abnormal signaling and traffic patterns.",
            "Machine learning-based anomaly detection.",
            "Privacy-preserving UE monitoring.",
            "Rogue UE detection in network slicing and edge environments.",
          ],
          codebases: [],
        },
      ],
      figures: [],
    },
    {
      slug: "distributed-ml-security",
      title: "Distributed ML Security",
      description:
        "Distributed machine learning is increasingly used in security-sensitive environments, including mobile networks, cloud platforms, healthcare, finance, and IoT systems. However, distributed learning introduces new risks, including data leakage, model poisoning, inference attacks, malicious clients, and untrusted aggregation servers. This project focuses on securing distributed machine learning pipelines using privacy-preserving computation, secure aggregation, and federated learning. The goal is to enable collaborative intelligence without exposing sensitive data or compromising model integrity. This project is closely connected to our work on B5G Network Security, especially for privacy-preserving rogue UE detection, and to Compliance Verification, where secure and privacy-preserving learning can support regulatory requirements.",
      mainObjectives: [
        "Develop secure distributed learning methods for untrusted environments.",
        "Protect client data during collaborative model training.",
        "Prevent information leakage during model aggregation.",
        "Improve robustness against malicious participants and poisoned updates.",
        "Support compliance-aware machine learning workflows.",
      ],
      relatedProjects: ["B5G Network Security", "Compliance Verification"],
      subProjects: [
        {
          title: "MPC-Based Federated Learning",
          description:
            "Federated Learning allows multiple clients to train a shared model without sending raw data to a central server. However, model updates can still leak sensitive information. Multi-Party Computation can reduce this risk by enabling parties to jointly compute learning operations without revealing private inputs. This sub-project investigates MPC-based federated learning for privacy-preserving collaborative model training. The aim is to design secure protocols that protect model updates while maintaining acceptable performance for real-world deployments.",
          researchFocus: [
            "Secure computation of model updates.",
            "Privacy-preserving training across distributed clients.",
            "Protection against honest-but-curious and malicious servers.",
            "Performance optimization for MPC-enabled learning.",
            "Application to telecom, cloud, and compliance-sensitive datasets.",
          ],
          codebases: ["MPC", "SPDZ"],
        },
        {
          title: "Secure Aggregation",
          description:
            "Secure aggregation is a key technique in privacy-preserving distributed learning. It allows a server to compute an aggregate result, such as the average of model updates, without seeing individual client contributions. This is essential when clients hold sensitive or regulated data. This sub-project focuses on secure aggregation protocols for federated and distributed learning systems. The objective is to protect individual updates while preserving model utility and system scalability.",
          researchFocus: [
            "Cryptographic aggregation of model updates.",
            "Robust aggregation in the presence of dropped or malicious clients.",
            "Secure aggregation for large-scale federated learning.",
            "Privacy protection against inference and reconstruction attacks.",
            "Lightweight protocols for resource-constrained devices.",
          ],
          codebases: ["Secure Federated Averaging"],
        },
      ],
      figures: [],
    },
    {
      slug: "compliance-verification",
      title: "Compliance Verification",
      description:
        "Organizations that process personal data must demonstrate that their systems comply with legal, regulatory, and organizational requirements. In complex digital infrastructures, compliance cannot be treated as a one-time checklist. It requires continuous monitoring, technical verification, documentation, and evidence collection. This project investigates automated and semi-automated approaches for compliance verification, with a specific focus on GDPR-related requirements. The goal is to bridge the gap between legal obligations and technical system behavior by developing methods that translate regulatory requirements into measurable technical controls. This project is closely connected to our work on Distributed ML Security, where privacy-preserving methods can reduce data exposure, and to Cloud Security, where compliance controls must be enforced across cloud platforms.",
      mainObjectives: [
        "Translate compliance requirements into technical controls.",
        "Verify whether systems satisfy privacy and data-protection obligations.",
        "Support automated evidence collection for audits.",
        "Detect non-compliant data flows and access patterns.",
        "Improve transparency and accountability in distributed systems.",
      ],
      relatedProjects: ["Distributed ML Security", "Cloud Security"],
      subProjects: [
        {
          title: "GDPR Compliance Verification",
          description:
            "The General Data Protection Regulation introduces obligations related to lawful processing, data minimization, purpose limitation, storage limitation, access control, accountability, and user rights. Verifying these obligations in real systems is difficult because data may move across applications, APIs, cloud services, logs, and machine learning pipelines. This sub-project focuses on GDPR compliance verification by developing methods to map legal requirements to measurable technical properties. The goal is to support organizations in assessing whether their systems behave according to GDPR principles.",
          researchFocus: [
            "Mapping GDPR requirements to technical controls.",
            "Verification of data access, retention, and processing policies.",
            "Detection of unauthorized or excessive data processing.",
            "Compliance evidence collection from logs, policies, and system configurations.",
            "Privacy-aware monitoring of cloud, network, and ML systems.",
          ],
          codebases: ["GDPR", "ProVerif"],
        },
      ],
      figures: [],
    },
    {
      slug: "cloud-security",
      title: "Cloud Security",
      description:
        "Modern networks and applications rely heavily on cloud infrastructure. Telecom systems, security services, machine learning platforms, and compliance tools are increasingly deployed on virtualized and cloud-native platforms. As a result, cloud security becomes a core requirement for protecting identity, access, workloads, and service availability. This project focuses on security mechanisms for cloud platforms, with emphasis on authentication, token management, and dynamic access control. The goal is to strengthen cloud identity and access control mechanisms while supporting secure deployment of network, ML, and compliance services. This project is closely connected to our work on B5G Network Security, where core network functions are deployed in cloud environments, and to Compliance Verification, where cloud configurations and access policies must be continuously checked.",
      mainObjectives: [
        "Improve authentication and authorization in cloud platforms.",
        "Strengthen token-based access control mechanisms.",
        "Reduce risks caused by long-lived or misused credentials.",
        "Support adaptive security policies based on risk and context.",
        "Protect cloud-hosted network and ML services.",
      ],
      relatedProjects: ["B5G Network Security", "Compliance Verification"],
      subProjects: [
        {
          title: "OpenStack Authentication",
          description:
            "OpenStack is widely used for building private and research cloud infrastructures. Its identity and access management mechanisms are central to securing cloud services, virtual machines, network functions, and administrative operations. Weak authentication or misconfigured identity services can expose the entire cloud environment to compromise. This sub-project focuses on OpenStack authentication security, with attention to identity management, token issuance, access control, and integration with external authentication systems.",
          researchFocus: [
            "Security analysis of OpenStack Keystone authentication.",
            "Identity federation and multi-domain authentication.",
            "Authentication risks in cloud-hosted network functions.",
            "Role-based and attribute-based access control.",
            "Monitoring and auditing authentication events.",
          ],
          codebases: ["Keystone"],
        },
        {
          title: "Dynamic Token Lifetime",
          description:
            "Access tokens are widely used in cloud platforms to authorize API calls and service interactions. Static token lifetimes can create security and usability problems. Long-lived tokens increase the risk of misuse if compromised, while very short-lived tokens may affect service continuity and user experience. This sub-project investigates dynamic token lifetime management for cloud environments. The goal is to adjust token validity based on context, risk level, user behavior, service sensitivity, and operational requirements.",
          researchFocus: [
            "Risk-based token lifetime adjustment.",
            "Context-aware access control for cloud APIs.",
            "Detection of abnormal token usage patterns.",
            "Token revocation and renewal strategies.",
            "Balancing security, usability, and system performance.",
          ],
          codebases: [],
        },
      ],
      figures: [],
    },
  ],
};