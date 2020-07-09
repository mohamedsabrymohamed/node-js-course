const geocode = require('./utils/geocode')
const forecast = require('./utils/forcast')

const address = process.argv[2]

if(!address) {
    console.log('Please provice an address')
} else {
    geocode(address,(error, { latitude, longtitude, location})=> {
        if(error) {
            return console.log(error)
        }
        forecast(latitude,longtitude,(error,forecastData)=> {
            if(error) {
                return console.log(error)
            }
            console.log(location)
            console.log(forecastData)
        })
    })
}