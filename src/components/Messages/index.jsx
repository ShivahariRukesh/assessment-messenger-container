import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, incrementPage } from "../../redux/userSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { List, Avatar, Spin } from "antd";
import "./styles.css";
import {
  FileOutlined,
  GifOutlined,
  PlusCircleFilled,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { getInitials } from "./helper";
const Messages = () => {
  const [isFetching, setIsFetching] = useState(false);
  const dispatch = useDispatch();
  const { users, page, loading, hasMore } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers(page));
  }, []);

  const loadMoreUsers = useCallback(() => {
    if (!hasMore || isFetching) return;

    setIsFetching(true);
    setTimeout(() => {
      dispatch(incrementPage());
      dispatch(fetchUsers(page + 1));
      setIsFetching(false);
    }, 500);
  }, [dispatch, page, hasMore, isFetching]);

  const renderMessage = (user, index) => {
    const isIncoming = index % 2 === 0;
    return (
      <List.Item key={user.id}>
        <div
          style={{
            display: "flex",
            justifyContent: isIncoming ? "flex-start" : "flex-end",
            width: "100%",
            flexGrow: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              backgroundColor: isIncoming ? "#a6b0bf" : "#0084ff",
              color: isIncoming ? "black" : "white",
              padding: "10px",
              borderRadius: "15px",
              maxWidth: "60%",
            }}
          >
            <div
              className={`profile-avatar ${
                isIncoming ? "incoming-message" : "outgoing-message"
              }`}
            >
              {getInitials(user.name)}
            </div>

            <span style={{ marginLeft: 10, marginTop: 8 }}>{user.name}</span>
          </div>
        </div>
      </List.Item>
    );
  };

  return (
    <div className="message-container">
      <div
        id="scrollableDiv"
        style={{
          height: "88%",
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
          padding: "10px",
        }}
      >
        <InfiniteScroll
          dataLength={users.length}
          next={loadMoreUsers}
          hasMore={hasMore}
          loader={loading && <Spin />}
          scrollableTarget="scrollableDiv"
          inverse={true}
          style={{ overflow: "unset" }}
        >
          <List
            dataSource={users}
            split={false}
            renderItem={(user, index) => renderMessage(user, index)}
          />
        </InfiniteScroll>
      </div>

      <div className="messenger-footer">
        <div className="footer-icons">
          <button className="icon-btn">
            <PlusCircleFilled />
          </button>
          <button className="icon-btn">
            <FileOutlined />
          </button>
          <button className="icon-btn">
            <GifOutlined />
          </button>
        </div>
        <input
          type="text"
          className="message-input"
          placeholder="Just a demo..."
        />
        <button className="send-btn" onClick>
          Send
        </button>
      </div>
    </div>
  );
};

export default Messages;
