import React from "react";
import Comment from "./Comment";
export default function Replies(props) {
  const repliesElement = [];

  function displayReplies(props) {
    const { comments, currentUser, deleteComment, replies } = props;

    if (replies) {
      for (let i = 0; i < replies.length; i++) {
        const { content, createdAt, id, score, user, replyingTo } = replies[i];

        repliesElement.push(
          <Comment
            comments={comments}
            content={content}
            currentUser={currentUser}
            deleteComment={deleteComment}
            id={id}
            key={id}
            replyingTo={replyingTo}
            score={score}
            timeAdded={createdAt}
            username={user.username}
            userPic={user.image.png}
          />
        );
      }
    }
    return repliesElement;
  }

  return <div className="comment__replies">{displayReplies(props)}</div>;
}
