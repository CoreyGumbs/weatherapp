class LocStore{
    constructor(){

        this.timeStamp = new Date().getTime(),
        this.defaultLocation =  {
            'city': 'Central Park, New York, New York', 
            'lat': 40.7829, 
            'long': 73.9654, 
            'timestamp': this.timeStamp
        },
        this.init = () => {
            this.setDefaultLocation();
        }
    }

    setDefaultLocation = () => {
        let savedLocations = JSON.parse(localStorage.getItem('savedLocations'));

        if(!savedLocations){
            localStorage.setItem('savedLocations', JSON.stringify(this.defaultLocation));
            this.setCoordinates(this.defaultLocation.lat, this.defaultLocation.long);
        }
    }

    setLocation = (lat, long, currentCity)=>{

        let savedLocations = JSON.parse(localStorage.getItem('savedLocations'));
        let locations = [];
            
        if(savedLocations.length < 3){
            locations.push({'city': currentCity, 'lat': lat, 'long': long, 'timestamp': this.timeStamp}, ...savedLocations)
            localStorage.setItem('savedLocations', JSON.stringify(locations));
        }else{
            savedLocations.pop();
            savedLocations.unshift({'city': currentCity, 'lat': lat, 'long': long, 'timestamp': this.timeStamp});
            localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
        }
        
    }

    setCoordinates = (lat, long) =>{ 
        let currentCoords = {"lat" : lat, "long" : long}
        localStorage.setItem("currentCoords", JSON.stringify(currentCoords));
    }

    getItem = (key) => {
        let retrievedData = JSON.parse(localStorage.getItem(key));

        return retrievedData
    }

    setItem = (keyName, value) => {
        localStorage.setItem(keyName, JSON.stringify(value))
    }

    removeItem = key => {
        localStorage.removeItem(key);
    }

    clearStorageHandler = () => {
        localStorage.clear();
        console.log('worked');
    }
}

export default LocStore;