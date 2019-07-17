import LocStorage  from './locstore.js';

class Location {
    constructor(){
        this.storage = new LocStorage();
        this.init = () => {
            this.storage.init();
        }

    }

    //get current location and save to local storage.
    geoFindMe = () => {
        let success = position => {
            let coords = position.coords;
            this.storeage.setCoordinates(coords.lat, coords.long);   
            console.log(coords);
        }

        let errorMsg = (error) => {
            console.log('Error Code: ' + error.code);
            console.log('Error Msg: ' + error.message);
            document.querySelector('body').innerHTML = `${error.message}`;
            console.error(error);
        }

        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(success, errorMsg);
        }else{
            document.querySelector('body').innerHTML= "Geolocation is not supported.";
        }

    }

}


export default Location;