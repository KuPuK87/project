const Weather = function () {

        const showWeather = function (data) {

            const infoBlock = document.querySelector('.weather_info');

            if (!infoBlock) return;

            // конвертация Unixtime  в дату

            let timeStamp1 = data.daily[1].dt,
                theDate = new Date(timeStamp1 * 1000),
                dateString = theDate.toGMTString(),
                date1 = dateString.substr(0, 17);

            let timeStamp2 = data.daily[2].dt,
                theDate2 = new Date(timeStamp2 * 1000),
                dateString2 = theDate2.toGMTString(),
                date2 = dateString2.substr(0, 17);

            let timeStamp3 = data.daily[3].dt,
                theDate3 = new Date(timeStamp3 * 1000),
                dateString3 = theDate3.toGMTString(),
                date3 = dateString3.substr(0, 17);

            if (data.current.weather[0].main == 'Rain') {
                document.body.style.background = "url('img/rain.jpg')";
            } else if (data.current.weather[0].main == 'Clouds') {
                document.body.style.background = "url('img/clouds.jpg')";
            } else if (data.current.weather[0].main == 'Clear') {
                document.body.style.background = "url('img/clear.jpg')";
            } else if (data.current.weather[0].main == 'Snow') {
                document.body.style.background = "url('img/snow.jpg')";
            } else if (data.current.weather[0].main == 'Thunderstorm') {
                document.body.style.background = "url('img/thunderstorm.jpg')";
            } else if (data.current.weather[0].main == 'Drizzle') {
                document.body.style.background = "url('img/drizzle.jpg')";
            } else {
                document.body.style.background = "url('img/other.jpg')";
            }

                infoBlock.innerHTML = ` 
            <div class="today">
                <div class="today_temp-block">
                    <div class="today_temperature">${data.current.temp}&deg;</div>
                    <img src="http://openweathermap.org/img/w/${data.current.weather[0].icon}.png" alt="icon">
                    <div class="curent_weather">${data.current.weather[0].main} (${data.current.weather[0].description})</div>
                    <div class="wind">Wind: ${data.current.wind_speed} m/s</div>
                </div> 
                <div class="today_info-block">
                    <h3>${data.timezone}</h3>
                    <div class="feels_like">Feels Like: ${data.current.feels_like}&deg</div>
                    <div class="pressure">Pressure: ${data.current.pressure}</div>
                </div> 
            </div>

            <div class="three_days">

                <div class="days">
                    <div class="date">${date1}</div>
                    <div class="temperature">${data.daily[1].temp.day}&deg;</div>
                    <div class="precipitation_block">
                        <img src="http://openweathermap.org/img/w/${data.daily[1].weather[0].icon}.png" alt="icon">
                        <div class="precipitation">${data.daily[1].weather[0].main} </div>
                    </div>
                    <div class="min_max-temp">
                        <div class="temp_min">Temp min: ${data.daily[1].temp.min}</div>
                        <div class="temp_max">Temp max: ${data.daily[1].temp.max}</div>
                    </div>
                </div>

                <div class="days">
                    <div class="date">${date2}</div>
                    <div class="temperature">${data.daily[2].temp.day}&deg;</div>
                    <div class="precipitation_block">
                        <img src="http://openweathermap.org/img/w/${data.daily[1].weather[0].icon}.png" alt="icon">
                        <div class="precipitation">${data.daily[2].weather[0].main} </div>
                    </div>
                    <div class="min_max-temp">
                        <div class="temp_min">Temp min: ${data.daily[2].temp.min}</div>
                        <div class="temp_max">Temp max: ${data.daily[2].temp.max}</div>
                    </div>
                </div>

                <div class="days">
                    <div class="date">${date3}</div>
                    <div class="temperature">${data.daily[3].temp.day}&deg;</div>
                    <div class="precipitation_block">
                        <img src="http://openweathermap.org/img/w/${data.daily[3].weather[0].icon}.png" alt="icon">
                        <div class="precipitation">${data.daily[3].weather[0].main} </div>
                    </div>
                    <div class="min_max-temp">
                        <div class="temp_min">Temp min: ${data.daily[3].temp.min}</div>
                        <div class="temp_max">Temp max: ${data.daily[3].temp.max}</div>
                    </div>
                </div>

            </div>
            `;

                document.querySelector('.weather_search [name="search"]').value = '';
            };

            const getLocationForSearchWeather = async function (query) {
                if (!query) return;

                const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=a71e117a15c6167193ff91e143a38700&units=metric`;

                await fetch(url).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    weatherSearch(data);
                });
            };

            const weatherSearch = async function (data) {
                const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&appid=a71e117a15c6167193ff91e143a38700&units=metric`;

                await fetch(url).then(function (response) {
                    return response.json();
                }).then(function (data) {
                    showWeather(data);
                });
            };

            const searchInput = document.querySelector('.weather_search [name="search"]'),
                searchButton = document.querySelector('.weather_search [name="search_button"]');

            if (!searchInput || !searchButton) return;

            searchButton.addEventListener('click', function () {
                let queryValue = searchInput.value || '';
                getLocationForSearchWeather(queryValue);
            });

        };

        window.addEventListener('load', function () {
            new Weather();
        });