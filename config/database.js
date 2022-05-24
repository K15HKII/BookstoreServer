const {Sequelize} = require('sequelize');
const dbVariable = require('../variables/database');

const createConnection = () => {
  if (!dbVariable.DATABASE_SOCKET_PATH) {
    return new Sequelize({
      dialect: dbVariable.DATABASE_DRIVER,
      host: dbVariable.DATABASE_HOST,
      port: dbVariable.DATABASE_PORT,
      username: dbVariable.DATABASE_USERNAME,
      password: dbVariable.DATABASE_PASSWORD,
      database: dbVariable.DATABASE_NAME,
    });
  } else {
    const connectionString = `${dbVariable.DATABASE_SOCKET_PATH}/${dbVariable.DATABASE_CONNECTION_NAME}`;
    return new Sequelize({
      dialect: dbVariable.DATABASE_DRIVER,
      host: connectionString,
      port: dbVariable.DATABASE_PORT,
      username: dbVariable.DATABASE_USERNAME,
      password: dbVariable.DATABASE_PASSWORD,
      database: dbVariable.DATABASE_NAME,
      dialectOptions: {
        socketPath: connectionString
      }
    });
  }
};

const sequelize = createConnection();

  async function tryConnect() {
    try {
      await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };

module.exports = {
  sequelize,
  tryConnect,
};
