import LocStorage  from './locstore.js';

class Location {
    constructor(){
        this.storage = new LocStorage();
        this.init = () => {
            this.storage.init();
            this.goFindMe();
        }

    }

    goFindMe = () => {

        let errorMsg = (error) => {
            console.log('Error Code: ' + error.code);
            console.log('Error Msg: ' + error.message);
            console.error(error);
        }

        let geoSuccess = position =>{
            this.storage.setCoordinates(position.coords.latitude, position.coords.longitude);
            console.log(this.storage.getItem('currentCoords'));
            return position.coords; 
        }

       if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(geoSuccess, errorMsg);
       }else{
           document.querySelector('body').innerHTML = 'browser doesn\'t support geolocation';
       }
    }
}

export default Location;