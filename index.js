const { leerInput, pausa, inquirerMenu, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");
require('dotenv').config();

// console.log(process.env);


const main = async() => {
    
    const busquedas = new Busquedas();
    let opt;

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                // mostrar mensaje
                const terminoBusqueda = await leerInput( 'Ciudad:' );
                // Buscar los lugares
                const lugares = await busquedas.ciudades( terminoBusqueda );
                // seleccionar el lugar
                const id = await listarLugares( lugares );
                if( id === '0' ) continue;
                const lugarSel = lugares.find( lugar => lugar.id === id );
                // Guardar en DB
                busquedas.agregarHistorial( lugarSel.nombre );
                // clima
                const clima = await busquedas.climaLugar( lugarSel.lat, lugarSel.lng );
                // mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', (lugarSel.nombre).yellow);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng', lugarSel.lng);
                console.log('Temperatura:', clima.temperatura);
                console.log('Mínima:', clima.min);
                console.log('Máxima:', clima.max);
                console.log('Cómo está el clima:', (clima.descripcion).yellow);
                break;
        
            case 2:
                busquedas.leerDB();

                busquedas.historialCapitalizado.forEach( (lugar, i) => {
                    const idx = `${ i + 1 }`.green;
                    console.log( idx, lugar );
                } )

                break;
            
            case 0:
                break;



        }

        if( opt !== 0 ) await pausa();
        
    } while (opt !== 0);


}

main();