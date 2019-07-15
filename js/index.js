

let currentLocationData = new LocationStorage();

//currentLocationData.setLocation(40.6413111, -73.7781391, "Jamaica, Queens, NYC");
currentLocationData.setLocation(45.6413111, -78.7781391, "Forest Hills, Queens, NYC");
//currentLocationData.setLocation(34.6413111, -78.7781391, "St Albans, Queens, NYC");

currentLocationData.setCoordinates(40.6413111, -78.7781391);

let coords = currentLocationData.getItem('currentCoordinates');
let myLocations = currentLocationData.getItem('savedLocations');

let clearBtn = document.getElementById("clearBtn");
clearBtn.innerHTML = "Clear Storage";
clearBtn.addEventListener("click", currentLocationData.clearStorageHandler);


console.log(localStorage);

console.log(coords, myLocations)