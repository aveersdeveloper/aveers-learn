import React from "react";
import "./Stars.css";

const Stars = () => {
  const stars = Array.from({ length: 300 }).map((_, index) => (
    <div
      key={index}
      className="star"
      style={
        {
          "--randomX": Math.random(),
          "--randomY": Math.random(),
        } as React.CSSProperties
      } // Type assertion here
    ></div>
  ));

  return <div className="star-container">{stars}</div>;
};

export default Stars;
