import React, { useEffect } from "react";
import "./NotAuthorized.css";
import StarComponent from "../../components/new/Starry";

const NotAuthorized: React.FC = () => {
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
    <div className="not-authorized-container">
      {/* <div className="space-background"></div> */}
      <StarComponent />
      <h1 className="noauthtitle">Whoa there, Explorer! 🚀</h1>
      <p style={{ zIndex: "999" }}>
        Seems like you've landed on uncharted territory. Your access badge is
        still in the making. 🎖️
      </p>
      <p style={{ zIndex: "999" }}>
        Our elves are working hard to craft it. In the meantime, why not enjoy a
        cosmic cookie? 🍪
      </p>
      <p style={{ zIndex: "999" }}>
        Come back soon, and you might just find the gates open! 🌌
      </p>
    </div>
  );
};

export default NotAuthorized;
