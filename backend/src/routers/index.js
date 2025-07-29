const UserRouter = require("./UserRouter");
const productsRouter = require('./products.router')

const routes = (app) => {
  app.use("/api/v1/user", UserRouter);
  app.use("/api/v1/products", productsRouter);
};
module.exports = routes;