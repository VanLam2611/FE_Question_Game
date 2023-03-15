'use strict';
module.exports = function(app) {
  let productsCtrl = require('./Controllers/PlayController');

  // todoList Routes
  app.route('/api/home')
    .get(productsCtrl.get)
    .post(productsCtrl.store);

  app.route('/products/:productId')
    .get(productsCtrl.detail)
    .put(productsCtrl.update)
    .delete(productsCtrl.delete);
};