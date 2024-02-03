import { useEffect } from "react";
import { useAuth } from "../../auth/AuthContext"; // Adjust the path based on your folder structure
import "firebase/firestore";

import { useNavigate } from "react-router-dom";
import "./Intro.css";
import { auth, db } from "../../firebaseConfig";
import { doc, updateDoc } from "firebase/firestore";
import { message } from "antd";

const Intro: React.FC = () => {
  const navigate = useNavigate();
  const { username } = useAuth();

  // const handleContinue = () => {
  //   // Logic to set isIntroSeen to true in Firestore
  //   // Then navigate to the dashboard or home page
  //   navigate("/");
  // };

  const handleBeginAdventure = async () => {
    try {
      // Get the current user's UID
      const uid = auth.currentUser?.uid;

      // Check if UID exists
      if (uid) {
        // Reference to the user's document in Firestore
        const userDocRef = doc(db, "users", uid);

        // Update the isIntroSeen field to true
        await updateDoc(userDocRef, {
          isIntroSeen: true,
        });

        // Redirect the user to the dashboard or wherever you want them to go next
        // For example, using react-router:
        // navigate("/dashboard");
        message.success("Journey Initiated!");
        navigate("/");
      }
    } catch (error) {
      message.error("Rocket system failed, try later");
      console.error("Error updating isIntroSeen:", error);
    }
  };

  useEffect(() => {
    const starCount = 100;
    const spaceBackground = document.querySelector(".space-background");

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      star.style.width = `${Math.random() * 3}px`;
      star.style.height = star.style.width;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      const animationDuration = `${2 + Math.random() * 5}s`; // Random duration between 2 to 7 seconds
      const animationDelay = `${Math.random() * 5}s`; // Random delay up to 5 seconds
      star.style.animation = `moveStar ${animationDuration} infinite alternate ${animationDelay}`;
      star.style.setProperty("--star-duration", animationDuration);

      if (spaceBackground) {
        spaceBackground.appendChild(star);
      }
    }

    return () => {
      // Cleanup the stars when the component is unmounted
      if (spaceBackground) {
        spaceBackground.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="intro-container">
      <div className="space-background"></div>
      <h1 className="introH1">🚀 Blast Off, {username}!</h1>
      <p>
        Welcome to Aveers Learn! Let's explore the cosmic tools you'll be
        mastering:
      </p>

      <div className="topic">
        <h2>🚀 ReactJS</h2>
        <p>
          ReactJS, often simply called React, is our spaceship's control panel!
          It's a JavaScript library that helps us build user interfaces. With
          its component-based architecture, we can reuse code and manage states
          across large applications. It's like having reusable space modules for
          different missions!
        </p>
      </div>

      <div className="topic">
        <h2>🌌 TypeScript</h2>
        <p>
          TypeScript is like the universal translator for our space journey.
          It's a superset of JavaScript that adds static types. With TypeScript,
          we can ensure that our spaceship components fit perfectly, catching
          errors early and making the codebase more understandable and
          maintainable.
        </p>
      </div>

      <div className="topic">
        <h2>🛰️ NodeJS</h2>
        <p>
          NodeJS is our spaceship's engine! It's a JavaScript runtime that lets
          us execute JavaScript code server-side. With its non-blocking I/O and
          event-driven architecture, it ensures our spaceship can handle
          multiple tasks at once, like a true multitasking space vessel!
        </p>
      </div>

      <div className="topic">
        <h2>🔥 Firebase</h2>
        <p>
          Firebase is like our spaceship's support system, providing all the
          essential services we need. From storing data in its cosmic databases
          to authenticating our space crew, Firebase offers a suite of tools
          that make our intergalactic journey smoother.
        </p>
      </div>

      <div className="topic">
        <h2>☁️ AWS</h2>
        <p>
          Amazon Web Services (AWS) is like the vast space station supporting
          our spaceship. It offers a plethora of services, from computing power
          to storage options. It ensures our spaceship is always equipped and
          ready for any space challenge!
        </p>
      </div>

      <div className="topic">
        <h2>🤖 ChatGPT Prompt Engineering</h2>
        <p>
          Ever wondered how AI understands and responds to our queries? Welcome
          to the world of Prompt Engineering! It's like crafting a cosmic code
          to communicate with our AI astronauts. By designing and refining
          prompts, we ensure our AI understands and responds aptly, making it
          ready for various space missions (or enterprise situations)! It
          involves designing, refining, structuring text, and adjusting language
          models to operate in different scenarios. A true marvel in the AI
          cosmos!
        </p>
      </div>

      <div className="topic">
        <h2>📝 Weekly Quiz</h2>
        <p>
          Ready to test your knowledge, space cadet? 🚀 Every week, we'll
          challenge you with quizzes based on the topics you're learning. Not
          only will you get to flex your newfound skills, but you can also earn
          points and see how you stack up against your fellow interns. It's a
          fun way to reinforce what you've learned and see who's the top
          astronaut in the knowledge galaxy! 🌌
        </p>
      </div>

      <button className="begin-adventure-btn" onClick={handleBeginAdventure}>
        Let's Begin the Adventure! 🚀
      </button>
    </div>
  );
};

export default Intro;
