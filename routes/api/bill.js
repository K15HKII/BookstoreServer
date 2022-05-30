const router = require('express').Router();
const { Bill, BillDetail } = require('../../models/modelmap');
const roleMiddleware = require("../auth/role.middleware");

router.use(roleMiddleware.verifyAllowed);
router.get('/', (req, res) => {
    Bill.findAll({
        include: BillDetail
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    }).finally(() => {
        res.end();
    });
});

router.get('/:id', (req, res) => {
    Bill.findOne({
        where: {
            id: req.params.id
        },
        include: BillDetail
    }).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    }).finally(() => {
        res.end();
    });
});

router.post('/', (req, res) => {
    Bill.create(req.body).then(data => {
        res.json(data);
    }).catch(err => {
        res.json(err);
    }).finally(() => {
        res.end();
    });
});

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
    Bill.findOne({
        where: {
            id: req.params.id
        },
        include: BillDetail
    }).then(data => {
        if (data) {
            data.destroy().then(() => {
                res.json({
                    message: "Xóa thành công"
                });
            }).catch(err => {
                res.json(err);
            }).finally(() => {
                res.end();
            });
            /* data.then(() => {
                data.destroy().then(() => {
                    res.json({
                        message: "Xóa thành công"
                    });
                }).catch(err => {
                    res.json(err);
                }).finally(() => {
                    res.end();
                });;
            }).catch(err => {
                res.json(err);
            }).finally(() => {
                res.end();
            }); */
        } else {
            res.json({
                message: 'Bill not found'
            });
        }
    })
});

module.exports = router;
