import React from "react";

export default function Score(props) {
  const { buttonState, decrementScore, incrementScore, score } = props;

  return (
    <div className="comment__score-controls">
      <button
        className="comment__score-button"
        onClick={incrementScore}
        disabled={buttonState.plusDisabled}
      >
        +
      </button>
      <p>{score}</p>
      <button
        className="comment__score-button"
        onClick={decrementScore}
        disabled={buttonState.minusDisabled}
      >
        -
      </button>
    </div>
  );
}
