const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, '../templates/views');
const partials = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partials);

// Setup static directory

app.use(express.static(path.join(__dirname, '../public')));

app.get('', (req, res) => {
  res.render('index', {
    title: 'El clima para Mica',
    name: 'Fede R.'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'Acerca de mí',
    name: 'Fede R'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Ayuda',
    name: 'Fede R.',
    msg: 'What can i help you with?'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'Tenés que ingresar una dirección'
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error
        });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({
            error
          });
        }
        res.send({
          location,
          forecast: forecastData,
          addres: req.query.address
        });
      });
    }
  );
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'Tenés que ingresar una ciudad para buscar'
    });
  }

  res.send({
    products: []
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Not Found',
    msg: 'Help article not found',
    name: 'Fede R.'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 not found',
    msg: '404 Page Not Found',
    name: 'Fede R.'
  });
});

app.listen(port, () => {
  console.log('Server is up on port 3000.');
});
