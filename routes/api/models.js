const express = require('express');
const router = express.Router();
const { Author, VoucherProfile, BookProfile, Transport, Publisher, Transporter, CartItem, Book, Bill, BillDetail, Lend, User, Voucher, WildVoucher } = require('../../models/modelmap');

const authMiddlewares = require('../auth/auth.middleware');

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

    router.get('/' + name + '/:id', (req, res) => {
        model.findOne({
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        }).finally(() => {
            res.end();
        });
    });

    router.post('/' + name, (req, res) => {
        model.create(req.body).then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        }).finally(() => {
            res.end();
        });
    });

    router.put('/' + name + '/:id', (req, res) => {
        model.update(req.body, {
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        }).finally(() => {
            res.end();
        });
    });

    router.delete('/' + name + '/:id', (req, res) => {
        model.destroy({
            where: {
                id: req.params.id
            }
        }).then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        }).finally(() => {
            res.end();
        });
    });
    console.log('Created route: GET /api/' + name);
}

router.use(authMiddlewares.verifyToken, authMiddlewares.verifyRole('admin'));

CRUD('user', User);
CRUD('author', Author);
CRUD('voucherprofile', VoucherProfile);
CRUD('bookprofile', BookProfile);
CRUD('transport', Transport);
CRUD('publisher', Publisher);
CRUD('transporter', Transporter);
CRUD('cartitem', CartItem);
CRUD('book', Book);
CRUD('bill', Bill);
CRUD('billdetail', BillDetail);
CRUD('lend', Lend);
CRUD('voucher', Voucher);
CRUD('wildvoucher', WildVoucher);

module.exports = router;
