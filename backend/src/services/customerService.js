const db = require("../models/index");

const checkUserEmail = async (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.Customers.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

let createCustomer = async (data) => {
  try {
    let checkEmail = await checkUserEmail(data.email);
    if (checkEmail) {
      return {
        errCode: -1,
        errMessage: "Your Email is already in use! Please try another email",
      };
    }
    let customer = await db.Customers.create({
      email: data.email,
      name: data.name,
      phoneNumber: data.phoneNumber,
      address: data.address,
    });
    return {
      errCode: 0,
      errMessage: "Customer created successfully!",
      customer,
    };
  } catch (e) {
    return { errCode: 1, errMessage: "Error creating customer", error: e };
  }
};

let getAllCustomers = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;

    let { rows: customers, count: total } = await db.Customers.findAndCountAll({
      offset,
      limit,
      order: [["createdAt", "DESC"]],
    });

    return {
      errCode: 0,
      errMessage: "Success",
      customers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  } catch (e) {
    console.error("Error in getAllCustomers:", e);
    return { errCode: 1, errMessage: "Error getting customers", error: e };
  }
};

let updateCustomer = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: -2,
        errMessage: "Is not id user!",
      };
    }

    let customers = await db.Customers.findOne({
      where: { id: data.id },
      raw: false,
    });

    if (customers) {
      customers.name = data.name;
      customers.email = data.email;
      customers.phoneNumber = data.phoneNumber;
      customers.address = data.address;
      await customers.save();
      return {
        errCode: 0,
        errMessage: "Customer updated successfully",
      };
    }
  } catch (e) {
    return { errCode: 1, errMessage: "Error updating customer", error: e };
  }
};

let deleteCustomer = async (customerId) => {
  try {
    let customer = await db.Customers.findOne({ where: { id: customerId } });
    if (!customer) {
      return { errCode: 2, errMessage: "Customer not found" };
    }

    await db.Customers.destroy({ where: { id: customerId } });

    return {
      errCode: 0,
      errMessage: "Customer deleted successfully",
    };
  } catch (e) {
    return { errCode: 1, errMessage: "Error deleting customer", error: e };
  }
};

module.exports = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  checkUserEmail,
};
