import React from "react";
import { observer } from "mobx-react-lite";
import myTimer from "./observableStore";
const TimerView = observer(({ timer }) => {
  return (
    <div>
      <span>Seconds passed: {timer.secondsPassed}</span>
      <button
        onClick={() => {
          myTimer.increaseTimer();
        }}
      >
        click me
      </button>
    </div>
  );
});

export default TimerView;
