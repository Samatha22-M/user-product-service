const {UserService} = require('../services');
const serviceHandler = require("../serviceHandler").serviceHandler;


function loadRoutes(app) {

   app.post('/createUser',function(req,res){
    try {
       serviceHandler(req, res, UserService.createUser(req.body));
    } catch (err){
        throw err;
    }

  });


   app.post('/login',function(req,res){
        serviceHandler(req, res,  UserService.userLogin(req.body));
  });

}

module.exports =loadRoutes;
