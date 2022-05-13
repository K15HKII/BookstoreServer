const express = require('express');
const router = express.Router();
const { Author, VoucherProfile, BookProfile, Transport, Publisher, Transporter, CartItem, Book, Bill, BillDetail, Lend, User, Voucher, WildVoucher } = require('../../models/modelmap');

/**
 *
 * @param {String} name - api name
 * @param {Model} model - model class
 * @constructor
 */
const CRUD = function (name, model) {
  router.get('/' + name, (req, res) => {
    model.findAll().then(data => {
      res.json(data);
    }).catch(err => {
      res.json(err);
    }).finally(() => {
      res.end();
    });
  });

  console.log('Created route: GET /api/' + name);
}

CRUD('user', User);

module.exports = router;
