
import Location from './modules/getlocation.js';

let currentLocation = new Location();   

currentLocation.goFindMe();

document.querySelector('body').innerHTML = currentLocation.storage;