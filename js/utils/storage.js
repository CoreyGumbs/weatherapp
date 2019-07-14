class LocationStorage{
    constructor(){
        this.default_lat = 40.6413111, 
        this.default_long = -73.7781391,
        this.timeStamp = new Date().getTime()
    }

    save = (lat, long, currentCity)=>{
        let savedLocations = JSON.parse(localStorage.getItem('savedLocations'));
        let locations = [];

        if(!savedLocations){
            locations.push({'city': currentCity, 'lat': lat, 'long': long, 'timestamp': this.timeStamp});
            localStorage.setItem('savedLocations', JSON.stringify(locations));
            
        }else{
        
            locations.push({'city': currentCity, 'lat': lat, 'long': long, 'timestamp': this.timeStamp}, ...savedLocations)
            localStorage.setItem('savedLocations', JSON.stringify(locations));
            console.log(savedLocations);
        }
       
    } 
}