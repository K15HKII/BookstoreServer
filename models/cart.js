const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Cart extends Model {
}

Cart.init({
    userid: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    bookprofile: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    selected: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {sequelize, modelName: 'cart'});

/*
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
})();*/
