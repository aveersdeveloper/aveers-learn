import React, { useState, useEffect } from "react";
import { Table, Input, Switch } from "antd";
import { db } from "../../firebaseConfig"; // Adjust path based on your folder structure
import {
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import "./Users.css";

const Users: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedUsers: any[] = [];
      snapshot.forEach((doc) => {
        fetchedUsers.push({ id: doc.id, ...doc.data() });
      });
      setUsers(fetchedUsers);
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const handleSwitchChange = async (
    userId: string,
    field: string,
    value: boolean
  ) => {
    // Update the user's isAuthorized or isAdmin field in the database
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { [field]: value });
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.email &&
        user.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Authorized",
      dataIndex: "isAuthorized",
      key: "isAuthorized",
      render: (_text: any, record: any) => (
        <Switch
          checked={record.isAuthorized}
          onChange={(checked) =>
            handleSwitchChange(record.id, "isAuthorized", checked)
          }
        />
      ),
    },
    {
      title: "Admin",
      dataIndex: "isAdmin",
      key: "isAdmin",
      render: (_text: any, record: any) => (
        <Switch
          checked={record.isAdmin}
          onChange={(checked) =>
            handleSwitchChange(record.id, "isAdmin", checked)
          }
        />
      ),
    },
  ];

  return (
    <div className="users-page">
      <Input
        placeholder="Search users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Table columns={columns} dataSource={filteredUsers} rowKey="id" />
    </div>
  );
};

export default Users;
