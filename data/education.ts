export interface EducationEntry {
  degree: string;
  institution: string;
  period: string;
  grade: string;
}

export interface AchievementEntry {
  title: string;
  description: string;
  year?: string;
}

export interface CertificationEntry {
  name: string;
  issuer: string;
  year: string;
}

export interface EducationAchievementsData {
  education: EducationEntry[];
  achievements: AchievementEntry[];
  certifications: CertificationEntry[];
}

export const educationAchievements: EducationAchievementsData = {
  education: [
    {
      degree: "B.E. in Computer Science Engineering",
      institution: "BNM Institute of Technology",
      period: "2023 – Present",
      grade: "CGPA: 8.03 / 10"
    },
    {
      degree: "Senior Secondary, CBSE (PCM + CS)",
      institution: "Presidency School Bangalore South",
      period: "2021 – 2023",
      grade: "Aggregate: 83%"
    }
  ],
  achievements: [
    {
      title: "2nd Place, BNMIT Ideathon",
      description: "Presented a voice assistant project against college-wide competition",
      year: "2024"
    }
  ],
  certifications: [
    {
      name: "AI & ML",
      issuer: "NPTEL",
      year: "2024"
    },
    {
      name: "MongoDB certification",
      issuer: "MongoDB University",
      year: "2024"
    },
    {
      name: "IoT Using Python",
      issuer: "IIT Bombay",
      year: "2024"
    }
  ]
};
