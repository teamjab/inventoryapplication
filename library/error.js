'use strict';

/////////// ERROR FUNCTIONS ///////////////

function notFoundHandler(request, response) {
    response.status(404).render('./pages/404.ejs');
}

function errorHandler(error, request, response) {
    console.log('error!', error)
    response, status(500).send(error);
}

module.exports = {  
    errorHandler: errorHandler,
    notFoundHandler: notFoundHandler
}