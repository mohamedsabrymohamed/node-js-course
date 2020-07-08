const request = require('request')

const url ='http://api.openweathermap.org/data/2.5/weather?q=Alexandria&appid=d82181739af9d26e07a23f041790cdfa&units=metric'

request({url: url,json: true}, (error, response)=>{
    if(error) {
        console.log('Unable to connect to weather server')
    }else if(response.body.error){
        console.log('Unable to find location')
    }else{
        console.log('it is currently ' + response.body.main.temp + ' and humidity is: ' + response.body.main.humidity)
    }
})

//grocoding - address -> lat/long

const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/Alexandria.json?access_token=pk.eyJ1IjoibmVvZHJhZ29uNjY2NzAiLCJhIjoiY2tjZGRvNDNpMDBzMDMwbXIwMm80bHgzNiJ9.uXVVPWFfeL41xEHTbW8Qfg'

request({url: geocodeUrl,json: true}, (error, response)=>{
    const Latitude = response.body.features[0].center[1]
    const Langtitude = response.body.features[0].center[0]
    const city_name = response.body.features[0].place_name
    
    console.log(city_name, Langtitude, Latitude)
})