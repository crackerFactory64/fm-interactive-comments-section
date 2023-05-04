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
      id: Math.floor(Math.random * 50000),
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

  function addNewReply(content, parentId) {
    const newReply = {
      content: content,
      createdAt: "Just now",
      id: Math.floor(Math.random() * 50000),
      replies: [],
      score: 0,
      user: {
        image: { png: currentUser.image.png, webp: currentUser.image.webp },
        username: currentUser.username,
      },
    };

    let targetComment;

    comments.forEach((comment) => {
      if (comment.id === parentId) {
        targetComment = comment;
      } else {
        comment.replies.forEach((reply) => {
          if (reply.id === parentId) {
            targetComment = comment;
          }
        });
      }
    });

    //https://stackoverflow.com/questions/29537299/how-can-i-update-state-item1-in-state-using-setstate

    const commentsCopy = comments;
    const targetCommentCopy = commentsCopy.filter(
      (comment) => comment === targetComment
    )[0];
    targetCommentCopy.replies = [...targetCommentCopy.replies, newReply];
    comments.forEach((comment) => {
      if (comment.id === parentId) {
        comment = targetCommentCopy;
      }
    });

    setComments(commentsCopy.slice()); //slice forces a re-render for some reason
  }

  const commentsElements = comments.map((comment) => {
    const { content, createdAt, id, replies, replyingTo, score, user } =
      comment;

    return (
      <Comment
        addNewReply={addNewReply}
        comments={comments}
        content={content}
        currentUser={currentUser}
        deleteComment={deleteComment}
        id={id}
        key={id}
        replyingTo={replyingTo}
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
      <Input
        currentUser={currentUser}
        className="input main"
        addNewComment={addNewComment}
      />
    </>
  );
}

export default App;
