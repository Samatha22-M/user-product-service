
const { pgClient } = require("../clients")
const { userDetails: userDetailsClient } = pgClient;

class UserService {
    async createUser(reqBody) {
        console.log({ fileName: "user.service.js", functionName: "createUser" }, "Create User ");
        try {
            let response = [];

            const userObj = {
                username: reqBody.username,
                phone: reqBody.phone,
                email: reqBody.email,
                password: reqBody.password,
                role: reqBody.role
            };
            await userDetailsClient.storeUser(userObj);
            response.push(reqBody);

            return {
                body: {
                    response: response
                }
            };
        } catch (err) {
            console.error({ fileName: "user.service.js", functionName: "createUser" }, "Failed to create user " + err.message);
            throw err;
        }

    }

    async userLogin(reqBody) {
        console.log({ fileName: "user.service.js", functionName: "userLogin" }, "User Login ");
        try {
            let response = [];

            const userObj = {
                email: reqBody.email,
                password: reqBody.password,
            };
            const userData = await userDetailsClient.getUser(userObj);
            response.push(userData);

            return {
                body: {
                    response: response
                }
            };
        } catch (err) {
            console.error({ fileName: "user.service.js", functionName: "userLogin" }, "Failed to Login: " + err.message);
            throw err;
        }

    }
}
module.exports = new UserService();
