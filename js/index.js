//mport MyStorage from "./utils/storage";

let latitude = 40.6413111; 
let longitude = -73.7781391;

let userLoc = new MyStorage(latitude, longitude);

let locData = userLoc.usrLocation();


console.log(locData, userLoc);


