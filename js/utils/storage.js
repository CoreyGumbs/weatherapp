class MyStorage {
    constructor(lat, long){
        this.latitude = lat,
        this.longitude = long,
        this.timeStamp = new Date().getTime(), 
        this.currentLocation = ''
    }
     
    usrLocation = async () => {
        const res = await fetch(`https://coreygumbs-eval-test.apigee.net/location/geocode/reverse?location=${this.latitude},${this.longitude}`).catch(err =>{
            console.log(err);
        });
        
        const location = await res.json();

        this.currentLoc(location.results);
    }

    currentLoc = async (loc) => {
        let locationData = await loc[0].locations[0];
        console.log(locationData);
        this.currentLocation = locationData.adminArea5 + ", "  + locationData.adminArea4 + ", "  + locationData.adminArea3 + ", "  + locationData.adminArea1;
    }

}
