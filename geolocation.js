

let getGeoPosition = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(geoSuccess);
    }else{
        document.getElementById('errMsg').innerHTML = 'browser doesn\'t support geolocation';
    }
}

//You cant store/retrieve Geolocation coordinates, but you can pass them to other functions to be used. 
let weatherArray = []
let weatherData;



let geoSuccess = (position) => {

    let geoDataItem = document.querySelectorAll('.geoData');
    let latPos = position.coords.latitude;
    let longPos = position.coords.longitude;
    let timeStamp = new Date(position.timestamp).toLocaleString();

    geoDataItem[0].innerHTML = 'Latitude: ' + latPos;
    geoDataItem[1].innerHTML = 'Longitude: ' + longPos;
    geoDataItem[2].innerHTML = 'Time: ' + timeStamp;

 
    weatherArray.push(latPos, longPos, timeStamp);

    let weatherURL = `https://coreygumbs-eval-test.apigee.net/localweather/${latPos},${longPos}`;

    fetch(weatherURL).then((response) => {
        if(response.ok){
            weatherArray.push(response); 
        };  
    }).catch( err => console.error('Error: ' + err));

}

let getWeatherData = (lat, long) => {

    let weatherURL = `https://coreygumbs-eval-test.apigee.net/localweather/${lat},${long}`;

    return weatherURL;
}



document.getElementById('geoBtn').addEventListener('click', getGeoPosition);



console.log(weatherData);
