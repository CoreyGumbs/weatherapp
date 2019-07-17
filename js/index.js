
import Location from './modules/getlocation.js';



let currentLocation = new Location();   

currentLocation.geoFindMe();

console.log(localStorage.getItem('currentCoords'));
document.querySelector('body').innerHTML = currentLocation;