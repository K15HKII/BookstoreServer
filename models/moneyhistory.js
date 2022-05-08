const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class MoneyHistory extends Model {
}

MoneyHistory.init({
    profileid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    versionid: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    price: {
        type: DataTypes.DECIMAL(10, 2)
    },
    edited: { //TODO: fix database column name
        type: DataTypes.DATE
    }
}, {sequelize, modelName: 'moneyhistory'});

/*
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
})();*/
