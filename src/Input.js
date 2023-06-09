import React from "react";
export default function Input(props) {
  const {
    addNewComment,
    addNewReply,
    className,
    currentUser,
    parentId,
    replyingTo,
    show,
    toggleReplyInput,
  } = props;
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef(null);

  setTimeout(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.scrollIntoView();
    }
  }, 50);

  function generateId() {
    return `${Math.floor(Math.random() * 50000)}-comment`;
  }

  const id = generateId();

  function handleChange(e) {
    setInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (replyingTo) {
      addNewReply(inputValue, parentId, replyingTo);
      toggleReplyInput();
      window.scrollTo(0, window.scrollY * 0.9);
    } else {
      addNewComment(inputValue);
    }
    setInputValue("");
  }

  return (
    <div
      className={className ? className : "input"}
      style={{ display: show && "grid" }}
    >
      <img
        alt={currentUser.username}
        className="input__user-img"
        src={currentUser.image.png}
      />

      <form className="input__form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor={id} className="hidden">
          Enter a new comment
        </label>
        <textarea
          id={id}
          onChange={handleChange}
          placeholder={replyingTo ? `@${replyingTo}` : "Add a comment..."}
          ref={replyingTo && inputRef}
          rows="4"
          value={inputValue}
        />
        <button>{replyingTo ? "Reply" : "Send"}</button>
      </form>
    </div>
  );
}
