require('dotenv').config()

const {  inquirerMenu,
    pause,
    readInput,
    listPlaces,
 } = require('./helpers/inquirer');

 const Searches = require('./models/searches')


const main = async()=> {

    const searches = new Searchs();
    let opt;

    do{

        opt = await inquirerMenu();
        
        switch( opt ) {

            case 1:
                // Mostrar mensaje
                const term = await readInput('Ciudad: ');
                
                // Buscar los lugares
                const places = await searches.city( term );
                
                // Seleccionar el lugar
                const id = await listPlaces(places);
                if ( id === '0' ) continue;

                const placeSelected = places.find( l => l.id === id );

                // Guardar en DB
                searches.addHistory( placeSelected.nombre );

                // Clima
                const weather = await searches.weatherPlace( placeSelected.lat, placeSelected.lng );

                // Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', placeSelected.name.green );
                console.log('Lat:', placeSelected.lat );
                console.log('Lng:', placeSelected.lng );
                console.log('Temperatura:', weather.temp );
                console.log('Mínima:', weather.min );
                console.log('Máxima:', weather.max );
                console.log('Como está el clima:',  weather.desc.green );

            break;


            case 2:
                 searches.historialCapitalizado.forEach( (place, i) =>  {
                     const idx = `${ i + 1 }.`.green;
                     console.log( `${ idx } ${ place } ` );
                 })

            break;

        }



        if ( opt !== 0 ) await pause();

    } while ( opt !== 0 )
}

main();