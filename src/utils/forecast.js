const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url =
    'https://api.darksky.net/forecast/c29f7868184f08a756a5382458643f56/' +
    latitude +
    ',' +
    longitude +
    '?units=si&lang=es';

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to url', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(
        undefined,
        `${body.daily.data[0].summary} Hola! La temperatura actual es de ${
          body.currently.temperature
        } grados y hay un ${body.currently.precipProbability *
          100}% de probabilidad de lluvia. La humedad es de ${body.currently
          .humidity * 100}% y la presión es de ${
          body.currently.pressure
        } hectopascales.`
      );
    }
  });
};

module.exports = forecast;
