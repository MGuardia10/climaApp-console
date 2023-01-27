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
                const lugarSel = lugares.find( lugar => lugar.id === id );
                // clima
                // mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSel.nombre);
                console.log('Lat:', lugarSel.lat);
                console.log('Lng', lugarSel.lng);
                console.log('Temperatura', );
                console.log('Mínima:', );
                console.log('Máxima:', );
                break;
        
            case 2:
                break;
            
            case 0:
                break;



        }

        if( opt !== 0 ) await pausa();
        
    } while (opt !== 0);


}

main();