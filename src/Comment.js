import React from "react";
import Replies from "./Replies";
import Input from "./Input";

export default function Comment(props) {
  const {
    comments,
    content,
    currentUser,
    deleteComment,
    id,
    replies,
    replyingTo,
    score,
    timeAdded,
    username,
    userPic,
  } = props;

  const parentComment = findParentComment();
  const parentCommentReplies = parentComment ? parentComment.replies : [];

  const [savedReplies, setSavedReplies] = React.useState(replies);
  const [savedParentCommentReplies, setSavedParentCommentReplies] =
    React.useState(parentCommentReplies);
  const [savedContent, setSavedContent] = React.useState(content);
  const [inputValue, setinputValue] = React.useState(savedContent);

  const [isReplying, setIsReplying] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [currentScore, setCurrentScore] = React.useState(score);
  const [buttonState, setButtonState] = React.useState({
    plusDisabled: false,
    minusDisabled: false,
  });

  const dialogRef = React.useRef(null);
  const editRef = React.useRef(null);

  function findParentComment() {
    let result;

    if (replyingTo) {
      comments.forEach((comment) => {
        if (comment.replies.filter((reply) => reply.id === id).length > 0) {
          result = comment;
        }
      });
    } else {
      result = null;
    }

    return result;
  }

  function toggleReplyInput() {
    setIsReplying((prevState) => !prevState);
  }

  function addNewReply(content) {
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

    if (savedParentCommentReplies.length) {
      setSavedParentCommentReplies([...savedParentCommentReplies, newReply]);
    } else {
      setSavedReplies([...savedReplies, newReply]);
    }
  }

  function toggleEditInput(e) {
    setIsEditing((prevState) => !prevState);
    if (isEditing && e.target.className === "comment__edit-button") {
      //if the editing form is closed by pressing the edit button for a second time revert the input value to the previously saved content...
      setinputValue(savedContent);
    } else {
      //...and if not, it must have been closed via the update button so save the changes
      setSavedContent(inputValue);
    }
    setTimeout(() => editRef.current.focus(), 50);
  }

  function handleChange(e) {
    setinputValue(e.target.value);
  }

  function incrementScore(e) {
    setCurrentScore((prevState) => prevState + 1);
    setButtonState({
      ...buttonState,
      plusDisabled: !buttonState.plus,
      minusDisabled: false,
    });
  }

  function decrementScore(e) {
    setCurrentScore((prevState) => prevState - 1);
    setButtonState({
      ...buttonState,
      plusDisabled: false,
      minusDisabled: !buttonState.minus,
    });
  }

  return (
    <div className="comment-wrapper">
      <article
        className={
          currentUser.username === username ? "comment user-comment" : "comment"
        }
        data-editing={isEditing}
      >
        <div>
          <div className="comment__score-controls-wrapper">
            <div className="comment__score-controls">
              <button
                className="comment__score-button"
                onClick={(e) => incrementScore(e)}
                disabled={buttonState.plusDisabled}
              >
                +
              </button>
              <p>{currentScore}</p>
              <button
                className="comment__score-button"
                onClick={(e) => decrementScore(e)}
                disabled={buttonState.minusDisabled}
              >
                -
              </button>
            </div>
          </div>
          <div className="comment__buttons mobile">
            <button
              className="comment__delete-button"
              onClick={() => {
                dialogRef.current.showModal();
              }}
            >
              Delete
            </button>
            <button
              className="comment__reply-button"
              onClick={toggleReplyInput}
            >
              Reply
            </button>
            <button className="comment__edit-button" onClick={toggleEditInput}>
              Edit
            </button>
          </div>
        </div>
        <div>
          <div className="comment__header">
            <img alt={username} className="comment__user-pic" src={userPic} />
            <div className="comment__username-wrapper">
              <span className="comment__username">{username}</span>
              <span className="comment__you-label">you</span>
            </div>
            <span className="comment_time-added">{timeAdded}</span>
            <div className="comment__buttons">
              <button
                className="comment__delete-button"
                onClick={() => {
                  dialogRef.current.showModal();
                }}
              >
                Delete
              </button>
              <button
                className="comment__reply-button"
                onClick={toggleReplyInput}
              >
                Reply
              </button>
              <button
                className="comment__edit-button"
                onClick={toggleEditInput}
              >
                Edit
              </button>
            </div>
          </div>
          <p className="comment__content">
            <span className="comment__addressee">
              {replyingTo && `@${replyingTo} `}
            </span>
            {savedContent}
          </p>
          <div className="comment__edit-wrapper">
            <form className="comment__edit-form">
              <label className="hidden" htmlFor="edit-comment">
                Edit your comment
              </label>
              <textarea
                ref={editRef}
                id="edit-comment"
                onChange={(e) => handleChange(e)}
                onSubmit={(e) => {
                  e.preventDefault();
                  toggleEditInput(e);
                }}
                rows={4}
                value={inputValue}
              ></textarea>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  toggleEditInput(e);
                }}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </article>

      {savedReplies && (
        <Replies
          comments={comments}
          currentUser={currentUser}
          deleteComment={deleteComment}
          replies={savedReplies}
        />
      )}

      <div className="comment__reply-wrapper">
        <Input
          addNewReply={addNewReply}
          className=""
          currentUser={currentUser}
          id={id}
          replyingTo={username}
          show={isReplying}
        />
      </div>
      <dialog className="comment__delete-dialog" ref={dialogRef}>
        <h2>Delete comment</h2>
        <p>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </p>
        <div>
          <button
            onClick={() => {
              document
                .querySelectorAll(".comment__delete-dialog")
                .forEach((modal) => modal.close());
            }}
          >
            No, cancel
          </button>
          <button onClick={() => deleteComment(id)}>Yes, delete</button>
        </div>
      </dialog>
    </div>
  );
}