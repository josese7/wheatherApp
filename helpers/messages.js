require('colors')

const  showMenu = () =>{

    return new Promise(resolve => {
        
        console.clear()
        console.log('==========================='.green)
        console.log('   Selecciona una opción   '.green)
        console.log('==========================='.green)
    
    
        console.log(`${ '1.'.green } Crear tarea`);
        console.log(`${ '2.'.green } Listar tareas`);
        console.log(`${ '3.'.green } Listar tareas completadas`);
        console.log(`${ '4.'.green } Listar tareas pendientes`);
        console.log(`${ '5.'.green } Completar tarea(s)`);
        console.log(`${ '6.'.green } Borrar tarea`);
        console.log(`${ '0.'.green } Salir \n`);
    
    
    
        /* Creación del objeto para leer del teclado */
       
        const readLine = readLineFactory()
        readLine.question('Seleccione una opción: ', (opt) =>{
         
            readLine.close();
            resolve(opt);
        })
    })

    

}

const readLineFactory = ()=>{
    let readLine = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,


    })
    return readLine
}


const pause = ()=>{

    return new Promise(resolve => {
        
        const readLine = readLineFactory();
    
        readLine.question(`\nPresione ${ 'ENTER'.green} para continuar\n`, (opt) =>{
            readLine.close();
            resolve(opt)
     })
    })


 }

module.exports = {
    showMenu,
    pause
}