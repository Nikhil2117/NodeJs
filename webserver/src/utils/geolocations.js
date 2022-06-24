const request = require('request')
// const module = require('module')
// const uri = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(location)+".json?access_token=pk.eyJ1IjoibmlraGlsMjExNyIsImEiOiJjbDRlZWo3Y24wMTY4M2NtbnVlMGtobDcxIn0.MKIEJsVtEvYQ_U_QkwfGVA&limit=1"

const geocode = (address, callback) => {
    const uri = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibmlraGlsMjExNyIsImEiOiJjbDRlZWo3Y24wMTY4M2NtbnVlMGtobDcxIn0.MKIEJsVtEvYQ_U_QkwfGVA&limit=1"

    request({ url: uri, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            }
        )}
        
})
}

// geocode("Delhi", (error, data)=>{
//     console.log(data)
//     console.log(error)
// })

module.exports = geocode
