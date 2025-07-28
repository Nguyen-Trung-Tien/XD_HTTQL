const UserRouter = require("./UserRouter");
const ShipperRouter = require("./shipperRouter");
const routes = (app) => {
  app.use("/api/v1/user", UserRouter);
  app.use("/api/v1/shipper", ShipperRouter);
  
};
module.exports = routes;
