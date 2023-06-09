import React from "react";
import data from "./data.json";
import Comment from "./Comment";
import Input from "./Input";

function App() {
  const currentUser = data.currentUser;
  const [comments, setComments] = React.useState(
    JSON.parse(localStorage.getItem("comments"))
      ? JSON.parse(localStorage.getItem("comments"))
      : data.comments
  );

  React.useEffect(() => {
    localStorage.setItem("comments", JSON.stringify(comments));
  }, [comments]);

  function addNewComment(content) {
    const CURRENT_TIME = new Date().getTime();

    const newComment = {
      content: content,
      createdAt: CURRENT_TIME,
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

  function editComment(commentToEdit, content, parentCommentId) {
    if (!parentCommentId) {
      setComments((prevState) => {
        return prevState.map((comment) =>
          comment.id === commentToEdit
            ? { ...comment, content: content }
            : comment
        );
      });
    } else {
      const parentCommentCopy = comments.filter(
        (comment) => comment.id === parentCommentId
      )[0];

      const newReplies = parentCommentCopy.replies.map((reply) =>
        reply.id === commentToEdit ? { ...reply, content: content } : reply
      );

      setComments((prevState) => {
        return prevState.map((comment) => {
          return comment.id === parentCommentId
            ? {
                ...comment,
                replies: newReplies,
              }
            : comment;
        });
      });
    }
  }

  function addNewReply(content, id, replyingTo) {
    const CURRENT_TIME = new Date().getTime();
    const newReply = {
      content: content,
      createdAt: CURRENT_TIME,
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

  function changeScore(isUpvote, commentId, parentCommentId) {
    if (!parentCommentId) {
      setComments((prevState) =>
        prevState.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                score: isUpvote ? comment.score + 1 : comment.score - 1,
              }
            : comment
        )
      );
    } else {
      const parentCommentCopy = comments.filter(
        (comment) => comment.id === parentCommentId
      )[0];

      const newReplies = parentCommentCopy.replies.map((reply) =>
        reply.id === commentId
          ? { ...reply, score: isUpvote ? reply.score + 1 : reply.score - 1 }
          : reply
      );

      setComments((prevState) =>
        prevState.map((comment) =>
          comment.id === parentCommentId
            ? {
                ...comment,
                replies: newReplies,
              }
            : comment
        )
      );
    }
  }

  const commentsElements = comments
    .sort((a, b) => (a.score > b.score ? -1 : 1))
    .map((comment) => {
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
          editComment={editComment}
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
    <main>
      <section className="comments">{commentsElements}</section>
      <Input
        currentUser={currentUser}
        className="input main"
        addNewComment={addNewComment}
      />
    </main>
  );
}

export default App;
