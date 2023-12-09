const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/', (req, res) => {
    const querry = req.body.cityName;
    const apiKey = '85a062a6c069c2bb7368ebadc0ec58ec';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${querry}&appid=${apiKey}&units=metric`;

    https.get(url, (response) => {
        let data = '';

        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;

            const result = `
                <p>The temperature in ${querry} is ${temp} degrees Celsius</p>
                <p> ${description}</p>
            `;

            res.send(result);
        });
    });
});

app.listen(3000, () =>
    console.log("Our server is running at port 3000")
);
