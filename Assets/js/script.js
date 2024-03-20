var cityName;
localArray = null;
var localArray = JSON.parse(localStorage.getItem("cityNameLocal"));
fixLocalArray(localArray, cityName);
if (localArray != null) {
    getLatLon(cityName);
}

async function getLatLon(cityName) {
    buildLocal();
    const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=ca9fa064964ed03420d03a0a9e8061ec`
    );
    const data = await response.json();
    var lat = data[0].lat;
    var lon = data[0].lon;
    getWeather(lat, lon, data);
};

async function getWeather(lattitude, longitude, data) {
    var lat = Math.round(lattitude * 100) / 100;
    var lon = Math.round(longitude * 100) / 100;
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=ca9fa064964ed03420d03a0a9e8061ec&units=imperial`
    );
    const weatherData = await response.json();
    buildCard(weatherData, lat, lon, data);
    buildFiveDay(weatherData, 7);
    buildFiveDay(weatherData, 15);
    buildFiveDay(weatherData, 23);
    buildFiveDay(weatherData, 31);
    buildFiveDay(weatherData, 39);
    buildLocal();
};

function buildCard(weatherData, lat, lon, data) {
    // Lat and lon to decorate card
    if (lat < 0) {
        var latEastWest = "E";
    } else {
        latEastWest = "W";
    }
    if (lat < 0) {
        var latNorthSouth = "S";
    } else {
        latNorthSouth = "N";
    }
    $("#latLon").text(
        lat + "°" + latNorthSouth + ", " + lon + "°" + latEastWest
    );
    // City and state are inserted here
    $("#cityState").text(data[0].local_names.en + ", " + data[0].state);

    // time goes here and gets restructured
    var rawDate = weatherData.list[0].dt_txt.split(" ");
    var splitDate = rawDate[0].split("-");
    $("#headerDate").text(`${splitDate[1]}/${splitDate[2]}/${splitDate[0]}`);

    // High and low temperature gets inserted here
    // current was originally part of this but always
    // displayed the same as the high
    $("#temperature").text(
        "High of " +
            Math.round(weatherData.list[0].main.temp_max) +
            "°, Low of " +
            Math.round(weatherData.list[0].main.temp_min) +
            "°"
    );
    // Weather description gets inserted here
    $("#description").text(weatherData.list[0].weather[0].description);
    // Humidity gets inserted here
    $("#humidity").text(weatherData.list[0].main.humidity + "% Humidity");
    // Wind speed gets inserted here
    $("#windSpeed").text(
        "Wind at " +
            Math.round(weatherData.list[0].wind.speed) +
            " mph, Gusting Up to " +
            Math.round(weatherData.list[0].wind.gust) +
            " mph"
    );

    // Img handler for weather icons
    let iconResponse = weatherData.list[0].weather[0].icon;
    let iconURL = `https://openweathermap.org/img/wn/${iconResponse}@2x.png`;
    $("#weatherIcon").attr("src", iconURL);
};

function buildFiveDay(weatherData, i) {
    if (i === 7) {
        var day = "One";
    }
    if (i === 15) {
        var day = "Two";
    }
    if (i === 23) {
        var day = "Three";
    }
    if (i === 31) {
        var day = "Four";
    }
    if (i === 39) {
        var day = "Five";
    }
    // get and chop date values
    var rawDate = weatherData.list[i].dt_txt.split(" ");
    var splitDate = rawDate[0].split("-");
    $(`#dateDay${day}`).text(`${splitDate[1]}/${splitDate[2]}`);

    // High, low, and current temperature gets inserted here
    $(`#temperatureDay${day}`).text(
        "High of " +
            Math.round(weatherData.list[i].main.temp_max) +
            "°, Low of " +
            Math.round(weatherData.list[i].main.temp_min) +
            "°"
    );
    // Weather description gets inserted here
    $(`#descriptionDay${day}`).text(weatherData.list[i].weather[0].description);
    // Humidity gets inserted here
    $(`#humidityDay${day}`).text(
        weatherData.list[i].main.humidity + "% Humidity"
    );
    // Wind speed gets inserted here
    $(`#windSpeedDay${day}`).text(
        "Wind at " +
            Math.round(weatherData.list[i].wind.speed) +
            " mph, Gusting Up to " +
            Math.round(weatherData.list[i].wind.gust) +
            " mph"
    );
    // Img handler for weather icons
    let iconResponse = weatherData.list[i].weather[0].icon;
    let iconURL = `https://openweathermap.org/img/wn/${iconResponse}@2x.png`;
    $(`#weatherIconDay${day}`).attr("src", iconURL);
};

