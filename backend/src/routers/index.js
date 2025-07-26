const UserRouter = require("./UserRouter");

const routes = (app) => {
  app.use("/api/v1/user", UserRouter);
};
module.exports = routes;
