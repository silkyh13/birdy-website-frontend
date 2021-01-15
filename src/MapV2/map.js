import React, { useEffect, useState, useRef } from "react";
import someData from "./somdata.js";
import helperFunc from "../Utils/getBirdByAllCounties.js";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import birdStore from "../HomeV2/birdStore";
const Map = ({ selectedBird }) => {
  const [data, setData] = useState(someData);
  const [map, setMap] = useState(null);
  const [countyObj, setCountyObj] = useState({});
  const [freeze, setFreeze] = useState(false);
  const [selectedCounty, setSelectedCounty] = useState(null);
  const getData = () => {
    if (window.countyData) {
      setData(window.countyData);
    } else {
      let url =
        "https://us-central1-leaflet-bird-map.cloudfunctions.net/get-county-map-data";
      fetch(url, {
        method: "get",
        headers: new Headers({
          "Content-Type": "application/x-www-form-urlencoded"
        })
      })
        .then((res) => {
          return res.json();
        })
        .then((resJson) => {
          window.countyData = resJson;
          setData(resJson);
        });
    }
  };
  useEffect(() => {
    getData();
    birdUpdate();
  }, []);
  const maintainBirdCountiesStyle = (name, locations) => {
    return {
      ...helperFunc.getBirdCountiesColor(name, locations)
    };
  };

  const style = (feature) => {
    if (selectedBird) {
      return maintainBirdCountiesStyle(
        feature.properties.NAME,
        selectedBird.locations
      );
    }
    if (
      selectedCounty &&
      JSON.stringify(selectedCounty) === JSON.stringify(feature.properties)
    ) {
      return helperFunc.getSelectedCountyStyle();
    }
    return helperFunc.getDefaultCountyStyle(feature);
  };
  //updating the info of the bird(s) in that county~
  const birdUpdate = async () => {
    //{county: [birds], county: [birds], county: [birds]}
    setCountyObj(await helperFunc.getBird());
  };
  const highlightFeature = (e) => {
    var layer = e.target;
    if (freeze === false) {
      if (selectedBird) {
        return maintainBirdCountiesStyle(
          layer.feature.properties.NAME,
          selectedBird.locations
        );
      } else {
        birdStore.setHighlightedCounty(layer.feature.properties.NAME);

        birdStore.setBirdList(countyObj[layer.feature.properties.NAME]);
        layer.setStyle(helperFunc.getHighlightedCountyStyle());
        layer.bringToFront();
      }
    }
  };
  const resetHighlight = (e) => {
    var layer = e.target;
    if (selectedBird) {
      return maintainBirdCountiesStyle(
        layer.feature.properties.NAME,
        selectedBird.locations
      );
    }
    if (freeze) {
    } else {
      layer.setStyle(helperFunc.getDefaultCountyStyle(layer.feature));
      birdStore.setHighlightedCounty(null);
    }
  };
  const onClick = (e) => {
    var layer = e.target;
    birdStore.setBirdList(countyObj[layer.feature.properties.NAME]);
    setFreeze(!freeze);
    setSelectedCounty(layer.feature.properties);

    if (freeze === false) {
      layer.setStyle(helperFunc.setNewStyle(5, "black", "6", 0.7, 1));
      layer.bringToFront();
    }
  };
  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: onClick
    });
  };
  return (
    <MapContainer
      id="map"
      style={{ height: "60vh" }}
      center={[42.228029, -74.058838]}
      zoom={6}
      scrollWheelZoom={true}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}"
        id="mapbox/outdoors-v11"
        accessToken="pk.eyJ1IjoiYnJpYW56aHU5MiIsImEiOiJja2kxcjlpajcwOTV3MnpsbDFhZWpxYnZ6In0.mc08iw0MBNY2gi2faeG2JA"
      />

      <GeoJSON
        attribution="&copy; credits due..."
        key={Math.round(Math.random() * data.features.length * 71)}
        data={data}
        style={style}
        onEachFeature={onEachFeature}
      />
    </MapContainer>
  );
};

export default Map;
