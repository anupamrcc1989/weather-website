const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=687a6fe053bc37cad4ec8761f17b52e0&query='+latitude+','+longitude+'&units=m'
  
request({url, json: true}, (error, response) =>{
    if (error){
        callback('Unable to connect to weather application',undefined)
    }
     else if (response.body.error){
        callback('Unable to find location', undefined)
    }
    else{
        callback(error,('temp :'+response.body.current['temperature']+',feelslike:'+response.body.current['feelslike']+',Forecast:'+response.body.current.weather_descriptions[0]))
        }
    
})
}

module.exports = forecast