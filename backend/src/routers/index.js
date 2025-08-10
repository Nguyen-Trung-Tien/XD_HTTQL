const UserRouter = require("./UserRouter");
const productsRouter = require("./products.route");
const ShipperRouter = require("./shipperRouter");
const orderRouter = require("./orderRouter");
const customerRouter = require("./customerRouter");
const importReceiptRoute = require("./importReceiptRoute");

const routes = (app) => {
  app.use("/api/v1/user", UserRouter);
  app.use("/api/v1/shipper", ShipperRouter);
  app.use("/api/v1/products", productsRouter);
  app.use("/api/v1/orders", orderRouter);
  app.use("/api/v1/customer", customerRouter);
  app.use("/api/v1/import", importReceiptRoute);
};
module.exports = routes;
