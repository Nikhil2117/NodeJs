const request = require('request')

// const uri = `http://api.weatherstack.com/current?access_key=1c900b6f50a851928b28075a3237abce&query=${x},${y}`

// request({url:uri, json : true}, (error,response)=>{
//         console.log(`${response.body.current.temperature} degree C`)
// })

const temp = (x,y, callback) => {
    const uri = `http://api.weatherstack.com/current?access_key=1c900b6f50a851928b28075a3237abce&query=${x},${y}`

    request({url:uri, json : true}, (error,response)=>{
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                temperature : response.body.current.temperature,
                weather : response.body.current.weather_descriptions
                // longitude: response.body.features[0].center[1],
                // location: response.body.features[0].place_name
            }
        )}
        
})
}


// temp(28,77, (error, data)=>{
//     console.log(data)
//     console.log(error)
// })

module.exports = temp