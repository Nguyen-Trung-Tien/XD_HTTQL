const db = require("../models/index");
const { Op } = require("sequelize");
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
      city: data.city,
      status: data.status,
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

let getAllCustomers = async (
  page = 1,
  limit = 5,
  search = "",
  status = "",
  city = ""
) => {
  try {
    const offset = (page - 1) * limit;
    const where = {};

    if (search) {
      const s = search.trim().toLowerCase();
      where[Op.or] = [
        db.Sequelize.where(
          db.Sequelize.fn("LOWER", db.Sequelize.col("name")),
          "LIKE",
          `%${s}%`
        ),
        db.Sequelize.where(
          db.Sequelize.fn("LOWER", db.Sequelize.col("email")),
          "LIKE",
          `%${s}%`
        ),
        db.Sequelize.where(
          db.Sequelize.fn("LOWER", db.Sequelize.col("phoneNumber")),
          "LIKE",
          `%${s}%`
        ),
      ];
    }

    if (status) {
      where.status = status;
    }

    if (city) {
      where.city = city;
    }

    const { rows: customers, count: total } =
      await db.Customers.findAndCountAll({
        where,
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
  } catch (error) {
    console.error(error);
    return {
      errCode: 1,
      errMessage: "Error getting customers",
      error,
    };
  }
};
let updateCustomer = async (data) => {
  try {
    if (!data.id) {
      return {
        errCode: -2,
        errMessage: "No user ID provided!",
      };
    }

    let customer = await db.Customers.findOne({
      where: { id: data.id },
      raw: false,
    });

    if (customer) {
      customer.name = data.name;
      customer.email = data.email;
      customer.phoneNumber = data.phoneNumber;
      customer.address = data.address;
      customer.city = data.city;
      if (data.status !== undefined) {
        customer.status = data.status;
      }

      await customer.save();

      return {
        errCode: 0,
        errMessage: "Customer updated successfully",
      };
    } else {
      return {
        errCode: 1,
        errMessage: "Customer not found",
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

const deleteMultipleCustomers = async (ids) => {
  if (!ids || !Array.isArray(ids) || !ids.length)
    throw new Error("Missing ids");

  // transaction để đảm bảo atomic
  return await db.sequelize.transaction(async (t) => {
    const deleted = await db.Customers.destroy({
      where: { id: ids },
      transaction: t,
    });
    return deleted;
  });
};

module.exports = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  checkUserEmail,
  deleteMultipleCustomers,
};
