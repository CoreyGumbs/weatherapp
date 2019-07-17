
import PositionStorage  from './positionstorage.js';
import errorMsg from './error.js';

class Location {
    constructor(){
        this.storage = new PositionStorage();
        this.storedCities = this.storage.getItem('savedLocations');
        this.storedCurrentCoords = this.storage.getItem('currentCoords'),
        this.init = () => {
            //adds default data to localStorage if not present.
            this.storage.init();
        },
        this.weatherData = ''
    }

    goFindMe = () => {

        let geoSuccess = position =>{
            this.storage.setItem('currentCoords', {latitude: position.coords.latitude, longitude: position.coords.longitude});
            this.storedCurrentCoords = {latitude: position.coords.latitude, longitude: position.coords.longitude};
            console.log('Stored Current Coords: ' + this.storedCurrentCoords.latitude);
            console.log(`Geolocation Success!! Current coordinates are: Lat: ${this.storedCurrentCoords.latitude}, Long: ${this.storedCurrentCoords.longitude}`);
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

   currentRevLookup = (lat, long) => {
       console.log(lat, long);
   }
    
}

export default Location;