    // window.addEventListener('load', () =>{
    //     geoFindMe();
    // });
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

    console.log(weatherData);
    getCurrentTemperatures(weatherData.currently.temperature, weatherData.currently.apparentTemperature);
    getCurrentTimeStamp(weatherData.currently.time);
    getCurrentMoistureConditions(weatherData.currently.dewPoint, weatherData.currently.humidity);
    getCurrentWeatherIcons(weatherData.currently.icon);
    getCurrentUVIndex(8);

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
    document.getElementById("current-temp-header").innerHTML = `${currentTemp}&deg;`;
    document.getElementById("feels-like-temp").innerHTML = `<p>Feels Like: <span> ${feelsTemp}&deg;</span></p>`;
}

let getCurrentTimeStamp = (time) => {
    const unixtimestamp = time;
    const currentTime = new Date(unixtimestamp * 1000);
    document.getElementById("retrieved-time").textContent = `retrieved: ${currentTime}`;
}

let getCurrentMoistureConditions = (dewPoint, humidity) => {
    const currentDewPt = Math.round(dewPoint);
    const currentHumidity = Math.round(humidity * 100);
    document.getElementById("current-humidity").textContent= `Humidity: ${currentHumidity}%`;
    document.getElementById("current-dewpoint").textContent= `Dew Pt: ${currentDewPt}%`;
}

let getCurrentUVIndex = (uv) => {
    let uvIndex = document.getElementById("current-uvIndex");

    uvIndex.textContent = uv;

    switch(true){
        case (uv < 3):
            uvIndex.style.backgroundColor = "green";
            console.log('uv index: ' + uv);
            break

        case ((uv >= 3) && (uv <= 5)):
            uvIndex.style.backgroundColor = "yellow";
            console.log('uv index: ' + uv);
            break;
        
        case ((uv > 5) && (uv <= 7)):
            uvIndex.style.backgroundColor = "orange";
            console.log('uv index: ' + uv);
            break;

    }
}

let getCurrentWeatherIcons =  (icon) => { 
    const iconType = icon;

    const iconCanvas = document.createElement('canvas');
    iconCanvas.id = iconType;
    iconCanvas.width = 200;
    iconCanvas.height = 200;
    
    const iconLocation = document.getElementById("current-temp-icon-container");
    iconLocation.appendChild(iconCanvas);

    const skyIcon = new Skycons({
        "monochrome": false,
        "colors": {
            "main": "#000",
            "sun": "#F2D377",
            "cloud": "#1B72BF"
        }
    }); 

    switch(iconType){

        case 'clear-day':
            skyIcon.set(iconType, Skycons.CLEAR_DAY);
            skyIcon.play();
            console.log("current icon: " + iconType);
            break;

        case 'clear-night':
            skyIcon.set(iconType, Skycons.CLEAR_NIGHT);
            skyIcon.play();
            console.log("current icon: " + iconType);
            break;

        case 'partly-cloudy-day':
            skyIcon.set(iconType, Skycons.PARTLY_CLOUDY_DAY);
            skyIcon.play();
            console.log("current icon: " + iconType);
            break;

        case 'partly-cloudy-night':
            skyIcon.set(iconType, Skycons.PARTLY_CLOUDY_NIGHT);
            skyIcon.play();
            console.log("current icon: " + iconType);
            break;

        case 'cloudy':
            skyIcon.set(iconType, Skycons.CLOUDY);
            skyIcon.play();
            console.log("current icon: " + iconType);
            break;

        case 'rain':
            skyIcon.set(iconType, Skycons.RAIN);
            skyIcon.play();
            console.log("current icon: " + iconType);
            break;

        case 'sleet':
            skyIcon.set(iconType, Skycons.SLEET);
            skyIcon.play();
            console.log("current icon: " + iconType);
            break;

        case 'snow':
            skyIcon.set(iconType, Skycons.SNOW);
            skyIcon.play();
            console.log("current icon: " + iconType);
            break;

        case 'wind':
            skyIcon.set(iconType, Skycons.WIND);
            skyIcon.play();
            console.log("current icon: " + iconType);
            break;
        
        case 'fog':
            skyIcon.set(iconType, Skycons.FOG);
            skyIcon.play();
            console.log("current icon: " + iconType);
            break;
    }   
}

//Event Listener for when user clicks check weather button.
document.getElementById('geoBtn').addEventListener('click', geoFindMe);
