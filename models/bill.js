const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Bill extends Model {
}

Bill.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    bookid: {
        type: DataTypes.UUID
    },
    date: {
        type: DataTypes.DATE
    },
    amount: {
        type: DataTypes.DECIMAL
    },
    transportid: {
        type: DataTypes.UUID
    },
    userid: {
        type: DataTypes.UUID
    },
    billstatus: {
        type: DataTypes.ENUM('pending', 'paid', 'cancelled')
    }
}, {sequelize, modelName: 'bill'});

/*
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
})();*/
