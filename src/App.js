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
      id: Math.floor(Math.random() * 50000),
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

  function addNewReply(content, id, replyingTo) {
    const newReply = {
      content: content,
      createdAt: "Just now",
      id: Math.floor(Math.random() * 50000),
      replies: [],
      replyingTo: replyingTo,
      score: 0,
      user: {
        image: { png: currentUser.image.png, webp: currentUser.image.webp },
        username: currentUser.username,
      },
    };

    let targetComment;

    comments.forEach((comment) => {
      if (comment.id === id) {
        targetComment = comment;
      } else {
        comment.replies.forEach((reply) => {
          if (reply.id === id) {
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

    setComments(commentsCopy.slice()); //slice forces a re-render for some reason
  }

  function deleteReply(id, comments) {
    let targetComment;

    comments.forEach((comment) => {
      if (comment.id === id) {
        targetComment = comment;
      } else {
        comment.replies.forEach((reply) => {
          if (reply.id === id) {
            targetComment = comment;
          }
        });
      }
    });

    const commentsCopy = comments;
    const targetCommentCopy = commentsCopy.filter(
      (comment) => comment === targetComment
    )[0];
    targetCommentCopy.replies = targetCommentCopy.replies.filter(
      (reply) => reply.id !== id
    );

    setComments(commentsCopy.slice()); //slice forces a re-render for some reason
  }

  function changeScore(isUpVote, commentId) {
    if (isUpVote) {
      setComments((prevState) =>
        prevState.map((comment) =>
          comment.id === commentId
            ? { ...comment, score: comment.score + 1 }
            : comment
        )
      );
    } else {
      setComments((prevState) =>
        prevState.map((comment) =>
          comment.id === commentId
            ? { ...comment, score: comment.score - 1 }
            : comment
        )
      );
    }

    console.log(comments);
  }

  const commentsElements = comments.map((comment) => {
    const { content, createdAt, id, replies, replyingTo, score, user } =
      comment;
    return (
      <Comment
        addNewReply={addNewReply}
        changeScore={changeScore}
        comments={comments}
        content={content}
        currentUser={currentUser}
        deleteComment={deleteComment}
        deleteReply={deleteReply}
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
