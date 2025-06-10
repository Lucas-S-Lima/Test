const { Sequelize } = require('sequelize');

 // Conexão com o banco de dados Postgres
    const sequelize = new Sequelize('postapp', 'postgres', 'fakefake', {
    host: 'localhost',
    dialect: 'postgres',
    });

// Exportando módulo sequelize
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}