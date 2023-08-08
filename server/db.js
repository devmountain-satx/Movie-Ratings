import { Sequelize } from 'sequelize';

async function connectToDB(dbURI) {
  console.log(`Connecting to DB: ${dbURI}`);

  // Set logging: false to disable outputting SQL queries to console
  const sequelize = new Sequelize(dbURI, { logging: console.log });

  try {
    await sequelize.authenticate();
    console.log('Connected to DB successfully!');
  } catch (error) {
    console.error('Unable to connect to DB:', error);
  }

  return sequelize;
}

export default connectToDB;
