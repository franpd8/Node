const Logger = require('logplease');
const logger = Logger.create('');

exports.esPar = (num) =>{
    if( (num % 2) == 0 ){  
        // devuelve directamente el mensaje   
    return logger.info('El número es par')
    } else {
    return logger.error('El número es impar')
    }
}

