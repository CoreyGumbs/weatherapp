    window.addEventListener('load', () =>{
        geoFindMe();
    });
//current coordinates variable placeholder.
coordsArray = [];

let errorMsg = (error) => {
    console.log('Error Code: ' + error.code);
    console.log('Error Msg: ' + error.message);
    console.error(error);
}

//Finds the geolocation of user.
let geoFindMe = () => {

    //success callback for navigator.geolocation.getCurrentPosition() parameter.
    let geoSuccess = position => {

        //getWeatherData() takes the api proxy url and adds, the latitude, longitude coordinates from retrieved geolocation position.
        //these coordinates are needed to access the Dark Sky endpoint weather api. 
        fetchWeatherData(`https://coreygumbs-eval-test.apigee.net/localweather/${position.coords.latitude},${position.coords.longitude}?units=auto`)
        .catch(error =>{
            errorMsg(error);
        });
    }

    //checks if browser supports geolocation.
    //passes both the success & error callbacks from above into the navigator.geolocation.getCurrentPosition() parameters.
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(geoSuccess, errorMsg);
    }else{
        document.getElementById('errMsg').innerHTML = 'browser doesn\'t support geolocation';
    }

}

//takes url from the success callback in geoFindMe()
//uses async/await for data retrieval from Dark Sky API.
let fetchWeatherData = async url => {
    //fetches url from Dark Sky API endpoint
    const response = await fetch(url)
    .catch(error =>{
        errorMsg(error);
    });

    //converts response body to json.
    const weatherData = await response.json()
    .catch(error =>{
        errorMsg(error);
    });

    //getGeoCords takes the latitude & longitude coordinates from API as paramaters.
    getGeoCoords(weatherData.latitude, weatherData.longitude)
    .catch(error =>{
        errorMsg(error);
    });

    console.log(weatherData.daily.data[0]);
    getCurrentTemperatures(weatherData.currently.temperature, weatherData.currently.apparentTemperature);
    getCurrentTimeStamp(weatherData.currently.time);
    getCurrentMoistureConditions(weatherData.currently.dewPoint, weatherData.currently.humidity);


}

//Function to push recieved latitude & longitude coordinates from API call to placeholder array.
//uses async/await to prevent calling before data is recieved from API response object.
let getGeoCoords = async (lat, long) => {
    const coords = await coordsArray.push(lat, long);
    console.log(coordsArray);
}

let getCurrentTemperatures = (temperature, feelsLikeTemp) => {
    const currentTemp =  Math.round(temperature);
    const feelsTemp =  Math.round(feelsLikeTemp);
    document.getElementById("current-temp-header").textContent = `${currentTemp}`;
    document.getElementById("feels-like-temp").innerHTML = `<p>Feels Like: <span> ${feelsTemp}&deg;</span></p<`;
}

let getCurrentTimeStamp = (time) => {
    const unixtimestamp = time;
    const currentTime = new Date(unixtimestamp * 1000);
    document.getElementById("retrieved-time").innerHTML= `retrieved: ${currentTime}`;
}

let getCurrentMoistureConditions = (dewPoint, humidity) => {
    const currentDewPt = Math.round(dewPoint);
    const currentHumidity = Math.round(humidity * 100);
    document.getElementById("current-humidity").innerHTML= `Humidity: ${currentHumidity}%`;
    document.getElementById("current-dewpoint").innerHTML= `Dew Pt: ${currentDewPt}%`;
}

//Event Listener for when user clicks check weather button.
document.getElementById('geoBtn').addEventListener('click', geoFindMe);