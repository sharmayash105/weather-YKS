const express = require('express');
const app = express();
const hbs = require('hbs');
const path = require('path');

// taking Weather data
const weatherData = require('../weather_main/weatherData');

// To detect our port
const port = process.env.PORT || 3000

// locating our local files
const publicStaticDirPath = path.join(__dirname, '../public');

// locating views and partial paths
const viewsPath = path.join(__dirname, '../template/views');
const partialsPath = path.join(__dirname, '../template/partials');
// passing address of views and partial to express
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartial(partialsPath);

// passing address of our local files to express
app.use(express.static(publicStaticDirPath));

// setting up start and end points
app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather APP'
    })
})

app.get('/weather', (req, res)=>{
    const address = req.query.address;
    if(!address){
        return res.send({
            error: "Pls enter address in search text box."
        })
    }

    weatherData(address, (error, {temperature, description, cityName} = {})=>{
        if(error){
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
    });
})

app.get('*', (req,res)=>{
    res.render('404', {
        title: "Page not found!"
    });
})

app.listen(port, ()=> {
    console.log("Server is running successfully: ", port);
})