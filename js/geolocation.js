
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
        // if(response.ok){
        //     weatherArray.push(response.json()); 
        //     document.getElementById("weatherData").innerHTML = weatherArray[3];
        //     console.log(weatherArray[3]);
           
        // };  
        response.json().then( data => {
         return data;
        }).then(res => {
           weatherArray.push(res);
           weatherData = res;
           console.log(weatherData)
           document.getElementById("weatherData").innerHTML = weatherData.currently.apparentTemperature + weatherData.currently.summary;
        });

    }).catch( err => console.error('Error: ' + err));
}

let getGeoPosition = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(geoSuccess);
    }else{
        document.getElementById('errMsg').innerHTML = 'browser doesn\'t support geolocation';
    }
}

document.getElementById('geoBtn').addEventListener('click', getGeoPosition);

console.log(weatherArray);