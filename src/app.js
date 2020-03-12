const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
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
    title: 'Weather App',
    name: 'Fred Raffa'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Fred Raffa'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    name: 'Freddy Raffa',
    msg: 'What can i help you with?'
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
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
      error: 'You must provide a search term'
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
    name: 'Freddy Raffa'
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 not found',
    msg: '404 Page Not Found',
    name: 'Freddy Raffa'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
