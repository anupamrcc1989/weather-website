const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYW51cGFtcmNjMTk4OSIsImEiOiJja2ZqZmEzMzAwczJ6MnJxdHB2OGNxdjdvIn0.nxT2-Q3A3zmwuTQDqXO7Og&limit=1'

request({url, json: true}, (error, response) =>{
    if (error){
        callback('unable to connect to location services', undefined)
    } 
    else if(response.body.features.length==0) {
        callback('unable to find location! try another search', undefined)
    }
    else{
        callback(error, {
            Longitude : response.body.features[0].center[0],
            Latitude : response.body.features[0].center[1],
            Location: response.body.features[0].place_name
        })
    }
})
}


module.exports = geocode