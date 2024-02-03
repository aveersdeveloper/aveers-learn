import { useEffect } from "react";
import HomePageHeader from "./HomepageHeader";
import "./Home.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useData } from "./DataContext";
import { Outlet } from "react-router-dom";

/* const { TabPane } = Tabs;
const { Content } = Layout; */

type Video = {
  videoId: string;
  videoTitle: string;
  driveFileId: string;
  duration: number;
  thumbnail: string;
  url: string;
};

type Course = {
  courseId: string;
  courseName: string;
  courseImage: string;
  description: string;
  videos: Video[];
};

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

const Home = () => {
  const { setCourses, setQuizzes } = useData();

  useEffect(() => {
    const fetchQuizzes = async () => {
      const quizzesCollection = collection(db, "quizzes");
      const quizSnapshot = await getDocs(quizzesCollection);
      const quizzesData: Quiz[] = quizSnapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as Quiz)
      );
      const enabledQuizzes = quizzesData.filter((quiz) => quiz.enabled);

      setQuizzes(enabledQuizzes);
    };

    fetchQuizzes();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesCollection = collection(db, "courses");
      const courseSnapshot = await getDocs(coursesCollection);
      const coursesData: Course[] = courseSnapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            courseId: doc.id,
          } as Course)
      );
      setCourses(coursesData);
    };

    fetchCourses();
  }, []);

  useEffect(() => {
    const starCount = 50;
    const starsContainer = document.querySelector(".stars-container2");

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.width = `${Math.random() * 3}px`;
      star.style.height = star.style.width;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      const animationDuration = `${2 + Math.random() * 5}s`;
      const animationDelay = `${Math.random() * 5}s`;
      star.style.animation = `twinkle ${animationDuration} infinite alternate ${animationDelay}`;
      star.style.setProperty("--star-duration", animationDuration);

      if (starsContainer) {
        starsContainer.appendChild(star);
      }
    }

    return () => {
      // Cleanup the stars when the component is unmounted
      if (starsContainer) {
        starsContainer.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="home-container">
      <HomePageHeader />

      <Outlet />
    </div>
  );
};

export default Home;
