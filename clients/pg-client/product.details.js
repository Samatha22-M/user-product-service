

const { db } = require('./db.provider');
const { updateInventoryCount } = require('./query.constants');
class ProductDetails {

    async storeProduct(productObj) {
        return db["product_details"].create(productObj);
    }

    async updateProduct(productObj) {
        const query = updateInventoryCount(productObj.productName, productObj.inventoryCount);
        return db.sequelize.query(query);
    }

    async deleteProduct(productName) {
        return db["product_details"].destroy({ where: { product_name: productName } });
    }

    async getAllProducts() {
        return db["product_details"].findAll();
    }

}

module.exports = new ProductDetails();
