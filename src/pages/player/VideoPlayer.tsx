import { useLocation } from "react-router-dom";
import { BigPlayButton, ControlBar, Player } from "video-react";
import "../../../node_modules/video-react/dist/video-react.css";
import Markdown from "react-markdown";
import "./VideoPlayer.css";
import Grid from "@mui/material/Unstable_Grid2";
import { CardContent, Divider } from "@mui/joy";
import { Card, CardMedia } from "@mui/material";
import { useState } from "react";

const VideoPlayer = () => {
  const location = useLocation();
  const course = location.state?.course;
  const [videoIndex, setVideoIndex] = useState(0);

  const formattedMarkdown = course.description
    .replace(/\\n/g, "\n")
    .replace(/\\/g, "");

  return (
    <div className="video-container">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "25px",
          color: "white",
        }}
      >
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid xs={12} sm={9}>
            <Player autoPlay key={course.videos[videoIndex].videoTitle}>
              <source src={course.videos[videoIndex].url} />
              <ControlBar autoHide={false} className="my-class" />
              <BigPlayButton position="center" />
            </Player>
            <h1
              style={{
                fontSize: "25px",
                fontFamily: "Bold",
                color: "white",
              }}
            >
              {course.videos[videoIndex].videoTitle}
            </h1>
            <p
              style={{
                fontSize: "19px",
                fontFamily: "Regular",
                color: "white",
              }}
            >
              {course.courseName}
            </p>
            <Divider />
            <Markdown>{formattedMarkdown}</Markdown>
            <Divider />
            <div style={{ height: "15px" }} />
          </Grid>
          <Grid xs={12} sm={3}>
            {course.videos.map((video: any, index: number) => (
              <div
                onClick={() => {
                  setVideoIndex(index);
                }}
              >
                <Card
                  elevation={0}
                  sx={{
                    display: "flex",
                    marginBottom: "8px",
                    height: "100px",
                    //bgcolor: "rgba(255, 255, 255,0.05)",
                    bgcolor:
                      videoIndex == index
                        ? "rgba(255, 255, 255,0.05)"
                        : "transparent",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{
                      width: "160px",
                      aspectRatio: "16/9",
                      borderRadius: "10px",
                    }}
                    image={course.courseImage}
                    alt="Image description"
                  />
                  <div>
                    <CardContent>
                      <div
                        style={{
                          padding: "10px",
                          color: "white",
                        }}
                      >
                        <p style={{ margin: "0px", fontFamily: "Bold" }}>
                          {video.videoTitle}
                        </p>
                        <p style={{ margin: "0px", fontFamily: "Regular" }}>
                          {course.courseName}
                        </p>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </div>
            ))}
          </Grid>
        </Grid>
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

export default VideoPlayer;
