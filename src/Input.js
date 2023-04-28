import React from "react";
export default function Input(props) {
  const { currentUser, replyingTo, show } = props;

  const inputRef = React.useRef(null);

  setTimeout(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView();
    }
  }, 50);
  return (
    <section
      className={replyingTo ? "input reply" : "input"}
      style={{ display: show && "grid" }}
    >
      <img
        alt={currentUser.username}
        className="input__user-img"
        src={currentUser.image.png}
      />

      <form className="input__form">
        <label htmlFor="comment" className="hidden">
          Enter a new comment
        </label>
        <textarea
          ref={inputRef}
          rows="4"
          id="comment"
          placeholder="Add a comment..."
        />
        <button>{replyingTo ? "Reply" : "Send"}</button>
      </form>
    </section>
  );
}
