import React from "react";
import data from "./data.json";
import Comment from "./Comment";
import Input from "./Input";

function App() {
  const currentUser = data.currentUser;
  const [comments, setComments] = React.useState(data.comments);

  function addNewComment(content) {
    const newComment = {
      content: content,
      createdAt: "Just now",
      id: comments.length + 1,
      replies: [],
      score: 0,
      user: {
        image: { png: currentUser.image.png, webp: currentUser.image.webp },
        username: currentUser.username,
      },
    };

    setComments((prevState) => [...prevState, newComment]);
  }

  function deleteComment(commentToDelete) {
    setComments((prevState) => {
      return prevState.filter((comment) => comment.id !== commentToDelete);
    });
  }

  const commentsElements = comments.map((comment) => {
    const { content, createdAt, id, replies, score, user } = comment;

    return (
      <Comment
        content={content}
        currentUser={currentUser}
        deleteComment={deleteComment}
        id={id}
        key={id}
        replies={replies}
        score={score}
        timeAdded={createdAt}
        username={user.username}
        userPic={user.image.png}
      />
    );
  });

  return (
    <>
      <section className="comments">{commentsElements}</section>
      <Input currentUser={currentUser} addNewComment={addNewComment} />
    </>
  );
}

export default App;
