import React from "react";
import { Avatar, Dropdown, Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import "./AdminConsole.css";
import { useAuth } from "../../auth/AuthContext";

const { Sider, Content } = Layout;

const AdminConsole: React.FC = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();
  const avatarUrl = `https://robohash.org/${username}.png?size=150x150`;

  const menu = (
    <Menu className="admin-dropdown-menu">
      <Menu.Item
        key="1"
        onClick={() => {
          navigate("/");
        }}
      >
        Go home
      </Menu.Item>
      <Menu.Item key="2" onClick={logout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout className="admin-console">
      <Sider width={200} className="admin-sider">
        <h2 className="admin-title">Aveers Admin Console</h2>
        <Menu
          mode="vertical"
          defaultSelectedKeys={["1"]}
          className="admin-menu"
          onClick={({ key }) => {
            switch (key) {
              case "1":
                navigate("/AdminConsole/users");
                break;
              case "2":
                navigate("/AdminConsole/learn");
                break;
              case "3":
                navigate("/AdminConsole/quizzes");
                break;
              default:
                navigate("/AdminConsole/users");
                break;
            }
          }}
        >
          <Menu.Item key="1">Users</Menu.Item>
          <Menu.Item key="2">Learn</Menu.Item>
          <Menu.Item key="3">Quizzes</Menu.Item>
        </Menu>
        <div className="admin-user-section">
          <Dropdown overlay={menu} trigger={["click"]}>
            <div className="user-profile-container">
              <Avatar
                style={{ border: "1px solid rgba(255, 255, 255, 0.3)" }}
                size={40}
                src={avatarUrl}
              />
              <span className="username">{username}</span>
            </div>
          </Dropdown>
        </div>
      </Sider>
      <Content className="admin-content">
        <Outlet />
      </Content>
    </Layout>
  );
};

export default AdminConsole;
