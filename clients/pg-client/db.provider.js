
const fs = require('fs');
const Sequelize = require('sequelize');
const path = require('path');

const { dbConnection:dbConfig, appDefault } = require('../../config');
const db = {};

const initConnection = async() => {
    try{
        const connectionOptions = {
            dialect: dbConfig.dialect,
            replication: {
                read: dbConfig.readArray,
                write: dbConfig.writeObject
            },
            pool: dbConfig.pool,
            logging: dbConfig.logging,
            operatorsAliases: dbConfig.operatorsAliases
        };
        if (dbConfig.sslEnabled) {
            connectionOptions.dialectOptions = {
                ssl: {
                    rejectUnauthorized: dbConfig.rejectUnauthorizedCertificate,
                    cert: fs.readFileSync(dbConfig.sslCertPath)
                }
            };
        };
        const sequelize = new Sequelize(dbConfig.database, dbConfig.globalUsername, dbConfig.globalPassword, connectionOptions);
        const modelFolderPath = path.resolve(__dirname, appDefault.modelFolderPath);
        fs
            .readdirSync(modelFolderPath)
            .filter((file) => {
                return (file.indexOf(".") !== 0) && (file !== 'dynamic');
            })
            .forEach((file) => {
                const model = sequelize.import(modelFolderPath + '/' + file);
                console.log(`Model ${model.name} load successfully`);
                db[model.name] = model;
            });

        Object.keys(db)
            .forEach((modelName) => {
                if("associate" in db[modelName]) {
                    db[modelName].associate(db);
                }
            });

        db.sequelize = sequelize;
        db.sequelize.sync({
            force: dbConfig.sync || false
        });
    }
    catch(e) {
        console.error(e);
        throw e;
    }
};

module.exports = {
    initConnection,
    db
};

