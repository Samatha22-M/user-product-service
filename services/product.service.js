
const { pgClient } = require("../clients");
const errors = require("../errors/errors");

const { productDetails: productDetailsClient, userDetails: userDetailsClient } = pgClient;

class ProductService {
    async createProduct(reqBody, email, pwd) {
        console.log({ fileName: "user.service.js", functionName: "createUser" }, "Create Product ");
        try {
            let response = [];
            const userObj = {
                email: email,
                password: pwd,
            };
            const userData = await userDetailsClient.getUser(userObj);
            if (userData.role === "admin") {
                const productObj = {
                    "productName": reqBody.product_name,
                    "productDescription": reqBody.product_description,
                    "productPrice": reqBody.product_price,
                    "inventoryCount": reqBody.inventory_count,
                };
                await productDetailsClient.storeProduct(productObj);
                response.push(reqBody);

                return {
                    body: {
                        response: response
                    }
                };
            }
        } catch (err) {
            console.error({ fileName: "user.service.js", functionName: "createUser" }, "Failed to create user " + err.message);
            throw err;
        }

    }

    async updateProduct(reqBody, email, password) {
        console.log({ fileName: "user.service.js", functionName: "userLogin" }, "update product ");
        try {
            let response = [];
            const userObj = {
                email: email,
                password: password,
            };
            const productObj = {
                "productName": reqBody.product_name,
                "inventoryCount": reqBody.inventory_count,
            };
            const userData = await userDetailsClient.getUser(userObj);
            if (userData.role === "admin" || userData.role === "manager") {
                const productData = await productDetailsClient.updateProduct(productObj);
                response.push(productData);

                return {
                    body: {
                        response: response
                    }
                };
            }

            else {
                throw new Error("Invalid User");
            }
        } catch (err) {
            console.error({ fileName: "user.service.js", functionName: "userLogin" }, "Failed to update product: " + err.message);
            throw err;
        }

    }

    async deleteProduct(reqBody, email, password) {
        console.log({ fileName: "user.service.js", functionName: "deleteProduct" }, "delete product ");
        try {
            let response = [];
            const userObj = {
                email: email,
                password: password,
            };

            const userData = await userDetailsClient.getUser(userObj);
            if (userData.role === "admin") {
                const userData = await productDetailsClient.deleteProduct(reqBody.product_name);
                response.push(userData);

                return {
                    body: {
                        response: response
                    }
                };
            }
        } catch (err) {
            console.error({ fileName: "user.service.js", functionName: "deleteProduct" }, "Failed to deleteProduct: " + err.message);
            throw err;
        }

    }

    async getAllProducts(email, password) {
        console.log({ fileName: "user.service.js", functionName: "deleteProduct" }, "get all products ");
        try {
            let response = [];
            const userObj = {
                email: email,
                password: password,
            };
            const userData = await userDetailsClient.getUser(userObj);
            if (userData.role === "admin" || userData.role === "manager") {
                const userData = await productDetailsClient.getAllProducts();
                response.push(userData);

                return {
                    body: {
                        response: response
                    }
                };
            }
        } catch (err) {
            console.error({ fileName: "user.service.js", functionName: "deleteProduct" }, "Failed to deleteProduct: " + err.message);
            throw err;
        }

    }
}
module.exports = new ProductService();
