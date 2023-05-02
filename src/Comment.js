import React from "react";
import Replies from "./Replies";
import Input from "./Input";

export default function Comment(props) {
  const {
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

  const [isReplying, setIsReplying] = React.useState(false);
  const [currentScore, setCurrentScore] = React.useState(score);
  const [buttonState, setButtonState] = React.useState({
    plus: false,
    minus: false,
  });

  const dialogRef = React.useRef(null);

  function toggleReplyInput() {
    setIsReplying((prevState) => !prevState);
  }

  function incrementScore(e) {
    setCurrentScore((prevState) => prevState + 1);
    setButtonState({ ...buttonState, plus: !buttonState.plus, minus: false });
  }

  function decrementScore(e) {
    setCurrentScore((prevState) => prevState - 1);
    setButtonState({ ...buttonState, plus: false, minus: !buttonState.minus });
  }

  return (
    <div className="comment-wrapper">
      <article
        className={
          currentUser.username === username ? "comment user-comment" : "comment"
        }
      >
        <div>
          <div className="comment__score-controls-wrapper">
            <div className="comment__score-controls">
              <button
                className="comment__score-button"
                onClick={(e) => incrementScore(e)}
                disabled={buttonState.plus}
              >
                +
              </button>
              <p>{currentScore}</p>
              <button
                className="comment__score-button"
                onClick={(e) => decrementScore(e)}
                disabled={buttonState.minus}
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
            <button className="comment__edit-button" /*onClick={editComment}*/>
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
                className="comment__edit-button" /*onClick={editComment}*/
              >
                Edit
              </button>
            </div>
          </div>
          <p className="comment__content">
            <span className="comment__addressee">
              {replyingTo && `@${replyingTo} `}
            </span>
            {content}
          </p>
        </div>
      </article>
      {replies && <Replies currentUser={currentUser} replies={replies} />}
      <Input
        currentUser={currentUser}
        replyingTo={username}
        show={isReplying}
      />

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
