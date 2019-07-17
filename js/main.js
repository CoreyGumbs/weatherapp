
import Location from './modules/getlocation.js';

let currentLocation = new Location();   

document.querySelector('body').innerHTML = currentLocation.storage;