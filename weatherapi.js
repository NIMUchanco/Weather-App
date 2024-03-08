console.log('weather_app is loaded');

import { API_KEY } from './config.js';

//url = "https://api.openweathermap.org/data/2.5/weather?q=Montreal&appid=f00002b4a94af502e885f0eed608f047&units=metric";
const url = "https://api.openweathermap.org/data/2.5/weather?lat=45.5071018&lon=-73.5874071&appid=${API_KEY}&units=metric";

async function getWeather(url){
    const response = await fetch(url);
    const data = await response.json();
    displayWeather(data);
}

//Other cities
async function getWeatherByCity(city) {
    const city_url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f00002b4a94af502e885f0eed608f047&units=metric`;

    const response = await fetch(city_url);
    const data = await response.json();
    return data;
}

const main = document.querySelector('main');

function displayWeather(data){
    console.log(data);
    // console.log(data.coord.lat, data.coord.lon);
    // console.log(data.main.temp);
    // console.log(data.weather[0].main, data.weather[0].description);

    //HTML codes
    const tempArray = ["temp_min", "temp_max"];

    const section = document.createElement('section');

    const figure = document.createElement('figure');

    const img = document.createElement('img');
    img.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;

    const div = document.createElement('div');
    div.classList.add('temp1');
    div.innerHTML = Math.round(data.main.temp) + "°C";

    const article = document.createElement('article');

    const h2 = document.createElement('h2');
    h2.innerHTML = `<i class="fa-solid fa-map-pin"></i> ${data.name}`;

    const p = document.createElement('p');
    p.classList.add('weather-des');
    p.innerHTML = data.weather[0].description;

    main.appendChild(section);
    section.appendChild(figure);
    section.appendChild(div);
    figure.appendChild(img);
    section.appendChild(article);

    //Loop for Highest and Lowest Temp
    for(let i = 0; i < tempArray.length; i++){
        console.log(tempArray[i]);
        let div = document.createElement('div');
        div.innerHTML = Math.round(data.main[tempArray[i]]) + "°C";
        article.appendChild(div);
        div.classList.add('temp2');
    }

    for(let i = 0; i < tempArray.length; i++){
        let p = document.createElement('p');
        if (i === tempArray.indexOf("temp_max")) {
            p.innerHTML = "highest";
        } else {
            p.innerHTML = "lowest";
        }
        article.appendChild(p);
        p.classList.add('temp2-txt');
    }
    
    article.appendChild(h2);
    article.appendChild(p);

    const additionalDivs = [`${data.main.humidity}%`, `${Math.round(data.main.feels_like)}°C`];
    const additionalLabels = ["humidity", "feeling temperature"];

    for (let i = 0; i < additionalDivs.length; i++) {
        let div = document.createElement('div');
        div.innerHTML = data.main[additionalDivs[i]];
        article.appendChild(div);
        div.classList.add('temp2');
        div.innerHTML = additionalDivs[i];
    }

    for (let i = 0; i < additionalDivs.length; i++) {
        let p = document.createElement('p');
        article.appendChild(p);
        p.classList.add('temp2-txt');
        p.innerHTML = additionalLabels[i];
    }
    
    // Fetch weather data for Tokyo, New York, and Paris
    getWeatherByCity("Tokyo").then(data => displayCityWeather("Tokyo", data));
    getWeatherByCity("New York").then(data => displayCityWeather("New York", data));
    getWeatherByCity("Paris").then(data => displayCityWeather("Paris", data));
}

const citySection = document.createElement('section');
citySection.classList.add('city-section');

//Other cities
function displayCityWeather(city, data) {
    const cityArticle = document.createElement('article');
    cityArticle.classList.add('city-weather');

    const cityName = document.createElement('h3');
    cityName.textContent = city;

    const cityIcon = document.createElement('img');
    cityIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    cityArticle.appendChild(cityName);
    cityArticle.appendChild(cityIcon);
    citySection.appendChild(cityArticle);
    main.appendChild(citySection);

    const div = document.createElement('div');
    div.classList.add('city-temp');
    div.innerHTML = Math.round(data.main.temp) + "°C";
    cityArticle.appendChild(div);
}

function getPosition(){
    navigator.geolocation.getCurrentPosition(showPosition);
}

function showPosition(position){
    console.info(position.coords.latitude, position.coords.longitude);
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=f00002b4a94af502e885f0eed608f047&units=metric
`;
    getWeather(url);
}

getPosition();
