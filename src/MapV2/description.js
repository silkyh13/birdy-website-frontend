import React from "react";
import { observer } from "mobx-react-lite";
const POSITION_CLASSES = {
  bottomleft: "leaflet-bottom leaflet-left",
  bottomright: "leaflet-bottom leaflet-right",
  topleft: "leaflet-top leaflet-left",
  topright: "leaflet-top leaflet-right"
};
const Description = observer(({ store }) => {
  return (
    <div className={POSITION_CLASSES.topright}>
      <div className="leaflet-control leaflet-bar">
        <div className="info">
          <h4>
            {store.highlightedCounty
              ? `${store.highlightedCounty} County`
              : "Hover Over A County"}
          </h4>
          <br />
        </div>
      </div>
    </div>
  );
});
export default Description;
