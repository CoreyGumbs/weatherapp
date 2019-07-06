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
    getCurrentUVIndex(weatherData.currently.uvIndex);
    getCurrentOzoneIndex(weatherData.currently.ozone);
    getCurrentVisibility(weatherData.currently.cloudCover, weatherData.currently.visibility);
    getCurrentWindConditions(weatherData.currently.windBearing, weatherData.currently.windSpeed, weatherData.currently.windGust);//weatherData.currently.windBearing
    getCurrentPrecipitation(weatherData.currently.precipProbability, weatherData.currently.preciptType, weatherData.currently.precipIntensity);
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
    const options =  {
        hour12: "true",
        weekday: "long",
        year: "numeric", 
        month: "long",
        day: "numeric"
    }
    const currentTime = new Date(unixtimestamp * 1000).toLocaleTimeString(undefined, options);
    document.getElementById("retrieved-time").textContent = `retrieved: ${currentTime}`;
}

let getCurrentMoistureConditions = (dewPoint, humidity) => {
    const currentDewPt = Math.round(dewPoint);
    const currentHumidity = Math.round(humidity * 100);
    document.getElementById("current-humidity").textContent= `Humidity: ${currentHumidity}%`;
    document.getElementById("current-dewpoint").textContent= `Dew Pt: ${currentDewPt}%`;
}

let getCurrentUVIndex = (uvLvl) => {
    let uvIndex = document.getElementById("current-uvIndex");

    uvIndex.textContent = `UV Index: ${uvLvl} nm`;

    switch(true){
        case (uvLvl < 3):
            uvIndex.style.backgroundColor = "green";
            console.log('UV Index: ' + uvLvl);
            break

        case ((uvLvl >= 3) && (uvLvl <= 5)):
            uvIndex.style.backgroundColor = "yellow";
            console.log('UV Index: ' + uvLvl);
            break;
        
        case ((uvLvl > 5) && (uvLvl <= 7)):
            uvIndex.style.backgroundColor = "orange";
            console.log('UV Index: ' + uvLvl);
            break;
        
        case ((uvLvl > 7) && (uvLvl <= 10)):
            uvIndex.style.backgroundColor = "red";
            console.log('UV Index: ' + uvLvl);
            break;
        
        case (uvLvl >= 11):
            uvIndex.style.color = "white";
            uvIndex.style.backgroundColor = "purple";
            console.log('UV Index: ' + uvLvl);
            break;
    }
}

let getCurrentOzoneIndex = (ozLvl) =>{
    let ozoneIndex = document.getElementById("current-ozone-index");

    ozoneIndex.textContent = `Ozone Level: ${ozLvl} DU`;
    
    switch(true){
        case (ozLvl <= 50):
            ozoneIndex.style.backgroundColor = "green";
            console.log("Ozone Level: " + ozLvl);
            break;

        case ((ozLvl > 50) && (ozLvl <= 100)):
            ozoneIndex.style.backgroundColor = "yellow";
            console.log("Ozone Level: " + ozLvl);
            break;

        case ((ozLvl > 100) && (ozLvl <= 150)):
            ozoneIndex.style.backgroundColor = "orange";
            console.log("Ozone Level: " + ozLvl);
            break;
        
        case ((ozLvl > 150) && (ozLvl <= 200)):
            ozoneIndex.style.color = "white";
            ozoneIndex.style.backgroundColor = "red";
            console.log("Ozone Level: " + ozLvl);
            break;

        case ((ozLvl > 200) && (ozLvl <= 300)):
            ozoneIndex.style.color = "white";
            ozoneIndex.style.backgroundColor = "#99004B";
            console.log("Ozone Level: " + ozLvl);
            break;
    
        case ((ozLvl > 300) && (ozLvl <= 500)):
            ozoneIndex.style.color = "white";
            ozoneIndex.style.backgroundColor = "maroon";
            console.log("Ozone Level: " + ozLvl);
            break;
    }
}

let getCurrentVisibility = (cloudCover, visibility) => {
    const currentVisability = Math.round(visibility);
    const currentCloudCover = Math.round(cloudCover * 100);
    document.getElementById('current-visibility').textContent = `Visibility: ${currentVisability} miles`;
    document.getElementById('current-cloud-cover').textContent = `Cloud Cover: ${currentCloudCover}%`;

    console.log("Curent Cloud Cover & Visibility: ", `${currentCloudCover}%`, `${currentVisability}miles`);
}

