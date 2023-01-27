const { leerInput, pausa, inquirerMenu } = require("./helpers/inquirer");
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
                const lugar = await leerInput( 'Ciudad:' );
                busquedas.ciudad( lugar );
                // Buscar los lugares
                // seleccionar el lugar
                // clima
                // mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad', );
                console.log('Lat:', );
                console.log('Alt', );
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