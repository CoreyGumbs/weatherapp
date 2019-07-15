class LocationStorage{
    constructor(){

        this.timeStamp = new Date().getTime()
        this.defaultLocation =  {
            'city': 'Central Park, New York, New York', 
            'lat': 40.7829, 
            'long': 73.9654, 
            'timestamp': this.timeStamp
        }
    }

    setLocation = (lat, long, currentCity)=>{

        let savedLocations = JSON.parse(localStorage.getItem('savedLocations'));
        let locations = [];

        if(!savedLocations){
            locations.push(this.defaultLocation);
            localStorage.setItem('savedLocations', JSON.stringify(locations));
            
        }else{
            
            if(savedLocations.length < 3){
                locations.push({'city': currentCity, 'lat': lat, 'long': long, 'timestamp': this.timeStamp}, ...savedLocations)
                localStorage.setItem('savedLocations', JSON.stringify(locations));
            }else{
                savedLocations.pop();
                locations.push({'city': currentCity, 'lat': lat, 'long': long, 'timestamp': this.timeStamp}, ...savedLocations)
                localStorage.setItem('savedLocations', JSON.stringify(locations));
            }
        }
    }

    setCoordinates = (lat, long) =>{ 
        let currentCoords = {"lat" : lat, "long" : long}
        localStorage.setItem("currentCoordinates", JSON.stringify(currentCoords));
    }

    getItem = (key) => {
        let retrievedData = JSON.parse(localStorage.getItem(key));

        return retrievedData
    }

    removeItem = key => {
        localStorage.removeItem(key);
    }

    clearStorageHandler = () => {
        localStorage.clear();
        console.log('worked');
    }
}