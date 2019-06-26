//current coordinates placeholder
coordsArray = [];


let geoFindMe = () => {
    let geoSuccess = position => {

        getData(`https://coreygumbs-eval-test.apigee.net/localweather/${position.coords.latitude},${position.coords.longitude}`)
        .catch(error =>{
            console.log('Error Code: ' + error.code);
            console.log('Error Msg: ' + error.message);
            console.error(error);
        });

    }

    let geoError = error =>{
        console.log('Error Code: ' + error.code);
        console.log('Error Msg: ' + error.message);
    }

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
    }else{
        document.getElementById('errMsg').innerHTML = 'browser doesn\'t support geolocation';
    }

}

let getData = async url => {
    const response = await fetch(url);
    const weatherData = await response.json();

    getCoords(weatherData.latitude, weatherData.longitude)
    .catch(error =>{
        console.log('Error Code: ' + error.code);
        console.log('Error Msg: ' + error.message);
        console.error(error);
    });

    console.log(weatherData);

    document.getElementById("weatherData").innerHTML = weatherData.currently.summary + '<br />' + `Temperature: ${Math.round(weatherData.currently.temperature)} &deg;`;
}

let getCoords = async (lat, long) => {
    const coords = await coordsArray.push(lat, long);
    myCoords();
}

let myCoords = () => {
    return coordsArray;
}



document.getElementById('geoBtn').addEventListener('click', geoFindMe);
