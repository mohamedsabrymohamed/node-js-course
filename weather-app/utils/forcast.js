const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'https://api.openweathermap.org/data/2.5/find?lat='+ latitude +'&lon='+ longtitude +'&cnt=1&appid=d82181739af9d26e07a23f041790cdfa&units=metric'

    request({url,json:true} , (error,{body}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        } else if(body.error) {
            callback('Unable to find location', location)
        } else {
            //callback(undefined, body.list[0].main.temp)
            callback(undefined, ' it is currently: ' + body.list[0].main.temp + ' degrees out. it is ' + body.list[0].weather.description + ' and humidity is :  ' + body.list[0].main.humidity)
        }
    })
}

module.exports = forecast