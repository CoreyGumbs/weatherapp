
//because of the way javascript loads, the global variable isnt storing data... you have to have it run when the page is fully loaded. Use JQuwry $(document.ready() or find alternative for async information... maybe using a Promise?
//Geolocatoin is async so it will not return the results immediately, using a promise will fix that. 
   

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
        let geoPosition = {};

        //assign needed data points to geoPosition object
        geoPosition['latitude'] = data.coords.latitude;
        geoPosition['longitude'] = data.coords.longitude;
        geoPosition['timeStamp'] = new Date(data.timestamp).toLocaleString();
        
        console.log(geoPosition);

        return geoPosition;

    }).catch((error) => {
        console.log('Error', error);
    });




