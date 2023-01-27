const fs = require('fs');
const axios = require('axios');

class Busquedas {

    historial = [];
    dbPath = './db/database.json'
    constructor(){
        this.leerDB()
    }

    get historialCapitalizado(){

        if(!this.historial) return null;

        return this.historial.map( lugar => {
            let palabrasArr = lugar.split(' ');

            palabrasArr = palabrasArr.map( palabra => palabra[0].toUpperCase() + palabra.substring(1) );

            return palabrasArr.join(' ');
        } )
    }

    get paramsMapbox(){
        return {
            'limit': 5,
            'language': 'es',
            'access_token': process.env.MAPBOX_KEY,
            }
    }

    get paramsWeather(){
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang': 'es'
        }
    }

    async ciudades( lugar = '' ){
        // petición http
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const res =  await instance.get();

            // La llamada retorna 5 objetos dentro de un arreglo. Para barrer todas
            // las posiciones del arreglos y retornar en un objeto los datos que necesitamos:
            return res.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));

        } catch (error) {
            return [];
        }
    }

    async climaLugar( lat, lon ){
        try {
            // instancia axios
            const instance = axios.create({
                baseURL: 'https://api.openweathermap.org/data/2.5/weather',
                params: { lat, lon, ...this.paramsWeather }
            })
            //res.data
            const res = await instance.get();
            const { main, weather } = res.data;

            return { 
                descripcion: weather[0].description, 
                min: main.temp_min, 
                max: main.temp_min, 
                temperatura: main.temp
            }


        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar = ''){
        // Prevenir duplicados
        if( this.historial.includes( lugar.toLowerCase() ) ){
            return;
        }

        this.historial = this.historial.splice(0, 5);

        this.historial.unshift( lugar.toLowerCase() );

        //Grabar en DB (en este caso JSON)
        this.guardarDB();
    }

    guardarDB(){
        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){

        if(!fs.existsSync( this.dbPath )) return;

        const info = fs.readFileSync( this.dbPath, {encoding: 'utf-8'} );
        const { historial } = JSON.parse(info);

        this.historial = historial;
    }
}

module.exports = Busquedas;