# Sunrise Sunset App

This is a Vue.js app that takes user input for three variables: latitude, 
longitude and date. These are submitted to the sunrise-sunset.org API 
which returns a list of sunrise and sunset times for that date and location. 

Users can either enter the latitude and longitude manually or click a 
location on the embedded map.

Clicking the map will populate the input fields with the latitude and 
longitude.

Clicking the 'submit' button will recenter the map and call the 
[sunrise-sunset.org](https://sunrise-sunset.org/api) API

The response from the sunrise-sunset API returns the following items:

+ sunrise
+ sunset
+ solar noon
+ day length
+ civil twilight begin
+ civil twilight end
+ nautical twilight begin
+ nautical twilight end
+ astronomical twilight begin
+ astronomical twilight end

These values are displayed as a list on the right and as a graphic in the middle. 
The red line represents solar noon and the color gradient represents the various stages of twilight.

For more information about the different stages of twilight, click [here](https://en.wikipedia.org/wiki/Twilight). 



