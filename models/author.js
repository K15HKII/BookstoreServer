const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class Author extends Model {
}

Author.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: 'author'});

/*
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
})();*/
