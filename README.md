# Locals-on-the-8s (but not really)

As part of our weekly challenges, this being week 6, this week's challenge was to make a simple weather app, showcasing different user entered locations with accurate weather data for the current day as well as the next few days.

## Technologies used

This challenge makes use of APIs to fetch and display weather data from openweather. The name of a location is entered and then passed to the API where it then returns the location as a set of latitude and longitude values. These values can then be used to pull accurate weather data for the current day in addition to the five day forecast from openweather's API. The three APIs from openweather that are used in this project are the geo API, the forecast API, and the weather icon API. Local storage is used to store the locations that have been previously entered for quick recall.

## User Story

-   AS A traveler
-   I WANT to see the weather outlook for multiple cities
-   SO THAT I can plan a trip accordingly

## Acceptance Criteria

-   GIVEN a weather dashboard with form inputs
-   WHEN I search for a city
-   THEN I am presented with current and future conditions for that city and that city is added to the search history
-   WHEN I view current weather conditions for that city
-   THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind -speed
-   WHEN I view future weather conditions for that city
-   THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
-   WHEN I click on a city in the search history
-   THEN I am again presented with current and future conditions for that city

## Screenshots

These show the app before anything has been entered and after the recent searches list has been filled.

![Before entering](<Assets/images/Screenshot (886).png>)
![After entering](<Assets/images/Screenshot (887).png>)

## Credits

It's me, the only person that worked on this project. 
Wesley Dunlap.