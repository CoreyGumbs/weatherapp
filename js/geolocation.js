//current coordinates variable placeholder.
coordsArray = [];

//Finds the geolocation of user.
let geoFindMe = () => {

    //success callback for navigator.geolocation.getCurrentPosition() parameter.
    let geoSuccess = position => {

        //getWeatherData() takes the api proxy url and adds, the latitude, longitude coordinates from retrieved geolocation position.
        //these coordinates are needed to access the Dark Sky endpoint weather api. 
        getWeatherData(`https://coreygumbs-eval-test.apigee.net/localweather/${position.coords.latitude},${position.coords.longitude}`)
        .catch(error =>{
            console.log('Error Code: ' + error.code);
            console.log('Error Msg: ' + error.message);
            console.error(error);
        });
    }

    //error callback for navigator.geolocation.getCurrentPosition() parameter.
    let geoError = error =>{
        console.log('Error Code: ' + error.code);
        console.log('Error Msg: ' + error.message);
    }

    //checks if browser supports geolocation.
    //passes both the success & error callbacks from above into the navigator.geolocation.getCurrentPosition() parameters.
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }else{
        document.getElementById('errMsg').innerHTML = 'browser doesn\'t support geolocation';
    }

}

//takes url from the success callback in geoFindMe()
//uses async/await for data retrieval from Dark Sky API.
let getWeatherData = async url => {
    //fetches url from Dark Sky API endpoint
    const response = await fetch(url);

    //converts response body to json.
    const weatherData = await response.json();

    //getGeoCords takes the latitude & longitude coordinates from API as paramaters.
    getGeoCoords(weatherData.latitude, weatherData.longitude)
    .catch(error =>{
        console.log('Error Code: ' + error.code);
        console.log('Error Msg: ' + error.message);
        console.error(error);
    });

    console.log(weatherData);

    document.getElementById("weatherData").innerHTML = weatherData.currently.summary + '<br />' + `Temperature: ${Math.round(weatherData.currently.temperature)} &deg;`;
}

//Function to push recieved latitude & longitude coordinates from API call to placeholder array.
//uses async/await to prevent calling before data is recieved from API response object.
let getGeoCoords = async (lat, long) => {
    const coords = await coordsArray.push(lat, long);
}

//Event Listener for when user clicks check weather button.
document.getElementById('geoBtn').addEventListener('click', geoFindMe);
