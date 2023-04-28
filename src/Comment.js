import React from "react";
import Replies from "./Replies";
import Input from "./Input";

export default function Comment(props) {
  const {
    score,
    userPic,
    currentUser,
    username,
    timeAdded,
    content,
    replies,
    replyingTo,
  } = props;

  const [isReplying, setIsReplying] = React.useState(false);
  const [currentScore, setCurrentScore] = React.useState(score);
  const [buttonState, setButtonState] = React.useState({
    plus: false,
    minus: false,
  });

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
              className="comment__delete-button" /*onClick={deleteComment}*/
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
                className="comment__delete-button" /*onClick={deleteComment}*/
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
      {replies && <Replies replies={replies} currentUser={currentUser} />}
      <Input
        currentUser={currentUser}
        replyingTo={username}
        show={isReplying}
      />
    </div>
  );
}
