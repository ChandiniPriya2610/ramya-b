const kelvin = 273;

const fetchWeather = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const condition = data.weather[0].description;

            document.querySelector(".temp").textContent =
                Math.floor(data.main.temp - kelvin) + "°C";
            document.querySelector(".summary").textContent = condition;
            document.querySelector(".location").textContent =
                data.name + ", " + data.sys.country;
            document.querySelector(".icon").innerHTML =
                `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">`;

            document.querySelector(".humidity").textContent = data.main.humidity + "%";
            document.querySelector(".wind").textContent = Math.round(data.wind.speed * 3.6) + " km/h";
            document.querySelector(".pressure").textContent = data.main.pressure + " hPa";

            const sunriseTime = new Date(data.sys.sunrise * 1000);
            const sunsetTime = new Date(data.sys.sunset * 1000);
            document.querySelector(".sunrise").textContent =
                sunriseTime.getHours().toString().padStart(2, '0') + ":" +
                sunriseTime.getMinutes().toString().padStart(2, '0');
            document.querySelector(".sunset").textContent =
                sunsetTime.getHours().toString().padStart(2, '0') + ":" +
                sunsetTime.getMinutes().toString().padStart(2, '0');
        })
        .catch(() => {
            alert("Unable to fetch weather data. Please try again.");
        });
};

const getLocationWeather = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const api = "6d055e39ee237af35ca066f35474e9df";
            const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`;
            fetchWeather(url);
        }, () => {
            alert("Location access denied. Please allow access to use this feature.");
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
};

document.getElementById("searchBtn").addEventListener("click", () => {
    const city = document.getElementById("cityInput").value;
    if (city) {
        const api = "6d055e39ee237af35ca066f35474e9df";
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;
        fetchWeather(url);
    } else {
        alert("Please enter a city name.");
    }
});

window.addEventListener("load", () => {
    getLocationWeather();
});
