const request = require('request')

const forecast = (lattitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b12c19ee2970dd14f7ea12128fcc09c2/' + lattitude + ', ' + longitude + '?units=si'

    request({ url, json: true}, (error, response) => {
        if(error) {
            callback('Unable to connect to web services', undefined)
        }
        else if(response.body.error) {
            callback('Unable to find weather data, please try again!', undefined)
        }
        else {
            const {
                summary: forecast,
                temperature,
                precipProbability: rainChance

            } = response.body.currently

            const dayOne = {
                forecast: response.body.daily.data[0].summary,
                tempHigh: response.body.daily.data[0].temperatureHigh,
                tempLow: response.body.daily.data[0].temperatureLow
            }

            const dayTwo = {
                forecast: response.body.daily.data[1].summary,
                tempHigh: response.body.daily.data[1].temperatureHigh,
                tempLow: response.body.daily.data[1].temperatureLow
            }

            const dayThree = {
                forecast: response.body.daily.data[2].summary,
                tempHigh: response.body.daily.data[2].temperatureHigh,
                tempLow: response.body.daily.data[2].temperatureLow
            }

            const dayFour = {
                forecast: response.body.daily.data[3].summary,
                tempHigh: response.body.daily.data[3].temperatureHigh,
                tempLow: response.body.daily.data[3].temperatureLow
            }

            const dayFive = {
                forecast: response.body.daily.data[4].summary,
                tempHigh: response.body.daily.data[4].temperatureHigh,
                tempLow: response.body.daily.data[4].temperatureLow
            }

            const daySix = {
                forecast: response.body.daily.data[5].summary,
                tempHigh: response.body.daily.data[5].temperatureHigh,
                tempLow: response.body.daily.data[5].temperatureLow
            }

            const daySeven = {
                forecast: response.body.daily.data[6].summary,
                tempHigh: response.body.daily.data[6].temperatureHigh,
                tempLow: response.body.daily.data[6].temperatureLow
            }
            

            callback(undefined, forecast, temperature, rainChance, dayOne, dayTwo, dayThree, dayFour, dayFive, daySix, daySeven)
        }
    })
}

module.exports = forecast