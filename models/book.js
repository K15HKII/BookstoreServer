const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Book extends Model {
}

Book.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    profileid: {
        type: DataTypes.UUID,
        primaryKey: true
    }
}, {sequelize, modelName: 'book'});

/*
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
})();*/
