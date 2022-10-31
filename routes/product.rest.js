
const { ProductService } = require('../services');
const serviceHandler = require("../serviceHandler").serviceHandler;


function loadRoutes(app) {

    app.post('/createProduct', function (req, res) {
        const email = req.headers.email;
        const password = req.headers.password
        try {
            serviceHandler(req, res, ProductService.createProduct(req.body, email, password));
        } catch (err) {
            throw err;
        }

    });

    app.patch('/updateProduct', function (req, res) {
        const email = req.headers.email;
        const password = req.headers.password
        serviceHandler(req, res, ProductService.updateProduct(req.body, email, password));

    });

    app.delete('/deleteProduct', function (req, res) {
        const email = req.headers.email;
        const password = req.headers.password
        serviceHandler(req, res, ProductService.deleteProduct(req.body, email, password));

    });

    app.get('/getAllProducts', function (req, res) {
        const email = req.headers.email;
        const password = req.headers.password
        serviceHandler(req, res, ProductService.getAllProducts(email, password));

    });

}

module.exports = loadRoutes;