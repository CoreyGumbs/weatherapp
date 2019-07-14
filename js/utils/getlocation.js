class getLocation {
    constructor(lat, long){
        this.default_lat = 40.6413111, 
        this.default_long = -73.7781391,
        this.latitude = lat,
        this.longitude = long,
        this.timeStamp = new Date().getTime(), 
        this.currentLocation = ''
    }

    get_Location = async () => {

        if(this.lat === undefined & this.long === undefined){

            const res = await fetch(`https://coreygumbs-eval-test.apigee.net/location/geocode/reverse?location=${this.default_lat},${this.default_long}`)
            .catch(err =>{
                console.log(err);
            });
            const defualt_location= await res.json();

            return this.currentLoc(default_location.results);

        }else{

            const res = await fetch(`https://coreygumbs-eval-test.apigee.net/location/geocode/reverse?location=${this.latitude},${this.longitude}`)
            .catch(err =>{
                console.log(err);
            });
        
            const location = await res.json();

            return this.currentLoc(location.results);
        }

    }
     
    usrLocation = async () => {
        const res = await fetch(`https://coreygumbs-eval-test.apigee.net/location/geocode/reverse?location=${this.latitude},${this.longitude}`).catch(err =>{
            console.log(err);
        });
        
        const location = await res.json();

        return this.currentLoc(location.results);
    }

    currentLoc = async (loc) => {
        let locationData = await loc[0].locations[0];
        let myCurrentLocation = await locationData.adminArea5 + ", "  + locationData.adminArea4 + ", "  
        + locationData.adminArea3 + ", "  + locationData.adminArea1;
        this.currentLocation = myCurrentLocation;
        return myCurrentLocation;
    }

}
