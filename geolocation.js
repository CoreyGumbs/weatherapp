let getGeoPosition = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(geoSuccess);
        
    }else{
        document.getElementById('message').innerHTML = 'browser doesn\'t support geolocation';
    }
}


let geoSuccess = (position) => {
    console.log(position);
    let geoDataItem = document.querySelectorAll('.geoData');
    let latPos = position.coords.latitude;
    let longPos = position.coords.longitude;
    let timeStamp = new Date(position.timestamp).toLocaleString();

    geoDataItem[0].innerHTML = 'Latitude: ' + latPos;
    geoDataItem[1].innerHTML = 'Longitude: ' + longPos;
    geoDataItem[2].innerHTML = 'Time: ' + timeStamp;

    coordsData(latPos, longPos, timeStamp);
    
}

let coordsData = (lat, long, time) => {
    return {
        latitude: lat,
        longitude: long,
        time: time
    }
}

console.log(coordsData());

document.getElementById('geoBtn').addEventListener('click', getGeoPosition);