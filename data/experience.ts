export interface ExperienceEntry {
  role: string;
  company: string;
  location: string;
  period: string;
  bullets: string[];
  isHighlight?: boolean;
}

export const experiences: ExperienceEntry[] = [
  {
    role: "IoT & Advanced AI Intern",
    company: "Ganaka Praudyogikee Tech Solutions",
    location: "Bengaluru, Karnataka",
    period: "Mar 2026 – Present",
    bullets: [
      "Building AI-integrated IoT pipelines for real-world automation, reducing manual intervention in operational processes",
      "Designing and testing deep learning models for sensor-data interpretation and anomaly detection on edge hardware",
      "Deploying optimised models to embedded systems (Raspberry Pi) with custom preprocessing pipelines and on-device inference tuning"
    ]
  },
  {
    role: "Data Science Intern",
    company: "BNMIT in association with E2E Technologies",
    location: "Bengaluru, Karnataka (On-site)",
    period: "Jun 2025 – Jul 2025",
    bullets: [
      "Built and fine-tuned supervised ML models (Random Forest, XGBoost), achieving ~85% accuracy on classification tasks",
      "Engineered end-to-end preprocessing pipelines (imputation, normalisation, feature selection) on datasets of 50,000+ records",
      "Evaluated models using cross-validation, precision-recall, and AUC-ROC metrics; presented findings to senior stakeholders"
    ]
  },
  {
    role: "Advanced AI Program",
    company: "Samsung Innovation Campus",
    location: "On-Site",
    period: "Aug 2025 – Feb 2026",
    bullets: [
      "Exclusive 6-Month Offline Program by Samsung officials — highly selective intake, 120+ hours",
      "Selected through competitive screening for Samsung's flagship 6-month Advanced AI cohort — 120+ hours of in-person ML, Deep Learning, neural networks, and production-grade model architectures, taught by Samsung R&D officials"
    ],
    isHighlight: true
  }
];
