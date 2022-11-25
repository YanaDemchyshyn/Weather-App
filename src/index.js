function formatDate(getdate) {
    let date = new Date(getdate);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Suterday",
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
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);
