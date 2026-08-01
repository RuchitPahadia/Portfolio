export interface SkillCategory {
  category: string;
  items: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Python", "Java", "C", "SQL"]
  },
  {
    category: "ML / Deep Learning",
    items: [
      "TensorFlow",
      "TensorFlow Lite",
      "PyTorch",
      "Keras",
      "Scikit-learn",
      "NumPy",
      "Pandas",
      "Matplotlib",
      "Seaborn",
      "CI/CD Pipelines"
    ]
  },
  {
    category: "Computer Vision",
    items: ["OpenCV", "Deep Learning Object Detection", "SORT Tracker", "ONNX", "OCR"]
  },
  {
    category: "NLP",
    items: ["Hugging Face Transformers", "BERT", "spaCy", "NLTK"]
  },
  {
    category: "Edge AI & Deployment",
    items: ["Model Optimisation", "On-Device Inference", "TensorFlow Lite", "ONNX", "Raspberry Pi", "Arduino"]
  },
  {
    category: "Databases & Tools",
    items: ["MySQL", "Git", "GitHub", "VS Code", "REST APIs", "Unity", "Blender"]
  },
  {
    category: "Core Concepts",
    items: ["Supervised Learning", "Feature Engineering", "Model Deployment", "Anomaly Detection", "IoT Systems"]
  }
];
