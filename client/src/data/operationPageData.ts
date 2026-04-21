export interface ProjectRole {
  id: string;
  role: string;
  description: string;
  axisX: "theory" | "practice";
  axisY: "builds" | "breaks";
  color: string;
}

export interface OperationPrinciple {
  id: string;
  title: string;
  description: string;
  componentKey?: string;
  iconFallback?: string;
}

export interface OperationPageData {
  intro: string;
  structureHeading: string;
  structureIntro: string;
  roles: ProjectRole[];
  additionalRoles: string;
  principles: OperationPrinciple[];
}

export const operationPageData: OperationPageData = {
  intro:
    "Many of the lab's activities are organized as small-group projects rather than individual assignments. We believe this format better reflects how strong research and development work is carried out in cybersecurity: through collaboration across different skills, perspectives, and methods. Instead of working in isolation on narrowly separated tasks, students contribute to a shared mini-project with a common research goal, a shared experimental platform or prototype, and a joint final outcome.",

  structureHeading: "Project Structure",

  structureIntro:
    "A typical team project involves 3 to 5 members working together over the course of a few months. While the exact structure depends on the topic, projects are usually divided into complementary roles.",

  roles: [
    {
      id: "theorist",
      role: "Theorist",
      description: "Focuses on the theoretical background and threat model.",
      axisX: "theory",
      axisY: "builds",
      color: "#93c5fd",
    },
    {
      id: "engineer",
      role: "Engineer",
      description: "Works on implementation and system integration.",
      axisX: "practice",
      axisY: "builds",
      color: "#5eead4",
    },
    {
      id: "attacker",
      role: "Attacker",
      description: "Works on attacks or adversarial testing.",
      axisX: "theory",
      axisY: "breaks",
      color: "#f0abfc",
    },
    {
      id: "evaluator",
      role: "Evaluator",
      description: "Works on evaluation, measurement, and documentation.",
      axisX: "practice",
      axisY: "breaks",
      color: "#c4b5fd",
    },
  ],

  additionalRoles:
    "In some projects, additional roles may include mathematical modelling, data analysis, or the design of privacy-preserving and cryptographic mechanisms. This allows students to specialize while still contributing to a coherent research effort.",

  principles: [
    {
      id: "supervision",
      title: "Supervision",
      description:
        "Each team is guided by a professional supervisor, so students are not left to work through the project on their own. The supervisor helps shape the research question, supports the planning of the work, provides technical and methodological direction, and gives feedback throughout the project. This ensures that the team has both independence in carrying out the work and expert support when making research and implementation decisions. The goal is to create an environment in which students can develop their skills with confidence while working on a problem that is both challenging and meaningful.",
      componentKey: "mentorEye",
      iconFallback: "SupervisorAccount",
    },
    {
      id: "open-source",
      title: "Open Source",
      description:
        "We also believe in open-source development and sharing with the broader community whenever possible. Projects are encouraged not only to produce strong internal results, but also to contribute reusable code, tools, datasets, or experimental insights that can support further work by others. In this way, students learn that research is not only about solving a problem within the lab, but also about creating knowledge and resources that others can build on.",
      componentKey: "shareOrbit",
      iconFallback: "Public",
    },
    {
      id: "teamwork",
      title: "Teamwork as Training",
      description:
        "Beyond technical output, we see teamwork as an important part of research training. Members learn how to coordinate a shared task, divide responsibilities, communicate results clearly, and integrate different contributions into one larger piece of work.",
      componentKey: "teamPulse",
      iconFallback: "Groups",
    },
  ],
};