import React from "react";
import Reply from "./Reply";
import Input from "./Input";
import Score from "./Score";

export default function Comment(props) {
  const {
    addNewReply,
    changeScore,
    comments,
    content,
    currentUser,
    deleteComment,
    deleteReply,
    id,
    parentComment,
    replies,
    replyingTo,
    score,
    timeAdded,
    username,
    userPic,
  } = props;

  const [savedContent, setSavedContent] = React.useState(content);
  const [inputValue, setinputValue] = React.useState(savedContent);
  const [isReplying, setIsReplying] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [buttonState, setButtonState] = React.useState({
    plusDisabled: false,
    minusDisabled: false,
  });
  //the following 2 variables track the number of times the user has clicked on the upvote and downvote buttons and are used to disable the corresponding button if they have already voted either way
  const [upvoteClicks, setUpvoteClicks] = React.useState(0);
  const [downvoteClicks, setDownvoteClicks] = React.useState(0);

  React.useEffect(() => {
    setButtonState({
      ...buttonState,
      plusDisabled: upvoteClicks > downvoteClicks,
      minusDisabled: downvoteClicks > upvoteClicks,
    });
  }, [upvoteClicks, downvoteClicks]);

  const dialogRef = React.useRef(null);
  const editRef = React.useRef(null);

  function toggleReplyInput() {
    setIsReplying((prevState) => !prevState);
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

  function incrementScore() {
    setUpvoteClicks((prevState) => prevState + 1);
    changeScore(true, id, parentComment);
  }

  function decrementScore(e) {
    setDownvoteClicks((prevState) => prevState + 1);
    changeScore(false, id, parentComment);
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
            <Score
              buttonState={buttonState}
              decrementScore={decrementScore}
              incrementScore={incrementScore}
              score={score}
              setDownvoteClicks={setDownvoteClicks}
              setUpvoteClicks={setUpvoteClicks}
            />
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

      {replies && (
        <div className="comment__replies">
          {replies.map((reply) => (
            <Reply
              addNewReply={addNewReply}
              changeScore={changeScore}
              content={reply.content}
              comments={comments}
              createdAt={reply.createdAt}
              currentUser={currentUser}
              deleteComment={deleteReply}
              id={reply.id}
              key={reply.id}
              parentComment={id}
              replyingTo={reply.replyingTo}
              score={reply.score}
              user={reply.user}
            />
          ))}
        </div>
      )}

      <div className="comment__reply-wrapper">
        <Input
          addNewReply={addNewReply}
          className=""
          currentUser={currentUser}
          parentId={id}
          replyingTo={username}
          show={isReplying}
          toggleReplyInput={toggleReplyInput}
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
          <button onClick={() => deleteComment(id, comments)}>
            Yes, delete
          </button>
        </div>
      </dialog>
    </div>
  );
}
