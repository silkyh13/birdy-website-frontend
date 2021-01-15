import ReactDOM from "react-dom";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
class Timer {
  secondsPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increaseTimer() {
    this.secondsPassed += 1;
  }
}

const myTimer = new Timer();
// setInterval(() => {
//   myTimer.increaseTimer();
// }, 1000);
export default myTimer;
