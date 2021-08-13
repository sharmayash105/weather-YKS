// collecting the information from OpenWeather server
const request = require('request');
const constants = require('../config');

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + '&appid=' + constants;

    request({url, json:true}, (error, {body})=>{
        console.log(body);
        if(error){
            callback("No data received!", undefined)
        } else{
            callback(undefined,{
                temperature: body.main.temperature,
                description: body.weather[0].description,
                cityName: body.name
            })
        }
    })
}
module.exports = weatherData;