import React from "react";
import Replies from "./Replies";

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

  return (
    <div className="comment-wrapper">
      <article
        className={
          currentUser === username ? "comment user-comment" : "comment"
        }
      >
        <div>
          <div className="comment__score-controls-wrapper">
            <div className="comment__score-controls">
              <button /*onClick={incrementScore}*/>+</button>
              <p>{score}</p>
              <button /*onClick={decrementScore}*/>-</button>
            </div>
          </div>
        </div>
        <div>
          <div className="comment__header">
            <img className="comment__user-pic" src={userPic} />
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
              <button className="comment__reply-button" /*onClick={addReply}*/>
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
    </div>
  );
}
