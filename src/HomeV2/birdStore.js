import ReactDOM from "react-dom";
import { makeAutoObservable } from "mobx";
import { observer } from "mobx-react-lite";
class BirdStore {
  birdListInfo = [];
  birdList = [];
  highlightedCounty = "";
  constructor() {
    makeAutoObservable(this);
  }

  setBirdList(list) {
    this.birdList = list;
  }

  setHighlightedCounty(county) {
    this.highlightedCounty = county;
  }
  setBirdListInfo(information) {
    this.birdListInfo = information;
  }
}

const birdStoreInstance = new BirdStore();
export default birdStoreInstance;
