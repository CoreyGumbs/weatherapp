
import Location from './modules/getlocation.js';

let currentLocation = new Location(); 
currentLocation.init();


let geoBtn = document.getElementById('currnetLocBtn');
geoBtn.textContent = "Update Location";
geoBtn.addEventListener('click', currentLocation.goFindMe);
