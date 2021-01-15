import React, { useEffect, useState, useRef } from "react";
import someData from "./somdata.js";
import helperFunc from "../Utils/getBirdByAllCounties.js";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import birdStore from "../HomeV2/birdStore";
import Description from "./description";

const Map = ({ locations = [], setSelectedCounty }) => {
  const [data, setData] = useState(someData);
  const [map, setMap] = useState(null);
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
  }, []);
  const maintainBirdCountiesStyle = (name, locations, feature) => {
    return {
      ...helperFunc.highlightSelectedCounty(name, locations, feature)
    };
  };

  const style = (feature) => {
    if (locations.length) {
      return maintainBirdCountiesStyle(
        feature.properties.NAME,
        locations,
        feature
      );
    }
    return helperFunc.getDefaultCountyStyle(feature);
  };

  const highlightFeature = (e) => {
    var layer = e.target;

    if (locations.includes(layer.feature.properties.NAME)) {
    } else {
      birdStore.setHighlightedCounty(layer.feature.properties.NAME);

      layer.setStyle(helperFunc.getHighlightedCountyStyle());
      layer.bringToFront();
    }
  };
  const resetHighlight = (e) => {
    var layer = e.target;
    if (locations.includes(layer.feature.properties.NAME)) {
    } else {
      layer.setStyle(helperFunc.getDefaultCountyStyle(layer.feature));
      birdStore.setHighlightedCounty(null);
    }
  };
  const onClick = (e) => {
    var layer = e.target;
    setSelectedCounty([...locations, layer.feature.properties.NAME]);
    layer.setStyle(helperFunc.setNewStyle(5, "black", "6", 0.7, 1));
    layer.bringToFront();
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
      <Description store={birdStore} />
    </MapContainer>
  );
};

export default Map;
