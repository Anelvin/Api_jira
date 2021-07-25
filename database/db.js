import Sequelize from 'sequelize';
import UserModel from '../models/user';

const sequelize = new Sequelize('jira', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync({ force: true })
.then(() => {
    console.log('Tablas sincronizadas');
});


export {
    User
};
