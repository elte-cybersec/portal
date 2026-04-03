export interface ToolItem {
  title: string;
  slug: string;
  image: string;
  description: string;
  status?: "live" | "beta" | "coming-soon";
  category?: string;
}

export const toolsData: ToolItem[] = [
  {
    title: "Ancient Cipher",
    slug: "ancient-cipher",
    image: "/tools/ancient-cipher.png",
    description:
      "Encrypt and decrypt text using classical ciphers with simple educational workflows.",
    status: "live",
    category: "Cryptography",
  },
  {
    title: "Security Gauntlet",
    slug: "security-gauntlet",
    image: "/tools/security-gauntlet.png",
    description:
      "A cyber-themed challenge experience focused on security concepts and interactive learning.",
    status: "live",
    category: "Game",
  },
];