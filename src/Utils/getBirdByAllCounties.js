const getBird = (selectedBird, setBirdCounty) => {
  let temp = "https://birds-matter-bsy5ryjgsa-ue.a.run.app/bird";
  return fetch(temp, {
    method: "get",
    headers: new Headers({
      "Content-Type": "application/x-www-form-urlencoded"
    })
  })
    .then((res) => {
      return res.json();
    })
    .then((resJson) => {
      let results = {};

      resJson.data.forEach((item) => {
        if (item.name === selectedBird && item.locations) {
          //set an array of countries for the selected bird
          setBirdCounty(item.locations);
        }
        //bird county: [bird species]
        item.locations &&
          item.locations.forEach((elem) => {
            if (results[elem]) {
              results[elem].push(item.id);
            } else {
              results[elem] = [item.id];
            }
          });
      });
      return results;
    });
};

const getColorByState = (state) => {
  if (state === "36") {
    return "#fed258dd";
  } else {
    return "#FFEDA0dd";
  }
};
const setNewStyle = (weight, color, dashArray, fillOpacity, opacity) => {
  return { weight, color, dashArray, fillOpacity, opacity };
};
const getBirdCountiesColor = (county, birdCounties) => {
  if (birdCounties && birdCounties.includes(county)) {
    return {
      weight: 1,
      color: "salmon",
      fillOpacity: 0.5,
      opacity: 1,
      fillColor: "salmon"
    };
  } else {
    return {
      weight: 2,
      color: "transparent"
    };
  }
};
const highlightSelectedCounty = (county, birdCounties, feature) => {
  if (birdCounties && birdCounties.includes(county)) {
    return {
      weight: 1,
      color: "salmon",
      fillOpacity: 0.5,
      opacity: 1,
      fillColor: "salmon"
    };
  } else {
    return getDefaultCountyStyle(feature);
  }
};
const getBirdV2 = () => {
  let url = "https://birds-matter-bsy5ryjgsa-ue.a.run.app/bird";
  url = "https://birds-matter-bsy5ryjgsa-ue.a.run.app/bird";
  return fetch(url, {
    method: "get"
  })
    .then((res) => {
      return res.json();
    })
    .then((resJson) => {
      console.log("unified bird data", resJson);
      return resJson.data;
    });
};
const getSelectedBird = (selectedBird) => {
  let url = `https://birds-matter-bsy5ryjgsa-ue.a.run.app/bird/${selectedBird}`;
  return fetch(url, {
    method: "get"
  })
    .then((res) => {
      return res.json();
    })
    .then((resJson) => {
      console.log("selected bird data", resJson);
      return resJson;
    });
};
const postBird = (
  id = "",
  name = "",
  image = "",
  description = "",
  life_history = "",
  distribution_and_habitat = "",
  status = "",
  management_and_research_needs = "",
  locations = []
) => {
  let url = "https://birds-matter-bsy5ryjgsa-ue.a.run.app/bird";
  return fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id,
      name,
      image,
      description,
      life_history,
      distribution_and_habitat,
      status,
      management_and_research_needs,
      locations
    })
  }).then((response) => {
    console.log("status!", response);
    return response
  });
};
const updateBird = (
  id = "",
  name = "",
  image = "",
  description = "",
  life_history = "",
  distribution_and_habitat = "",
  status = "",
  management_and_research_needs = "",
  locations = []
) => {
  let url = `https://birds-matter-bsy5ryjgsa-ue.a.run.app/bird/${id}`;
  fetch(url, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      id,
      name,
      image,
      description,
      life_history,
      distribution_and_habitat,
      status,
      management_and_research_needs,
      locations
    })
  }).then((response) => {
    console.log("status!", response);
  });
};
const resetData = () => {
  let url = "https://birds-matter-bsy5ryjgsa-ue.a.run.app/reset-data";
  fetch(url, {
    method: "post",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({})
  }).then((response) => {
    console.log("status!", response);
  });
};
const getSelectedCountyStyle = () => {
  return {
    ...setNewStyle(2, "black", "3", 0.5, 1),
    fillColor: "green"
  };
};
const getDefaultCountyStyle = (feature) => {
  return {
    ...setNewStyle(1, "#917343", "3", 0.5, 1),
    fillColor: getColorByState(feature.properties.STATE)
  };
};
const getHighlightedCountyStyle = () => {
  return { ...setNewStyle(2, "#1d170d", "3", 0.5, 1) };
};

export default {
  getBirdV2,
  getBird,
  getColorByState,
  setNewStyle,
  getBirdCountiesColor,
  getSelectedBird,
  getSelectedCountyStyle,
  getDefaultCountyStyle,
  getHighlightedCountyStyle,
  postBird,
  updateBird,
  highlightSelectedCounty,
  resetData
};
