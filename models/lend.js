const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Lend extends Model {
}

Lend.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
    },
    userid: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    bookid: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    start: {
        type: DataTypes.DATE
    },
    end: {
        type: DataTypes.DATE
    }
}, {sequelize, modelName: 'lend'});

/*
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
})();*/
