class Fetch {
    constructor(url){
        this.url = url;
    }

    get = async ()=>{
        let res = await fetch(this.url).catch(error => {
            errorMsg(error);
        });
        
        let data = await res.json();
        console.log(res, data);
        return data;
    }
}