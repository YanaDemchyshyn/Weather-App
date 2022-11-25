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
}
let apiKey = "14b37c21t13746dfa0b52a2b355co69b";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query={Kyiv}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
