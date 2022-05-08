const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Voucher extends Model {
}

Voucher.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    userid: {
        type: DataTypes.UUID,
    },
    profileid: {
        type: DataTypes.UUID,
    },
    //TODO: add more fields
    vouchercode: {
        type: DataTypes.STRING,
    },
    expireddate: {
        type: DataTypes.DATE,
    },
    //TODO: fix database column name
    useddate: {
        type: DataTypes.DATE,
    }
}, {sequelize, modelName: 'voucher'});

/*
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
})();*/
