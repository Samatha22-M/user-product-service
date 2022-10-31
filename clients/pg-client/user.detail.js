

const { db } = require('./db.provider');

class UserDetails {

    async storeUser(userObj) {
        return db["user_details"].create(userObj);
    }

    async getUser(userObj) {
        return db["user_details"].findOne({ where: { email: userObj.email, password: userObj.password } });
    }

}

module.exports = new UserDetails();
