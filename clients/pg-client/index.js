

const userDetails = require('./user.detail');
const productDetails = require('./product.details')
const dbProvider = require('./db.provider');


module.exports = {
	    initialize : dbProvider.initConnection.bind(dbProvider),

    userDetails,
    productDetails
    
};