let getCurrentWindConditions = (bearing, speed, gusts) =>{
    let windBearing = bearing;
    let windSpeed =  Math.round(speed);
    let windGusts = Math.round(gusts);
    let windBearingDiv = document.getElementById("current-wind-bearing");
    let windBearingImg = document.createElement('img');
    windBearingImg.src = "./imgs/wind-direction.png";
    windBearingImg.id = "wind-bearing-img";
    windBearingDiv.appendChild(windBearingImg);

    console.log(windBearing, windSpeed, windGusts);

    document.getElementById("current-wind-speed").textContent = `Wind Speed: ${windSpeed}mph`;
    document.getElementById("current-wind-gust").textContent = `Wind Gusts: ${windGusts}mph`;

    switch(true){
        case (windBearing >= 348.75 || windBearing < 11.25):
            console.log(windBearing + "° -=- N" );
            break;

        case(windBearing >= 11.25 && windBearing < 33.75):
            document.getElementById("wind-bearing-img").className = "northNorthEast";
            console.log(windBearing + "° -=- NNE" );
            break;

        case(windBearing >= 33.75 && windBearing < 56.25):
            document.getElementById("wind-bearing-img").className = "northEast";
            console.log(windBearing + "° -=- NE" );
            break;
        
        case(windBearing >= 52.25 && windBearing < 78.25):
            document.getElementById("wind-bearing-img").className = "eastNorthEast";
            console.log(windBearing + "° -=- ENE" );
            break;
        
        case(windBearing >= 78.25 && windBearing < 101.25):
            document.getElementById("wind-bearing-img").className = "east";
            console.log(windBearing + "° -=- E" );
            break;
        
        case(windBearing >= 101.25 && windBearing < 123.75):
            document.getElementById("wind-bearing-img").className = "eastSouthEast";
            console.log(windBearing + "° -=- ESE" );
            break;
        
        case(windBearing >= 123.75 && windBearing < 146.25):
            document.getElementById("wind-bearing-img").className = "southEast";
            console.log(windBearing + "° -=- SE" );
            break;
        
        case(windBearing >=146.25 && windBearing < 168.75):
            document.getElementById("wind-bearing-img").className = "southSouthEast";
            console.log(windBearing + "° -=- SSE" );
            break;
        
        case(windBearing >= 168.75 && windBearing < 191.25):
            document.getElementById("wind-bearing-img").className = "south";
            console.log(windBearing + "° -=- S" );
            break;
        
        case(windBearing >= 191.25 && windBearing < 213.75):
            document.getElementById("wind-bearing-img").className = "southSouthWest";
            console.log(windBearing + "° -=- SSW" );
            break;
        
        case(windBearing >= 213.75 && windBearing < 236.25):
            document.getElementById("wind-bearing-img").className = "southWest";
            console.log(windBearing + "° -=- SW" );
            break;

        case(windBearing >= 236.25 && windBearing < 258.75):
            document.getElementById("wind-bearing-img").className = "westSouthWest";
            console.log(windBearing + "° -=- WSW" );
            break;
        
        case(windBearing >= 258.75 && windBearing < 281.25):
            document.getElementById("wind-bearing-img").className = "west";
            console.log(windBearing + "° -=- W" );
            break;
        
        case(windBearing >= 281.25 && windBearing < 303.75):
            document.getElementById("wind-bearing-img").className = "westNorthWest";
            console.log(windBearing + "° -=- WNW" );
            break;
        
        case(windBearing >= 303.75 && windBearing < 326.25):
            document.getElementById("wind-bearing-img").className = "northWest";
            console.log(windBearing + "° -=- NW" );
            break;
        
        case(windBearing >= 326.25 && windBearing < 348.75):
            document.getElementById("wind-bearing-img").className = "northNorthWest";
            console.log(windBearing + "° -=- NNW" );
            break;
    }
}

let getCurrentPrecipitation = (probability, precipType=null, precipIntensity) => {
    let precipProbability = probability * 100;

    if(precipType !== null){
        document.getElementById("current-precip-type").textContent = `Precipitation Type: ${precipType}`;
        console.log(precipType);
    }else{
        document.getElementById("current-precip-type").className = "hidden";
    }

    document.getElementById("current-precip-probability").textContent = `Current Precipitation Probability: ${precipProbability}%`;
    document.getElementById("current-precip-intensity").textContent = `Current Precipitation Intensity: ${precipIntensity}in/hr`;

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
/** 
 * need to use forEach or Map to cycle and format the daily & hourly data sets
 *  
 * 
 * 
 * 
 * 
 * 
 * **/