$("#searchButton").click(function () {
    var cityName = $("#searchBox").val();
    if (!cityName) {
        return;
    }
    // save to recent searches here
    // if (localArray[0] === null) {
    //     localArray.shift();
    // }
    localArray.push(cityName);
    setLocal(cityName);
    $("#searchBox").val("");
    getLatLon(cityName);
});

$(document).keypress(function (event) {
    var keycode = event.keyCode || event.which;
    if (keycode == "13") {
        var cityName = $("#searchBox").val();
        if (!$("#searchBox").val()) {
            return;
        }

        // save to here as well
        setLocal(cityName);
        $("#searchBox").val("");
        getLatLon(cityName);
    }
});

// reset recent searches and clear local storage, also hide recent buttons
$("#resetButton").click(function () {
    localStorage.clear();
    fixLocalArray(localArray, cityName);
    $("#recent-1").addClass("d-none");
    $("#recent-2").addClass("d-none");
    $("#recent-3").addClass("d-none");
    $("#recent-4").addClass("d-none");
    $("#recent-5").addClass("d-none");
});

$("#recent-1").click(function () {
    var cityName = $("#recent-1").text();
    getLatLon(cityName);
});
$("#recent-2").click(function () {
    var cityName = $("#recent-2").text();
    getLatLon(cityName);
});
$("#recent-3").click(function () {
    var cityName = $("#recent-3").text();
    getLatLon(cityName);
});
$("#recent-4").click(function () {
    var cityName = $("#recent-4").text();
    getLatLon(cityName);
});
$("#recent-5").click(function () {
    var cityName = $("#recent-5").text();
    getLatLon(cityName);
});

function buildLocal() {
    fixLocalArray(localArray, cityName);
    localStorage.setItem("cityNameLocal", JSON.stringify(localArray));
    cityNameLocal = localStorage.getItem("cityNameLocal");
    localObject = JSON.parse(cityNameLocal);
    if (localArray === null) {
        localArray = [];
    }
    for (var i = 0; i < 5; i++) {
        if (localArray[0] != undefined) {
            $("#recent-1").text(localObject[0]);
            $("#recent-1").removeClass("d-none");
        }
        if (localArray[1] != undefined) {
            $("#recent-2").text(localArray[1]);
            $("#recent-2").removeClass("d-none");
        }
        if (localArray[2] != undefined) {
            $("#recent-3").text(localArray[2]);
            $("#recent-3").removeClass("d-none");
        }
        if (localArray[3] != undefined) {
            $("#recent-4").text(localArray[3]);
            $("#recent-4").removeClass("d-none");
        }
        if (localArray[4] != undefined) {
            $("#recent-5").text(localObject[4]);
            $("#recent-5").removeClass("d-none");
        }
    }
};

function setLocal(cityName) {
    cityNameLocal = localStorage.getItem("cityNameLocal");
    localObject = JSON.parse(cityNameLocal);
    localArray = localObject;
    
    if (localArray === null) {
        localArray = [];
    }
    for (var i = 1; i < localArray.length + 1; i++) {
        if (localArray[i] === cityName) {
            return;
        }
    }

    if (localArray.length < 5) {
        localArray.push(cityName);
    } else {
        localArray.push(cityName);
        localArray.shift();
    }

    localStorage.setItem("cityNameLocal", JSON.stringify(localArray));
    buildLocal();
};

function fixLocalArray(localArray, cityName) {
    if (localArray === null) {
        localArray = [];
        localStorage.setItem("cityNameLocal", JSON.stringify(localArray));
    }
};
