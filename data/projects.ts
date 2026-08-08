export interface Project {
  title: string;
  description: string;
  tech: string[];
  period: string;
  bullets: string[];
  status: "BUILT" | "IN PROGRESS";
  links: {
    github?: string;
    live?: string;
  };
}

export const projects: Project[] = [
  {
    title: "Carbon Footprint Monitoring System",
    description: "AI-integrated IoT dashboard for campus carbon footprint, energy, and water consumption telemetry.",
    tech: ["ESP32", "Raspberry Pi 5", "MQTT", "React", "Tailwind CSS", "Python"],
    period: "2026",
    bullets: [
      "Engineered real-time CO2 and resource monitoring using ESP32 sensor nodes and Raspberry Pi 5 gateways via MQTT",
      "Built a live telemetry dashboard to track utility usage, anomaly thresholds, and carbon metrics across campus buildings",
      "Developed during IoT & Advanced AI internship at Ganaka Praudyogikee Tech Solutions"
    ],
    status: "IN PROGRESS",
    links: {
      github: "https://github.com/ruchitpahadia"
    }
  },
  {
    title: "DealerXP",
    description: "Full-stack gamification layer for automotive dealership CRM/DMS pipelines, mapping operational event telemetry into department badges and leaderboards.",
    tech: ["React", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    period: "2026",
    bullets: [
      "Engineered a scoring and anti-gaming engine filtering 2,000+ raw events into 20 milestone actions",
      "Applied rate-capping, collusion gating, and behavioral anomaly detection to block point manipulation",
      "Built for the Carverse Mobility Technologies Dealership Gamification Hackathon"
    ],
    status: "BUILT",
    links: {
      github: "https://github.com/RuchitPahadia/dealership-gamification-platform",
      live: "#"
    }
  },
  {
    title: "Drive_Orchestrator",
    description: "Next.js application that pools photo and document storage across multiple Google Drive accounts, enabling similarity search.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "pgvector", "Redis", "BullMQ"],
    period: "2026",
    bullets: [
      "Pools photo storage seamlessly across multiple Google Drive accounts with background token refresh management",
      "Extracts metadata and handles high-throughput thumbnail generation using Redis background queues",
      "Maintains PostgreSQL database with pgvector extension to store photo metadata for similarity retrieval"
    ],
    status: "IN PROGRESS",
    links: {
      github: "https://github.com/RuchitPahadia/Drive_Orchestrator"
    }
  },
  {
    title: "Enterprise Auth System",
    description: "Spring Boot backend providing stateless authentication, user profiles, and Role-Based Access Control (RBAC).",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Spring Security", "JWT", "Hibernate"],
    period: "2026",
    bullets: [
      "Implemented stateless JWT-based authentication and role-based access controls (USER/ADMIN/MODERATOR)",
      "Integrated BCrypt password hashing, layered controller-service-repository architecture, and Swagger/OpenAPI documentation"
    ],
    status: "BUILT",
    links: {
      github: "https://github.com/RuchitPahadia/Enterprise_Auth"
    }
  },
  {
    title: "Clinical Decision Support System",
    description: "AI-augmented patient handoff platform utilizing federated learning for privacy-preserving clinical report generation.",
    tech: ["Next.js", "FastAPI", "Python", "Flower (flwr)", "Hugging Face", "spaCy"],
    period: "2025 – Present",
    bullets: [
      "Architected secure clinical ingestion and federated learning pipelines to train transformer models locally",
      "Generates structured handoff reports and extracts clinical entities from raw text, improving communication safety",
      "Final-year capstone project built in a 3-person team"
    ],
    status: "IN PROGRESS",
    links: {
      github: "https://github.com/RuchitPahadia/sih-2025-health-chatbot"
    }
  },
  {
    title: "Traffic Violation Detection System",
    description: "Advanced computer vision pipeline detecting wrong-way driving, motorcycle overloading (trippling), seatbelt, and helmet compliance, with real-time Automatic License Plate Recognition (ALPR).",
    tech: ["Python", "PyTorch", "YOLOv8", "SORT", "EasyOCR", "CRNN", "OpenCV"],
    period: "2025",
    bullets: [
      "Engineered real-time vehicle tracking using YOLOv8/11 and SORT, matching license plates with high-precision custom YOLOv8 localization",
      "Implemented a custom PyTorch CRNN character recognition engine and EasyOCR fallback optimized for Indian license plate fonts",
      "Built violation detection classifiers verifying helmet/seatbelt compliance, wrong-lane driving, and motorcycle overloading (trippling)",
      "Structured analytical logging pipeline reporting tracking IDs, transcribed plates, infraction labels, and timestamps to CSV"
    ],
    status: "BUILT",
    links: {
      github: "https://github.com/RuchitPahadia/Traffic_Violation_detection"
    }
  }
];
