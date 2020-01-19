//If unsure of how to use things, go to Expressjs.com

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const express = require('express')
const path = require('path')
const hbs = require('hbs')

const app = express()
const port = process.env.PORT || 3000

// Define Paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const name = 'WolfOfFutility'

let locationData = ''
let forecastedData = ''
let forecastType = ''

let dayOne = {
    forecast: '',
    tempHigh: '',
    tempLow: '',
    iconURL: ''
}

let dayTwo = {
    forecast: '',
    tempHigh: '',
    tempLow: '',
    iconURL: ''
}

let dayThree = {
    forecast: '',
    tempHigh: '',
    tempLow: '',
    iconURL: ''
}

let dayFour = {
    forecast: '',
    tempHigh: '',
    tempLow: '',
    iconURL: ''
}

let dayFive = {
    forecast: '',
    tempHigh: '',
    tempLow: '',
    iconURL: ''
}

let daySix = {
    forecast: '',
    tempHigh: '',
    tempLow: '',
    iconURL: ''
}

let daySeven = {
    forecast: '',
    tempHigh: '',
    tempLow: '',
    iconURL: ''
}

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

// Setup for Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

// Content Render for Home Page
app.get('', (req, res) => {
    res.render('', {
        title: 'Weather Search',
        subtitle: 'Search a location and get the weather forecast',
        name
    })
})

// Content Render for About Page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name
    })
})

// Content Render for Help Page
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name,
        helpMessage: 'Please look below for more help!'
    })
})

// Content Render for WeatherData page
app.get('/weatherData', (req, res) => {
    if(!req.query.address) {
        return res.render('error', {
            title: 'Error',
            name,
            errorMessage: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, data = {}) => {
        if(error) {
            return console.log(error)
        }
    
        const {
            longitude,
            lattitude,
            location
        } = data
    
        forecast(lattitude, longitude, (error, forecast, temperature, rainChance, dayOneData, dayTwoData, dayThreeData, dayFourData, dayFiveData, daySixData, daySevenData) => {
            if(error) {
                return console.log(error)
            }
            
            locationData = location
            forecastedData = forecast + '. It is currently ' + temperature + ' degrees out. There is a ' + rainChance + '% chance of rain.'
            forecastType = forecast
    
            dayOne = dayOneData
            dayOne.iconURL = iconURLFinder(dayOne.forecast)
            dayTwo = dayTwoData
            dayTwo.iconURL = iconURLFinder(dayTwo.forecast)
            dayThree = dayThreeData
            dayThree.iconURL = iconURLFinder(dayThree.forecast)
            dayFour = dayFourData
            dayFour.iconURL = iconURLFinder(dayFour.forecast)
            dayFive = dayFiveData
            dayFive.iconURL = iconURLFinder(dayFive.forecast)
            daySix = daySixData
            daySix.iconURL = iconURLFinder(daySix.forecast)
            daySeven = daySevenData
            daySeven.iconURL = iconURLFinder(daySeven.forecast)
        })
    })

    res.send({
        forecast: forecastedData,
        location: locationData,
        address: req.query.address,
        dayOne,
        dayTwo,
        dayThree,
        dayFour,
        dayFive,
        daySix,
        daySeven
    })
})

// Content Render for Products Page
app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.render('error', {
            title: 'Error',
            name,
            errorMessage: 'You Must Provide a Search Term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

// Error Content Render on help page add ons
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name,
        errorMessage: 'Help Article Not Found!'
    })
})

// Error Content Render for root page add ons
app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name,
        errorMessage: '404 Page, Not Found!'
    })
})

// App loading to Localhost on port 3000 (localhost:3000)
app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})