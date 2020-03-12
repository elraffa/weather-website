const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiZWxyYWZmYSIsImEiOiJjazdocndydTAwZHFkM2xxa21qZHV2amc4In0.RKAf7eaD2qi5f-w-5iuu2w&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('There was a connection error', undefined);
    } else if (body.features.length === 0) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
