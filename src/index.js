function formatDate(getdate) {
    let date = new Date(getdate);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    let day = days[date.getDay()];
    let months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let month = months[date.getMonth()];
    let number = date.getDate();
    return `${day}, ${month} ${number}`;
}
function formatTime(timestamp) {
    let time = new Date(timestamp);
    let hours = time.getHours();
    let minutes = time.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `Last update: ${hours}:${minutes}`;
}
function displayTemperature(response) {
    let temperatureElement = document.querySelector("#currentTemperature");
    temperatureElement.innerHTML = Math.round(
        response.data.temperature.current
    );
    let cityElement = document.querySelector("#city");
    cityElement.innerHTML = response.data.city;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;
    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML = `Humidity: ${response.data.temperature.humidity}%`;
    let pressureElement = document.querySelector("#pressure");
    pressureElement.innerHTML = `Pressure: ${response.data.temperature.pressure}`;
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `Wind speed: ${Math.round(
        response.data.wind.speed
    )} m/s`;
    let timeElement = document.querySelector(".time");
    timeElement.innerHTML = formatTime(response.data.time * 1000);
    let dataElement = document.querySelector(".date");
    dataElement.innerHTML = formatDate(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute(
        "src",
        `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
    );
    celsiusTemp = response.data.temperature.current;
}
search("Kyiv");

function search(city) {
    let apiKey = "14b37c21t13746dfa0b52a2b355co69b";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}
function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#search-input");
    search(cityInputElement.value);
    getForecast(cityInputElement.value);
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();

    let newDays = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return newDays[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay, index) {
        if (index >= 1 && index <= 4) {
            forecastHTML =
                forecastHTML +
                ` <div class="col-3">
                            <div class="week-day">${formatDay(
                                forecastDay.time
                            )}</div>
                            <div class="img">
                                <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
                                    forecastDay.condition.icon
                                }.png" width="40px" />
                            </div>
                            <div class="temp-forecast">
                                <span class="temp=max">${Math.round(
                                    forecastDay.temperature.maximum
                                )} </span> |
                                <span class="temp=min"> ${Math.round(
                                    forecastDay.temperature.minimum
                                )} </span>
                            </div>
                    </div>`;
        }
    });
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(city) {
    let apiKey = "14b37c21t13746dfa0b52a2b355co69b";
    let apiUrlNew = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrlNew).then(displayForecast);
}
getForecast("Kyiv");
