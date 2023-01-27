const axios = require('axios');

class Busquedas {

    historial = []
    constructor(){
        // TODO: leer DB si existe
    
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
}

module.exports = Busquedas;