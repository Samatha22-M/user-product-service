let userRouter = require('./user.rest');
let productRouter = require('./product.rest')

function loadroutes(app) {

  userRouter(app);
  productRouter(app);

}

module.exports=loadroutes;