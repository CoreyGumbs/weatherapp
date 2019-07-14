//mport MyStorage from "./utils/storage";


// let userLoc = new MyStorage(latitude, longitude);


// console.log(userLoc.get_Location());
// let locData = userLoc.usrLocation();


// console.log(userLoc.currentLocation);

//document.getElementById("myLocation").innerHTML = locData;

let currentLocationData = new LocationStorage();

//currentLocationData.save(40.6413111, -73.7781391, "Jamaica, Queens, NYC");
//currentLocationData.save(45.6413111, -78.7781391, "Forest Hills, Queens, NYC");
currentLocationData.save(34.6413111, -78.7781391, "St Albans, Queens, NYC");

console.log(localStorage);