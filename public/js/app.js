console.log('Client side javascript file is loaded!')

// Document Elements
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const searchMessage = document.querySelector('#search-message')
const messageOne = document.querySelector('#location-paragraph')
const messageTwo = document.querySelector('#forecast-paragraph')

// Current Forecast Data
const forecastImage = document.querySelector('#forecast-image')
const dailyForecastData = document.querySelector('.daily-content-area')

// Day One Forecast Data
const dayOneImage = document.querySelector('#daily-icon-1')
const dayOneForecast = document.querySelector('#day-one-forecast')
const dayOneMaxTemp = document.querySelector('#day-one-max-temp')
const dayOneMinTemp = document.querySelector('#day-one-min-temp')

// Day Two Forecast Data
const dayTwoImage = document.querySelector('#daily-icon-2')
const dayTwoForecast = document.querySelector('#day-two-forecast')
const dayTwoMaxTemp = document.querySelector('#day-two-max-temp')
const dayTwoMinTemp = document.querySelector('#day-two-min-temp')

// Day Three Forecast Data
const dayThreeImage = document.querySelector('#daily-icon-3')
const dayThreeForecast = document.querySelector('#day-three-forecast')
const dayThreeMaxTemp = document.querySelector('#day-three-max-temp')
const dayThreeMinTemp = document.querySelector('#day-three-min-temp')

// Day Four Forecast Data
const dayFourImage = document.querySelector('#daily-icon-4')
const dayFourForecast = document.querySelector('#day-four-forecast')
const dayFourMaxTemp = document.querySelector('#day-four-max-temp')
const dayFourMinTemp = document.querySelector('#day-four-min-temp')

// Day Five Forecast Data
const dayFiveImage = document.querySelector('#daily-icon-5')
const dayFiveForecast = document.querySelector('#day-five-forecast')
const dayFiveMaxTemp = document.querySelector('#day-five-max-temp')
const dayFiveMinTemp = document.querySelector('#day-five-min-temp')

// Day Six Forecast Data
const daySixImage = document.querySelector('#daily-icon-6')
const daySixForecast = document.querySelector('#day-six-forecast')
const daySixMaxTemp = document.querySelector('#day-six-max-temp')
const daySixMinTemp = document.querySelector('#day-six-min-temp')

// Day Six Forecast Data
const daySevenImage = document.querySelector('#daily-icon-7')
const daySevenForecast = document.querySelector('#day-seven-forecast')
const daySevenMaxTemp = document.querySelector('#day-seven-max-temp')
const daySevenMinTemp = document.querySelector('#day-seven-min-temp')

// Document Element Initialisation
searchMessage.textContent = ''
messageOne.textContent = ''
messageTwo.textContent = ''
forecastImage.style.display = "none"
dailyForecastData.style.display = "none"

// Function to find the URL for the weather type
const iconURLFinder = (data) => {
    const forecast = data.toLowerCase()
    if(forecast.includes('clear')) {
        return '/img/clear-icon.png'
    }
    else if(forecast.includes('cloudy') || forecast.includes('overcast') || forecast.includes('partly cloudy')) {
        return '/img/cloudy-icon.png'
    }
    else if(forecast.includes('rain') || forecast.includes('drizzle')) {
        return '/img/rain-icon.png'
    }
    else if(forecast.includes('snow')) {
        return '/img/snow-icon.png'
    }
    else {
        return '/img/clear-icon.png'
    }
}

// Form Submit Data Processing
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault() // Stops the refresh on submit
    
    const location = search.value // The value of the search bar when submitted

    if(!location) {
        return (
            searchMessage.textContent = 'Please enter a location',
            messageOne.textContent = '',
            messageTwo.textContent = '',
            forecastImage.style.display = "none",
            dailyForecastData.style.display = "none"
        )
    }

    //Fetching data, waiting two seconds, and then fetching it again with a response print
    fetch('http://localhost:3000/weatherData?address=' + location)
    searchMessage.textContent = 'Loading...'
    messageOne.textContent = ''
    messageTwo.textContent = ''
    forecastImage.style.display = "none"
    dailyForecastData.style.display = "none"

    setTimeout(() => {
        fetch('http://localhost:3000/weatherData?address=' + location).then((response) => {
            response.json().then((data) => {
                if(data.error) {
                    searchMessage.textContent = 'Unable to find location. Try another search.'
                    messageOne.textContent = ''
                    messageTwo.textContent = ''
                }
                else { // Sending everything to the webpage based on the defined id's 
                    searchMessage.textContent = 'Showing search result for ' + location
                    messageOne.textContent = data.location
                    messageTwo.textContent = data.forecast

                    dayOneForecast.textContent = data.dayOne.forecast
                    dayOneImage.src = data.dayOne.iconURL
                    dayOneMaxTemp.textContent = 'Max: ' + data.dayOne.tempHigh + '°C'
                    dayOneMinTemp.textContent = 'Min: ' + data.dayOne.tempLow + '°C'

                    dayTwoForecast.textContent = data.dayTwo.forecast
                    dayTwoImage.src = data.dayTwo.iconURL
                    dayTwoMaxTemp.textContent = 'Max: ' + data.dayTwo.tempHigh + '°C'
                    dayTwoMinTemp.textContent = 'Min: ' + data.dayTwo.tempLow + '°C'

                    dayThreeForecast.textContent = data.dayThree.forecast
                    dayThreeImage.src = data.dayThree.iconURL
                    dayThreeMaxTemp.textContent = 'Max: ' + data.dayThree.tempHigh + '°C'
                    dayThreeMinTemp.textContent = 'Min: ' + data.dayThree.tempLow + '°C'

                    dayFourForecast.textContent = data.dayFour.forecast
                    dayFourImage.src = data.dayFour.iconURL
                    dayFourMaxTemp.textContent = 'Max: ' + data.dayFour.tempHigh + '°C'
                    dayFourMinTemp.textContent = 'Min: ' + data.dayFour.tempLow + '°C'

                    dayFiveForecast.textContent = data.dayFive.forecast
                    dayFiveImage.src = data.dayFive.iconURL
                    dayFiveMaxTemp.textContent = 'Max: ' + data.dayFive.tempHigh + '°C'
                    dayFiveMinTemp.textContent = 'Min: ' + data.dayFive.tempLow + '°C'

                    daySixForecast.textContent = data.daySix.forecast
                    daySixImage.src = data.daySix.iconURL
                    daySixMaxTemp.textContent = 'Max: ' + data.daySix.tempHigh + '°C'
                    daySixMinTemp.textContent = 'Min: ' + data.daySix.tempLow + '°C'

                    daySevenForecast.textContent = data.daySeven.forecast
                    daySevenImage.src = data.daySeven.iconURL
                    daySevenMaxTemp.textContent = 'Max: ' + data.daySeven.tempHigh + '°C'
                    daySevenMinTemp.textContent = 'Min: ' + data.daySeven.tempLow + '°C'

                    forecastImage.style.display = "block"
                    forecastImage.src = iconURLFinder(data.forecast)
                    dailyForecastData.style.display = "block"

                }
            })
        })
    }, 2000)
    
})