export interface Project {
  title: string;
  description: string;
  tech: string[];
  period: string;
  bullets: string[];
  links: {
    github?: string;
    live?: string;
  };
}

export const projects: Project[] = [
  {
    title: "DealerXP",
    description: "Full-stack gamification layer for automotive dealership CRM/DMS pipelines, mapping lead-to-delivery event data into XP, streaks, badges, and department leaderboards.",
    tech: ["React", "FastAPI", "PostgreSQL", "Redis", "Docker"],
    period: "2026",
    bullets: [
      "Engineered a scoring and anti-gaming engine that filters 2,000+ raw operational events into 20 milestone-based actions",
      "Applied rate-capping, collusion gating, and behavioral anomaly detection to block point manipulation",
      "Built for the Carverse Mobility Technologies Dealership Gamification Hackathon"
    ],
    links: {
      github: "https://github.com/RuchitPahadia/dealership-gamification-platform",
      live: "#"
    }
  },
  {
    title: "Photo Orchestrator",
    description: "Next.js 16 + TypeScript application that pools photo storage across multiple Google Drive accounts. It automatically extracts EXIF metadata and generates thumbnails in background queues.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Redis", "Google Drive API"],
    period: "2026",
    bullets: [
      "Pools photo storage seamlessly across multiple Google Drive accounts with background token refresh management",
      "Extracts EXIF metadata automatically and handles high-throughput thumbnail generation using Redis background jobs",
      "Maintains PostgreSQL schema supporting pgvector extension to store photo metadata for efficient query and similarity retrieval"
    ],
    links: {
      github: "https://github.com/RuchitPahadia/Drive_Orchestrator"
    }
  },
  {
    title: "Enterprise Authentication & Authorization System",
    description: "Spring Boot backend providing user registration, authentication, profile management, and Role-Based Access Control (RBAC) via stateless JWT.",
    tech: ["Java", "Spring Boot", "PostgreSQL", "Spring Security", "JWT", "Hibernate"],
    period: "2026",
    bullets: [
      "Implemented stateless JWT-based authentication and role-based access controls (USER/ADMIN/MODERATOR)",
      "Integrated BCrypt password hashing, layered controller-service-repository architecture, and Swagger/OpenAPI documentation"
    ],
    links: {
      github: "https://github.com/RuchitPahadia/Enterprise_Auth"
    }
  },
  {
    title: "Patient Handoff System (Ongoing)",
    description: "End-to-end clinical-handoff platform featuring a transformer-based NLP summary generator and interactive chatbot.",
    tech: ["Python", "Hugging Face Transformers", "spaCy", "Flask"],
    period: "2025 – Present",
    bullets: [
      "Architecting data pipelines for ingestion, entity extraction, summarisation, and dialogue handling",
      "Generates structured handoff reports from raw clinical notes using custom NLP pipelines"
    ],
    links: {
      github: "https://github.com/RuchitPahadia/sih-2025-health-chatbot"
    }
  },
  {
    title: "AI-Based Traffic Violation Detection System",
    description: "Computer vision and deep learning pipeline detecting helmet absence, triple riding, and wrong-lane driving from live traffic video.",
    tech: ["Python", "PyTorch", "OpenCV", "SORT Tracker", "Custom OCR"],
    period: "2025",
    bullets: [
      "Integrated SORT-based vehicle tracking and a custom OCR model to link violations to license plates",
      "Achieved ~91% vehicle-detection, ~87% plate-recognition accuracy, and cut false positives by 30%"
    ],
    links: {
      github: "https://github.com/RuchitPahadia/Traffic_Proto"
    }
  }
];
