import React from "react";
export default function Input(props) {
  const { currentUser, replyingTo } = props;
  return (
    <section className={replyingTo ? "input reply" : "input"}>
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
          rows="4"
          id="comment"
          placeholder="Add a comment..."
          defaultValue={replyingTo ? `@${replyingTo} ` : ""}
        />
        <button>{replyingTo ? "Reply" : "Send"}</button>
      </form>
    </section>
  );
}
