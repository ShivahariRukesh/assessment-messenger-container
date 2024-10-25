import React from "react";
import "./styles.css";
import { Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
const Contacts = () => {
  return (
    <div className="contacts-container">
      <h1 className="contacts-title">CONTACTS</h1>

      <div style={{ display: "flex", gap: "5px", marginBottom: "30px" }}>
        <SearchOutlined />
        <input
          type="text"
          className="message-input"
          placeholder="Just a demo..."
        />
        <button className="send-btn">Search</button>
      </div>
      <div className="skeleton-container">
        <div style={{ fontSize: "x-large", marginBottom: "10px" }}>
          Please Go TO Debugger Mode (Press Ctrl+Shift+I)
        </div>
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
      <div className="typewriter-contacts" style={{ marginTop: "20px" }}>
        <h1>To Be Continued...</h1>
      </div>
    </div>
  );
};

export default Contacts;
