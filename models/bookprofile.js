const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = require('../config/database');

class BookProfile extends Model {
}

BookProfile.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    priceid: {
        type: DataTypes.UUID,
    },
    tags: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    authorid: {
        type: DataTypes.INTEGER
    },
    publisherid: {
        type: DataTypes.INTEGER
    },
    ebookfile: {
        type: DataTypes.STRING
    }
}, {sequelize, modelName: 'bookprofile'});

/*
(async () => {
    await sequelize.sync();
    const jane = await User.create({
        username: 'janedoe',
        birthday: new Date(1980, 6, 20)
    });
    console.log(jane.toJSON());
})();*/
