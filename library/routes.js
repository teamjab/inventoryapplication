'use strict';

const client = require('./client.js')

///////////////////////////////// CALLBACKS ////////////////////////////////////

//renders index with login set to false, get//
function indexPage(request, response) {
    response.render('./index', { loginFailed: false });
}

//checks username and password, if login successful, renders inventory.ejs. else renders a message in index.ejs that login failed, post //
function login(request, response) {
    let { username, password } = request.body;
    let SQL = 'SELECT * from users WHERE $1 = username AND password = crypt($2, password);';
    let safeValue = [username, password];
    client.query(SQL, safeValue)
        .then(result => {
            if (result.rowCount === 1 && result.rows[0].username === 'admin') {
                let SQL1 = 'SELECT * FROM user_table;';
                client.query(SQL1)
                    .then(item => {
                        console.log(item.rows)
                        response.render('./pages/inventory.ejs', { item: item.rows, admin: true })
                    })
            } else if (result.rowCount === 1) {
                let SQL1 = 'SELECT * FROM user_table;';
                client.query(SQL1)
                    .then(item => {
                        response.render('./pages/inventory.ejs', { item: item.rows, admin: false })
                    })
            } else {
                console.log('hit')
                response.render('./index', { loginFailed: true });
            }
        })
        .catch(err => console.error(err));
}

// renders register page //
function registerPage(request, response) {
    response.render('./pages/register', { registerFail: false })
}

// checks if user already exists, if so tells user in register ejs to make another user, if not enters user name and password into database //
function register(request, response) {
    let { name, username, password } = request.body;
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
                response.redirect('/');
            };
        })
        .catch(err => console.error(err));
}

////// To check admin so that you can register other people
function checkAdmin(request, response) {
    response.render('./pages/admin');
}

///// after adding the inventory
function addingInventory(request, response) {
    let { itemname, purchaseorder, lotnumber, rcvdate, expdate, qty, type } = request.body;
    console.log(request.body);

    let SQL = 'INSERT INTO user_table(name, purchaseOrder, lotNumber, receivedDate, expDate, quantities, type) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING expDate;';
    let safeValue = [itemname, purchaseorder, lotnumber, rcvdate, expdate, qty, type];
    client.query(SQL, safeValue)
        .then(() => {
            let SQL1 = 'SELECT * FROM user_table;;';
            client.query(SQL1)
                .then(value => {
                    response.render('./pages/inventory', { item: value.rows, admin: false });
                })
        })
}

//delete items in inventory func
function deleteItem(request, response) {
    // console.log('proof of life')
    let SQL = 'DELETE FROM user_table WHERE id = $1;';
    let safeValue = [request.params.id]
    client.query(SQL, safeValue)
        .then(() => {
            let SQL1 = 'SELECT * FROM user_table;';
            client.query(SQL1)
                .then(results => {
                    response.render('./pages/inventory', { item: results.rows, admin: false });
                })
        })
}

function updateItem(request, response) {
    let { itemname, purchaseorder, lotnumber, rcvdate, expdate, qty, type } = request.body;
    let SQL = `UPDATE user_table set name=$1, type=$2, lotNumber=$3, quantities=$4, purchaseOrder=$5, receivedDate=$6, expDate=$7 WHERE id = $8;`;
    let safeValue = [itemname, type, lotnumber, qty, purchaseorder, rcvdate, expdate, request.params.id];
    client.query(SQL, safeValue)
        .then(() => {
            let SQL1 = 'SELECT * FROM user_table;';
            client.query(SQL1)
                .then(results => {
                    response.render('./pages/inventory', { item: results.rows, admin: false });
                })
        })
}

module.exports = {
    indexPage,
    login,
    register,
    registerPage,
    checkAdmin,
    addingInventory,
    updateItem,
    deleteItem
}