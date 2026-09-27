// Content for the /uses page. Every entry below is seeded ONLY from real tech
// already present in data/skills.ts and data/projects.ts. Anything about the
// personal daily-driver setup that is not verifiably known is marked
// TODO(ruchit) rather than invented.

export interface UsesItem {
  /** Display name of the tool / technology. */
  name: string;
  /** Short, grounded note on how it is used. Keep factual; no invented claims. */
  note?: string;
}

export interface UsesSection {
  /** Section heading (rendered as an <h2>). */
  title: string;
  /** Optional one-line caption under the heading. */
  caption?: string;
  items: UsesItem[];
}

export const usesIntro =
  "The tools, languages, and hardware I actually reach for — pulled straight from the projects and skills on this site. Everything here is real; anything I haven't pinned down yet is left as a TODO.";

export const usesSections: UsesSection[] = [
  {
    title: "Editor & Tooling",
    caption: "Day-to-day development environment.",
    items: [
      { name: "VS Code", note: "Primary editor across Python, ML, and web work." },
      { name: "Git", note: "Version control for every project." },
      { name: "GitHub", note: "Remotes, code hosting, and project links." },
      { name: "Docker", note: "Containerized services (DealerXP, Enterprise Auth)." },
      { name: "CI/CD Pipelines", note: "Automated build/deploy workflows." },
      { name: "REST APIs", note: "Service integration and backend contracts." },
    ],
  },
  {
    title: "Languages",
    caption: "What I write in.",
    items: [
      { name: "Python", note: "ML, computer vision, and data pipelines." },
      { name: "Java", note: "Spring Boot backends (Enterprise Auth)." },
      { name: "C", note: "Systems and coursework fundamentals." },
      { name: "SQL", note: "Relational queries and data modeling." },
      { name: "TypeScript", note: "Next.js frontends and typed data layers." },
    ],
  },
  {
    title: "ML / AI Stack",
    caption: "Modeling, computer vision, and NLP.",
    items: [
      { name: "PyTorch", note: "Custom CRNN plate recognition (Traffic Violation Detection)." },
      { name: "TensorFlow", note: "Deep learning model training." },
      { name: "TensorFlow Lite", note: "On-device / edge inference." },
      { name: "Keras", note: "High-level model prototyping." },
      { name: "Scikit-learn", note: "Classical ML — Random Forest, XGBoost workflows." },
      { name: "NumPy" },
      { name: "Pandas" },
      { name: "Matplotlib" },
      { name: "Seaborn" },
      { name: "OpenCV", note: "Vision preprocessing and frame handling." },
      { name: "YOLOv8", note: "Real-time vehicle/object detection." },
      { name: "SORT", note: "Multi-object tracking." },
      { name: "ONNX", note: "Cross-framework model export for deployment." },
      { name: "EasyOCR", note: "License-plate OCR fallback." },
      { name: "CRNN", note: "Custom character recognition engine." },
      { name: "Hugging Face Transformers", note: "Transformer models for clinical NLP." },
      { name: "BERT", note: "Language understanding tasks." },
      { name: "spaCy", note: "Clinical entity extraction." },
      { name: "NLTK", note: "Text processing utilities." },
      { name: "Flower (flwr)", note: "Federated learning (Clinical Decision Support)." },
    ],
  },
  {
    title: "Hardware",
    caption: "Where the models actually run.",
    items: [
      { name: "Raspberry Pi 5", note: "Edge gateway for IoT telemetry and on-device inference." },
      { name: "ESP32", note: "Sensor nodes for CO2 / resource monitoring." },
      { name: "Arduino", note: "Embedded prototyping and sensor interfacing." },
      { name: "Daily-driver laptop", note: "TODO(ruchit): confirm make / model / specs." },
      { name: "Operating system", note: "TODO(ruchit): confirm primary dev OS." },
    ],
  },
  {
    title: "Data Stores & Services",
    caption: "Persistence, caching, and messaging.",
    items: [
      { name: "PostgreSQL", note: "Primary relational store (DealerXP, Drive_Orchestrator, Enterprise Auth)." },
      { name: "pgvector", note: "Vector similarity search over photo metadata." },
      { name: "MySQL", note: "Relational database work." },
      { name: "MongoDB", note: "Document store (MongoDB University certified)." },
      { name: "Redis", note: "Caching and background job queues." },
      { name: "BullMQ", note: "Redis-backed job queue (Drive_Orchestrator)." },
      { name: "MQTT", note: "IoT telemetry transport (Carbon Footprint system)." },
    ],
  },
  {
    title: "Web & App Frameworks",
    caption: "Frontend and backend frameworks I build with.",
    items: [
      { name: "Next.js", note: "App Router frontends (this portfolio, Drive_Orchestrator)." },
      { name: "React", note: "Component-driven UIs." },
      { name: "Tailwind CSS", note: "Utility-first styling." },
      { name: "FastAPI", note: "Python service backends." },
      { name: "Spring Boot", note: "JVM backend with Spring Security, JWT, Hibernate." },
    ],
  },
  {
    title: "Creative & 3D",
    caption: "Occasional visualization and modeling tools.",
    items: [
      { name: "Unity", note: "Interactive / simulation experiments." },
      { name: "Blender", note: "3D modeling and rendering." },
    ],
  },
];
