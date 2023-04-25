import React from "react";
import data from "./data.json";
import Comment from "./Comment";

function App() {
  const currentUser = data.currentUser;
  const comments = data.comments;

  const commentsElements = comments.map((comment) => {
    const { content, createdAt, id, replies, score, user } = comment;

    console.log(user.image.png);

    return (
      <Comment
        key={id}
        score={score}
        userPic={`${user.image.png}`}
        username={user.username}
        timeAdded={createdAt}
        content={content}
        /*replies={replies}*/
      />
    );
  });

  console.log(commentsElements);

  return (
    <div className="App">
      <h1>Hello World</h1>
      {commentsElements}
    </div>
  );
}

export default App;
