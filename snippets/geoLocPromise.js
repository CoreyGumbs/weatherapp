
//because of the way javascript loads, the global variable isnt storing data... you have to have it run when the page is fully loaded. Use JQuwry $(document.ready() or find alternative for async information... maybe using a Promise?
//Geolocatoin is async so it will not return the results immediately, using a promise will fix that. 


const getCurrentGeoPosition = () => {
    //create object to store geoposition data.
    let geoPosition = {};
   

    //Promise using async to retrieve data location
    //Object would return empty data set before geolocation data populated
    const getGeoPosition = new Promise((resolve, reject) => {

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(resolve, reject);
        }else{
            reject({
                error: 'browser doesn\'t support geolocation'
            })
        }
    });

    getGeoPosition.then((data)=>{

        //assign needed data points to geoPosition object
        geoPosition['latitude'] = data.coords.latitude;
        geoPosition['longitude'] = data.coords.longitude;
        geoPosition['timeStamp'] = new Date(data.timestamp).toLocaleString();

    }).catch((error) => {
        console.log('Error', error);
    });

    return geoPosition;
}


document.getElementById('geoBtn').addEventListener('click', getCurrentGeoPosition);


let geoLocSuccess = () => {
    
}



//weather data placeholder;
// let geoLocData = [];
// let weatherData;


// //geolocation success function
// let geoSuccess = (position) => {
//     //make geolocation time stamp human readable
//     let geoTimeStamp = new Date(position.timestamp).toLocaleString();  

//     fetch(`https://coreygumbs-eval-test.apigee.net/localweather/${position.coords.latitude},${position.coords.longitude}`)
//     .then((response) => {

//         console.log('Geolocation Retrieved: ' + geoTimeStamp);
//         console.log('Response Status: ' + response.status);

//         return response.json();
//     })
//     .then(jsonData => {
//         return jsonData;
//     })
//     .then(data => {
//         weatherData = data;
//         console.log(weatherData);
//         return data;
//     })
//     .catch( err => console.error('Error: ' + err));
// }

// //checks for geolocation    
// let getGeoPosition = () => {
//     let geoNav =  navigator.geolocation.getCurrentPosition(geoSuccess);
//     if(navigator.geolocation){
//        return geoNav
//     }else{
//         document.getElementById('errMsg').innerHTML = 'browser doesn\'t support geolocation';
//     }
// }

// document.getElementById('geoBtn').addEventListener('click', getGeoPosition);