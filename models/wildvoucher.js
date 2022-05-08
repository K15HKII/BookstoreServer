const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class WildVoucher extends Model {
}

WildVoucher.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    profileid: {
        type: DataTypes.UUID,
    },
    amount: {
        type: DataTypes.INTEGER,
    },
    releasedate: {
        type: DataTypes.DATE,
    },
    //TODO: fix database column name
    expirydate: {
        type: DataTypes.DATE,
    },
    //TODO: reorganize database
    used: {
        type: DataTypes.BLOB,
    }
}, {sequelize, modelName: 'wildvoucher'});

/*
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
})();*/
