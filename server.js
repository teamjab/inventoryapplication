'use strict';
///////////// DEPENDENCIES ////////////////
const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3001;
require('ejs')
const methodOverride = require('method-override');
app.use((methodOverride('_method')));
const routes = require('./library/routes.js');
const defaults = require('./library/error.js');
const client = require('./library/client.js');

// body parser //
app.use(express.urlencoded({ extended: true }));

// connecting public //
app.use(express.static('./public'));
app.set('view engine', 'ejs');

////////// ROUTES //////////////
app.get('/', routes.indexPage);
app.post('/inventory', routes.login);
app.get('/admin', routes.checkAdmin)
app.post('/admin/register', routes.registerPage);
app.post('/register', routes.register);
app.post('/inventory/add', routes.addingInventory);
app.put('/inventory/:id', routes.updateItem);
app.delete('/inventory/:id', routes.deleteItem);

// error handlers //
app.use('*', defaults.notFoundHandler);
app.use(defaults.errorHandler);

client.connect()
  .then(
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))
  )
  .catch(err => console.error(err))