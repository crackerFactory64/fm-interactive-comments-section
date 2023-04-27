import React from "react";
import data from "./data.json";
import Comment from "./Comment";

function App() {
  const currentUser = data.currentUser;
  const comments = data.comments;

  const commentsElements = comments.map((comment) => {
    const { content, createdAt, id, replies, score, user } = comment;

    return (
      <Comment
        key={id}
        currentUser={currentUser.username}
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
      <section className="input">
        <img
          alt={currentUser.username}
          className="input__user-img"
          src={currentUser.image.png}
        />
        <form className="input__form">
          <label htmlFor="comment">Enter a new comment</label>
          <input id="comment" placeholder="Add a comment..."></input>
          <button>Send</button>
        </form>
      </section>
    </>
  );
}

export default App;
