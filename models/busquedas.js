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
}

module.exports = Busquedas;