const UserRouter = require("./UserRouter");
const productsRouter = require('./products.route')
const ShipperRouter = require("./shipperRouter");

const routes = (app) => {
  app.use("/api/v1/user", UserRouter);
  app.use("/api/v1/shipper", ShipperRouter);
  app.use("/api/v1/products", productsRouter);

};
module.exports = routes;