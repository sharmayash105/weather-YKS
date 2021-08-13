// This JAVASCRIPT is for the front end part
// Fetching data from backend
var fetchWeather = '/weather';

// creating a form in order to display received data
const weatherForm = document.querySelector('form');

// creating seachbox to search a city
const search = document.querySelector('input');

// working on decoration and individual informations
const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperatur span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');

// creating array of months
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
// using VS code to get new date
dateElement.textContent = new Date().getDate() + monthNames[new Date().getMonth()].substring(0, 3);

weatherForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    locationElement.textContent = "Just a moment...";
    tempElement.textContent = "";
    weatherCondition.textContent = "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error){
                locationElement.textContent = data.error;
    tempElement.textContent = "";
    weatherCondition.textContent = "";
            }else if(!body.main || !body.main.temp || !body.weather){
                callback("Invalid location, please try another locaton", undefined);
            }
            else{
                locationElement.textContent = data.cityName;
    tempElement.textContent = (data.temperature - 273.15).toFixed(2) + String.fromCharCode(176);
    weatherCondition.textContent = data.description.toUpperCase();
            }
        })
    });
})
