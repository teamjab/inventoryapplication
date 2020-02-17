'use strict';

const client = require('./client.js')

///////////////////////////////// CALLBACKS ////////////////////////////////////

//renders index with login set to false //
function indexPage(request, response) {
    response.render('./index', { loginFailed: false });
}

//checks username and password, if login successful, renders inventory.ejs. else renders a message in index.ejs that login failed //
function login(request, response) {
    let { username, password } = request.body;
    let SQL = 'SELECT * from users WHERE $1 = username AND password = crypt($2, password);';
    let safeValue = [username, password];
    client.query(SQL, safeValue)
        .then(result => {
            if (result.rowCount === 1) {
                let SQL1 = 'SELECT * from user-storage;';
                client.query(SQL1)
                    .then(item => {
                        response.render('./pages/inventory.ejs', { item: item })
                    })
            } else {
                response.render('./index', { loginFailed: true });
            }
        })
        .catch(err => console.error(err));
}

///// render regiser page

function registerPage(request, response) {
    response.render('./pages/register', { registerFail: true })
}

///////////////// checks if user already exists, if so tells user in register ejs to make another user, if not enters user name and password into database///////////////////
function register(request, response) {
    let { name, username, password} = request.body;
    let SQL = 'SELECT * FROM users WHERE $1 = username;';
    let safeValue = [username];
    client.query(SQL, safeValue)
        .then(results => {
            if (results.rowCount !== 0) {
                response.render('./pages/register', { registerFail: true })
            } else {
                let SQL1 = `INSERT INTO users (name, username, password) VALUES ($1, $2, crypt($3, gen_salt('bf', 8)));`;
                let safeValue1 = [name, username, password];
                client.query(SQL1, safeValue1)
                    .then(results => {
                        response.redirect('/');
                    })
            };
        })
        .catch(err => console.error(err));
}

module.exports = {
    indexPage,
    login,
    register,
    registerPage
}