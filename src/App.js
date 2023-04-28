import React from "react";
import data from "./data.json";
import Comment from "./Comment";
import Input from "./Input";

function App() {
  const currentUser = data.currentUser;
  const comments = data.comments;

  const commentsElements = comments.map((comment) => {
    const { content, createdAt, id, replies, score, user } = comment;

    return (
      <Comment
        key={id}
        currentUser={currentUser}
        score={score}
        userPic={user.image.png}
        username={user.username}
        timeAdded={createdAt}
        content={content}
        replies={replies}
      />
    );
  });

  return (
    <>
      <section className="comments">{commentsElements}</section>
      <Input currentUser={currentUser} />
    </>
  );
}

export default App;
