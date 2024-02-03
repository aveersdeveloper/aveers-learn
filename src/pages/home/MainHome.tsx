import "./Home.css";
import { /* Layout, Tabs, */ Card, Row, Col } from "antd";
/* import spaceVector from "../assets/spacevector.jpg"; */
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
/* import { faCode } from "@fortawesome/free-solid-svg-icons"; */
import { faHtml5, faCss3Alt, faJs } from "@fortawesome/free-brands-svg-icons";
import { useEffect } from "react";
import { useData } from "./DataContext";
import { useNavigate } from "react-router-dom";

type Video = {
  videoId: string;
  videoTitle: string;
  driveFileId: string;
  duration: number;
  thumbnail: string;
};

type Course = {
  courseId: string;
  courseName: string;
  courseImage: string;
  videos: Video[];
};

const MainHome = () => {
  //   const [courses, setCourses] = useState(coursesFromHome);
  //   const [quizzes, setQuizzes] = useState(quizzesFromHome);

  const { courses, quizzes } = useData();
  const navigate = useNavigate();

  //   useEffect(() => {
  //     setCourses(coursesFromHome);
  //   }, [coursesFromHome]);

  //   useEffect(() => {
  //     setQuizzes(quizzesFromHome);
  //   }, [quizzesFromHome]);

  const handleCourseClick = (course: Course) => {
    // Navigate to VideoPlayer and pass the selected course data
    navigate(`/player/${course.courseId}`, { state: { course } });
  };

  useEffect(() => {
    const starCount = 100;
    const starsContainer = document.querySelector(".stars-container");

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
    <div>
      <div className="starry-card">
        <div className="stars-container"></div>
        <div className="description-content">
          <h2>Welcome to Aveers Nexus</h2>
          <p
            style={{
              color: "#a9a9a9",
              fontFamily: "Regular",
            }}
          >
            Embark on a cosmic journey of learning and exploration. Dive deep
            into the universe of knowledge and discover new horizons.
          </p>
        </div>
      </div>
      <div style={{ padding: "15px" }}>
        <h2 className="section-title">Learn 📚</h2>
        <Row gutter={[16, 16]}>
          {courses.map((course) => (
            <Col xs={24} sm={12} md={8} lg={6} key={course.courseId}>
              <Card
                hoverable
                /* cover={<img alt={course.courseName} src={course.courseImage} />} */
                cover={
                  <div className="course-card-cover">
                    <img alt={course.courseName} src={course.courseImage} />
                  </div>
                }
                onClick={() => handleCourseClick(course)}
              >
                <Card.Meta title={course.courseName} />
              </Card>
            </Col>
          ))}
        </Row>
        <div className="section-divider"></div>
        <h2 className="section-title">Quizzes 🧠</h2>
        {quizzes.length > 0 ? (
          <Row gutter={[16, 16]}>
            {quizzes.map((quiz) => (
              <Col xs={24} sm={12} md={8} lg={6} key={quiz.id}>
                <Card hoverable className="quiz-card">
                  <div className="quiz-content">
                    <h3 className="gradient-text">{quiz.name}</h3>
                    <div className="quiz-details">
                      <div className="quiz-questions-count">
                        {quiz.questions.length} Questions
                      </div>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <div className="no-quizzes-message">
            Quizzes are still in a galaxy far, far away...
            <span role="img" aria-label="telescope">
              🔭
            </span>
          </div>
        )}
        <h2 className="section-title">Utilities 🔨</h2>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <Link to="/Editor">
              <div className="planet-container">
                <div className="orbit"></div>
                <div className="planet">
                  <span className="plante-name">HTML Editor</span>
                </div>
                <div className="satellite html">
                  <FontAwesomeIcon icon={faHtml5} />
                </div>
                <div className="satellite css">
                  <FontAwesomeIcon icon={faCss3Alt} />
                </div>
                <div className="satellite js">
                  <FontAwesomeIcon icon={faJs} />
                </div>
              </div>
            </Link>
          </Col>
        </Row>
      </div>
      <div className="footer">
        <div className="stars-container2"></div>

        <span className="footer-text">
          With <span className="heart">❤️</span> from Aveers
        </span>
      </div>
    </div>
  );
};

export default MainHome;
