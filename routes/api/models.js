const express = require('express');
const router = express.Router();
const { Author, VoucherProfile, BookProfile, Transport, Publisher, Transporter, CartItem, Book, Bill, BillDetail, Lend, User, Voucher, WildVoucher } = require('../../models/modelmap');
const { Action } = require('../auth/role.permission');

const authMiddlewares = require('../auth/auth.middleware');
const roleMiddleware = require('../auth/role.middleware');

/**
 *
 * @param {String} name - api name
 * @param {Model} model - model class
 * @param {Function} middleware
 * @constructor
 */
const CRUD = function (name, model, middleware) {
    const child = express.Router();
    if (middleware) {
        child.use(middleware);
    }
    child.use(roleMiddleware.verifyAllowed);
    child.get('/', (req, res) => {
        model.findAll().then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        }).finally(() => {
            res.end();
        });
    });

    child.get('/:id', (req, res) => {
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

    child.post('/', (req, res) => {
        model.create(req.body).then(data => {
            res.json(data);
        }).catch(err => {
            res.json(err);
        }).finally(() => {
            res.end();
        });
    });

    child.put('/:id', (req, res) => {
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

    child.delete('/:id', (req, res) => {
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

    router.use(`/${name}`, child);
    console.log('Created route: GET /api/' + name);
}

router.use(authMiddlewares.verifyToken, roleMiddleware.verifyRole('admin'));

CRUD('user', User);
CRUD('useraddress', UserAddress);
CRUD('author', Author);
CRUD('voucherprofile', VoucherProfile);
CRUD('bookprofile', BookProfile);
CRUD('publisher', Publisher);
CRUD('transporter', Transporter);

CRUD('transport', Transport);
CRUD('book', Book);
CRUD('lend', Lend);
CRUD('voucher', Voucher);
CRUD('wildvoucher', WildVoucher);

module.exports = router;
