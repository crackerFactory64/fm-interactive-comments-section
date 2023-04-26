import React from "react";
import Comment from "./Comment";
export default function Replies(props) {
  const repliesElement = [];

  function displayReplies(replies) {
    for (let i = 0; i < replies.length; i++) {
      const { content, createdAt, id, score, user, replyingTo } = replies[i];
      repliesElement.push(
        <Comment
          key={id}
          score={score}
          userPic={user.image.png}
          username={user.username}
          timeAdded={createdAt}
          content={content}
          replyingTo={replyingTo}
        />
      );
    }
    return repliesElement;
  }

  return <div className="replies">{displayReplies(props.replies)}</div>;
}
