import { Routes, Route } from "react-router-dom";
import Login from "./pages/login/Login";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import NotAuthorized from "./pages/login/NotAuthorized";
import Intro from "./pages/intro/Intro";
import Home from "./pages/home/Home";
import AdminConsole from "./pages/adminconsole/AdminConsole";
import Users from "./pages/adminconsole/Users";
import Quizzes from "./pages/adminconsole/Quizzes";
import SpaceEditor from "./pages/editors/markdown/spaceeditor";

import StarComponent from "./components/new/Starry";
import VideoPlayer from "./pages/player/VideoPlayer";
import MainHome from "./pages/home/MainHome";
import WebBuilder from "./pages/web-builder/WebBuilder";

const Links = () => {
  return (
    <Routes>
      <Route path="/web-builder" element={<WebBuilder />} />

      <Route path="/signin" element={<Login />} />
      <Route path="/NotAuthorized" element={<NotAuthorized />} />
      <Route path="/Intro" element={<Intro />} />
      <Route path="/Editor" element={<SpaceEditor />} />
      <Route path="/Stars" element={<StarComponent />} />

      <Route path="/" element={<ProtectedRoute element={<Home />} />}>
        <Route index element={<MainHome />} />{" "}
        {/* MainHome as the default view */}
        <Route path="player/:courseId" element={<VideoPlayer />} />
      </Route>
      <Route
        path="/AdminConsole"
        element={<ProtectedRoute element={<AdminConsole />} />}
      >
        <Route path="users" element={<Users />} />
        <Route path="quizzes" element={<Quizzes />} />
      </Route>

      {/*  <Route path="/" element={<ProtectedRoute element={<Dashboard />} />}>
        <Route index element={<Home />} />
        <Route path="Inbox" element={<Inbox />} />
        <Route path="FacultyDirectory" element={<Facdirec />} />
        <Route path="StudentDirectory" element={<Studirec />} />
        <Route
          path="Departments"
          element={<ProtectedRoute element={<Departments />} />}
        />
        <Route path="CampusNews" element={<Campusnews />} />

        <Route
          path="Departments/ViewDepartment"
          element={<ProtectedRoute element={<Viewdept />} />}
        />
        <Route
          path="Departments/ViewDepartment/Programs"
          element={<Programs />}
        />
      </Route> */}
    </Routes>
  );
};

export default Links;
