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

    async ciudad( lugar = '' ){
        // petición http
        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            })

            const res =  await instance.get();
            console.log(res.data.features);
        } catch (error) {
            return [];
        }

        return [] // retornar las ciudades que coincidan con lugar ingresado
    }
}

module.exports = Busquedas;