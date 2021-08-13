// ============================================================================
const express = require('express');
const hbs = require("hbs");
const path = require("path");
const app = express();

// taking Weather data
const weatherData = require('../utils/weatherData');

// To detect our port
const port = process.env.PORT || 3000

// locating our local files
const publicStaticDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// passing address of views and partial to express
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicStaticDirPath));

// setting up start and end points
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App'
    })
})


app.get('/weather', (req, res) => {
    const address = req.query.address
    if(!address) {
        return res.send({
            error: "Please enter your location in the search box!"
        })
    }

    weatherData(address, (error, {temperature, description, cityName} = {}) => {
        if(error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    })
});

app.get("*", (req, res) => {
    res.render('404', {
        title: "No info available!"
    })
})


app.listen(port, () => {
    console.log("Server is up and running on port: ", port);
})