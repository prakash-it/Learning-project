async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();

    if (!city) {
        showError('Please Enter a City Name');
        return;
    }

    document.getElementById('loading').style.display = 'block';
    document.getElementById('error').style.display = 'none';
    document.getElementById('weatherDisplay').style.display = 'none';

    const apiKey = '759a8970df2bee3478f32c1cf31724b7';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');

        const data = await response.json();

        document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
        document.getElementById('temperature').textContent = `${data.main.temp}°C`;
        document.getElementById('description').textContent =
            data.weather[0].description.charAt(0).toUpperCase() +
            data.weather[0].description.slice(1);
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
        document.getElementById('weatherIcon').src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        document.getElementById('loading').style.display = 'none';
        document.getElementById('weatherDisplay').style.display = 'block';

    } catch (error) {
        document.getElementById('loading').style.display = 'none';
        showError(error.message);
    }
}

function showError(message) {
    const errorDiv = document.getElementById('error');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}
