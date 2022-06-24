const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geolocations')
const forecast = require('./utils/weather')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
console.log(publicDirectoryPath)
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nikhil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nikhil'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Use this website to get weather information of any location.',
        title: 'Help',
        name: 'Nikhil'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, data = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(data.longitude,data.latitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            console.log(forecastData)
            res.send({
                forecast: `The temperature is ${forecastData.temperature} degree celcius and weather is ${forecastData.weather} `  , 
                location : data.location,
                address: req.query.address
            })

        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nikhil',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nikhil',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})