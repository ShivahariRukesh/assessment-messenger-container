// import React from "react";
// import "./styles.css";
// const index = () => {
//   return (
//     <div className="message-container">
//       For the figure sometimes referred to as Death, see Personifications of
//       death. "Dead" redirects here. For other uses, see Dead (disambiguation)
//       and Death (disambiguation). "Deceased" redirects here. For the band, see
//       Deceased (band). A 17th century painting of various objects, the most
//       prominent of which is a human skull. The human skull is used universally
//       as a symbol of death. Death is the end of life; the irreversible cessation
//       of all biological functions that sustain a living organism.[1] The remains
//       of a former organism normally begin to decompose shortly after death.[2]
//       Death eventually and inevitably occurs in all organisms. Some organisms,
//       such as Turritopsis dohrnii, are biologically immortal; however, they can
//       still die from means other than aging.[3] Death is generally applied to
//       whole organisms; the equivalent for individual components of an organism,
//       such as cells or tissues, is necrosis.[4] Something that is not considered
//       an organism, such as a virus, can be physically destroyed but is not said
//       to die, as a virus is not considered alive in the first place.[5] As of
//       the early 21st century, 56 million people die per year. The most common
//       reason is aging,[6] followed by cardiovascular disease, which is a disease
//       that affects the heart or blood vessels.[7] As of 2022, an estimated total
//       of almost 110 billion humans have died, or roughly 94% of all humans to
//       have ever lived.[8] A substudy of gerontology known as biogerontology
//       seeks to eliminate death by natural aging in humans, often through the
//       application of natural processes found in certain organisms.[9] However,
//       as humans do not have the means to apply this to themselves, they have to
//       use other ways to reach the maximum lifespan for a human, often through
//       lifestyle changes, such as calorie reduction, dieting, and exercise.[10]
//       The idea of lifespan extension is considered and studied as a way for
//       people to live longer. Determining when a person has definitively died has
//       proven difficult. Initially, death was defined as occurring when breathing
//       and the heartbeat ceased, a status still known as clinical death.[11]
//       However, the development of cardiopulmonary resuscitation (CPR) meant that
//       such a state was no longer strictly irreversible.[12] Brain death was then
//       considered a more fitting option, but several definitions exist for this.
//       Some people believe that all brain functions must cease. Others believe
//       that even if the brainstem is still alive, the personality and identity
//       are irretrievably lost, so therefore, the person should be considered
//       entirely dead.[13] Brain death is sometimes used as a legal definition of
//       death.[14] For all organisms with a brain, death can instead be focused on
//       this organ.[15][16] The cause of death is usually considered important and
//       an autopsy can be done. There are many causes, from accidents to diseases.
//       Many cultures and religions have a concept of an afterlife that may hold
//       the idea of judgment of good and bad deeds in one's life. There are also
//       different customs for honoring the body, such as a funeral, cremation, or
//       sky burial.[17] After a death, an obituary may be posted in a newspaper,
//       and the "survived by" kin and friends usually go through the grieving
//       process. Diagnosis World Health Organization estimated number of deaths
//       per million persons in 2012 1.054–4.598 4.599–5.516 5.517–6.289
//       6.290–6.835 6.836–7.916 7.917–8.728 8.729–9.404 9.405–10.433 10.434–12.233
//       12.234–17.141 Problems of definition Main article: Medical definition of
//       death The concept of death is the key to human understanding of the
//       phenomenon.[18] There are many scientific approaches and various
//       interpretations of the concept. Additionally, the advent of
//       life-sustaining therapy and the numerous criteria for defining death from
//       both a medical and legal standpoint have made it difficult to create a
//       single unifying definition.[19] Defining life to define death One of the
//       challenges in defining death is in distinguishing it from life. As a point
//       in time, death seems to refer to the moment when life ends. Determining
//       when death has occurred is difficult, as cessation of life functions is
//       often not simultaneous across organ systems.[20] Such determination,
//       therefore, requires drawing precise conceptual boundaries between life and
//       death. This is difficult due to there being little consensus on how to
//       define life.
//     </div>
//   );
// };

// export default index;

import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers, incrementPage } from "../../redux/userSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import { List, Spin } from "antd";
import "./styles.css";
import { FileOutlined, GifOutlined, PlusCircleFilled } from "@ant-design/icons";
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
          height: "85%",
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
          // style={{ overflow: "unset" }}
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
        <button className="send-btn">Send</button>
      </div>
    </div>
  );
};

export default Messages;
