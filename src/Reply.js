import React from "react";
import Comment from "./Comment";
export default function Reply(props) {
  const {
    addNewReply,
    changeScore,
    comments,
    content,
    createdAt,
    currentUser,
    deleteComment,
    editComment,
    id,
    parentComment,
    replyingTo,
    score,
    user,
  } = props;

  return (
    <Comment
      addNewReply={addNewReply}
      changeScore={changeScore}
      comments={comments}
      content={content}
      currentUser={currentUser}
      deleteComment={deleteComment}
      editComment={editComment}
      id={id}
      key={id}
      parentComment={parentComment}
      replyingTo={replyingTo}
      score={score}
      timeAdded={createdAt}
      username={user.username}
      userPic={user.image.png}
    />
  );
}
