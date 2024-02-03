import { Menu, Dropdown, Avatar } from "antd";

import { useAuth } from "../../auth/AuthContext"; // Adjust path based on your folder structure
import "./HomepageHeader.css";

import { useNavigate } from "react-router-dom";

const Subheader: React.FC = () => {
  const { username, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const avatarUrl = `https://robohash.org/${username}.png?size=150x150`;

  const menu = (
    <Menu>
      <Menu.Item key="1">{username}</Menu.Item>
      <Menu.Item key="2" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="subheader">
      <h1
        onClick={() => {
          navigate("/");
        }}
      >
        Aveers Nexus
      </h1>
      <div className="right-section">
        {isAdmin && (
          <button
            className="admin-console-btn"
            onClick={() => {
              navigate("/AdminConsole/users");
            }}
          >
            Admin Console
          </button>
        )}
        <Dropdown overlay={menu} trigger={["click"]}>
          <div className="user-profile">
            <Avatar
              style={{ border: "1px solid rgba(255, 255, 255, 0.3)" }}
              size={50}
              src={avatarUrl}
            />
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Subheader;
