export interface AboutData {
  paragraphs: string[];
  internshipsCount: number;
  hasSamsungProgram: boolean;
  samsungProgramDetails: string;
}

export const aboutData: AboutData = {
  paragraphs: [
    "I am a final-year Computer Science Engineering student at BNM Institute of Technology, Bengaluru, targeting ML Engineer, Data Science, and AI Developer roles.",
    "My hands-on, execution-oriented approach drives me to build real systems, spanning end-to-end ML, deep learning, computer vision, and NLP applications from data preprocessing pipelines to edge deployment.",
    "Over my academic journey, I have completed two industry internships, participated in a selective Samsung-led Advanced AI program, and engineered multiple robust systems to solve complex operational challenges."
  ],
  internshipsCount: 2,
  hasSamsungProgram: true,
  samsungProgramDetails: "Samsung Innovation Campus 6-month Advanced AI program led by Samsung R&D officials."
};
