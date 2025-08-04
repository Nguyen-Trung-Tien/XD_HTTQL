const UserRouter = require("./UserRouter");
const productsRouter = require('./products.route')
const ShipperRouter = require("./shipperRouter");
const orderRouter = require("./orderRouter");
const routes = (app) => {
  app.use("/api/v1/user", UserRouter);
  app.use("/api/v1/shipper", ShipperRouter);
  app.use("/api/v1/products", productsRouter);
  app.use("/api/v1/orders", orderRouter);
};
module.exports = routes;