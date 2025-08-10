const UserRouter = require("./UserRouter");
const productsRouter = require("./products.route");
const ShipperRouter = require("./shipperRouter");
const orderRouter = require("./orderRouter");
const customerRouter = require("./customerRouter");
const importReceiptRoute = require("./importReceiptRoute");
const importDetailRoutes = require("./importDetailRoutes");
const suppliersRouter = require("./importDetailRoutes");

const routes = (app) => {
  app.use("/api/v1/user", UserRouter);
  app.use("/api/v1/shipper", ShipperRouter);
  app.use("/api/v1/products", productsRouter);
  app.use("/api/v1/orders", orderRouter);
  app.use("/api/v1/customer", customerRouter);
  app.use("/api/v1/import-receipt", importReceiptRoute);
  app.use("/api/v1/import-detail", importDetailRoutes);
  app.use("/api/v1/suppliers", suppliersRouter);
};
module.exports = routes;
