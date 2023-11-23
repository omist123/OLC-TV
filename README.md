# OLC-TV

The Melrose High School information dashboard.

## Hosting

This project is hosted on Vercel by omist123.

https://lc-tv-client.vercel.app/

## Lunch Special

Uses Puppeteer to scrape data from https://melroseschools.nutrislice.com/menu/melrose/breakfast/2023-11-19. The lunch special will take some time to load on the dashboard because it's running on a free Render instance.

Curious how the app works on Render? Check out https://www.youtube.com/watch?v=6cm6G78ZDmM&ab_channel=AviMamenko

To Copy:
1. Fork the Github Repository.
2. Create a new web service on Render.
3. IMPORTANT: Include environment variables PUPPETEER_EXECUTABLE_PATH and PUPPETEER_SKIP_CHROMIUM_DOWNLOAD with values of /usr/bin/google-chrome-stable and true respectively.
4. Deploy the service and use it's link to fetch the content in js.

Deployed on render.com by s-hazel at https://school-lunch.onrender.com

Github Repository: https://github.com/s-hazel/MHS-Lunch-Data

## Weather
Weather Data section uses the [Open Weather map API](https://openweathermap.org/current) to get the current tempeture. This process is done on the express server on the backend. Then the frontend makes a fetch request to the backend to get the tempeture which it then does the Kelvin to Farenheit conversion and displays the data.

To Copy: 
1. Fork the repo
2. Make your own account on openweathermap.org and get your own API key.
3. Make a .env file in the server folder with your API key.
4. Rest of the code should work as is!

## Announcements

Announcement data is fetched from https://aspen-api.herocc.com/api/v1/ma-melrose/announcements. This API is not maintained by omist123 or s-hazel.
