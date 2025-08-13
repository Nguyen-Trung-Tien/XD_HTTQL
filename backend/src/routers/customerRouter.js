const express = require("express");
const router = express.Router();
const customerController = require("../controller/customerController");

router.post("/create-customer", customerController.handleCreateCustomer);
router.get("/get-all-customers", customerController.handleGetAllCustomers);
router.put("/update-customer", customerController.handleUpdateCustomer);
router.delete("/delete-customer", customerController.handleDeleteCustomer);
router.post(
  "/delete-many-customers",
  customerController.deleteMultipleCustomers
);
module.exports = router;
