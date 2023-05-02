import React from "react";
export default function Input(props) {
  const { currentUser, replyingTo, show, addNewComment } = props;
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef(null);

  setTimeout(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView();
    }
  }, 50);

  function handleChange(e) {
    setInputValue(e.target.value);
  }

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
          id="comment"
          onChange={handleChange}
          placeholder={replyingTo ? `@${replyingTo}` : "Add a comment..."}
          ref={replyingTo && inputRef}
          rows="4"
          value={inputValue}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            addNewComment(inputValue);
          }}
        >
          {replyingTo ? "Reply" : "Send"}
        </button>
      </form>
    </section>
  );
}
