require('dotenv').config();

const { leerInput, inquirerMenu, inquirerPausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busqueda");

const main = async () => {

    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //mostar mensaje
                const busqueda = await leerInput('Ciudad: ');
                //buscar lugares
                const lugares = await busquedas.ciudad(busqueda);
                //seleccionar lugar
                const id = await listarLugares(lugares);
                //guardar en DB
                const {nombre, lat, lng} = lugares.find(l => l.id === id);
                busquedas.agregarHistorial(nombre);
                //clima
                const {temp, min, max, desc} = await busquedas.climaLugar(lat, lng);
                //mostar resultados
                console.log('\nInformacion de la ciudad\n'.green);
                console.log('Ciudad: ', nombre.green);
                console.log('Lat:', lat);
                console.log('Lng:', lng);
                console.log('Temperatura:', temp);
                console.log('Minima:', min);
                console.log('Maxima:', max);
                console.log('Maxima:', desc.green);
                break;
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });
                break;
        }
        if (opt !== 0) await inquirerPausa();
    } while (opt !== 0);
}

main();