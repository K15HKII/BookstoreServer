const router = require('express').Router();
const { Bill } = require('../../models/modelmap');
const roleMiddleware = require("../auth/role.middleware");

router.use(roleMiddleware.verifyAllowed);
router.get('/bill', (req, res) => {
    Bill.findAll().then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    }).finally(() => {
        res.end();
    });
});

router.get('/bill/:id', (req, res) => {
    Bill.findOne({
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

router.post('/bill', (req, res) => {
    Bill.create(req.body).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    }).finally(() => {
        res.end();
    });
});

router.put('/bill/:id', (req, res) => {
    Bill.update(req.body, {
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

router.delete('/bill/:id', (req, res) => {
    Bill.destroy({
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