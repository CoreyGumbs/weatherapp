import PositionStorage  from './positionstorage.js/index.js';
import errorMsg from './error.js';

class Location {
    constructor(){
        this.storage = new PositionStorage();
        this.init = () => {
            this.storage.init();
            this.reversePositionLookup();
        },
        this.currentLatitude = '',
        this.currentLongitude = ''
    }

    goFindMe = () => {

        let geoSuccess = position =>{
            this.currentLatitude = position.coords.latitude;
            this.currentLongitude = position.coords.longitude;
            console.log(`Geolocation Success!! Current coordinates are: Lat: ${this.currentLatitude}, Long ${this.currentLongitude}`);
            return position.coords; 
        }

        let geoOptions = {
            enableHighAccuracy: true,
            timeout : 10000
        }

       if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(geoSuccess, errorMsg, geoOptions);
       }else{
           document.querySelector('body').innerHTML = 'browser doesn\'t support geolocation';
       }
    }

    reversePositionLookup = () => {
        console.log(this.storage.defaultLocation);
    }

    
}

export default Location;