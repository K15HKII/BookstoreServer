const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Publisher extends Model {
}

Publisher.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: 'publisher'});

/*
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
})();*/
