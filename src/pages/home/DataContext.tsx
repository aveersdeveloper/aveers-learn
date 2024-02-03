import React, { createContext, useContext, ReactNode, useState } from "react";

type Question = {
  questionId: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
};

type Quiz = {
  id: string;
  name: string;
  enabled: boolean;
  questions: Question[];
};

type Course = {
  courseId: string;
  courseName: string;
  courseImage: string;
  description: string;
  videos: Video[];
};

type Video = {
  videoId: string;
  videoTitle: string;
  driveFileId: string;
  duration: number;
  thumbnail: string;
  url: string;
};

interface DataContextType {
  courses: Course[];
  setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
  quizzes: Quiz[];
  setQuizzes: React.Dispatch<React.SetStateAction<Quiz[]>>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  return (
    <DataContext.Provider value={{ courses, setCourses, quizzes, setQuizzes }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
