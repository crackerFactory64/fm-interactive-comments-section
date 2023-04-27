import React from "react";
import Comment from "./Comment";
export default function Replies(props) {
  const repliesElement = [];

  function displayReplies(replies, currentUser) {
    for (let i = 0; i < replies.length; i++) {
      const { content, createdAt, id, score, user, replyingTo } = replies[i];
      repliesElement.push(
        <Comment
          key={id}
          currentUser={props.currentUser}
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

  return (
    <div className="comment__replies">{displayReplies(props.replies)}</div>
  );
}
