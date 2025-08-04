const db = require("../models/index.js");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (e) {
      reject(e);
    }
  });
};

const checkUserEmail = async (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
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

const handleLoginUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isCheckEmail = await checkUserEmail(email);
      if (isCheckEmail) {
        let user = await db.User.findOne({
          attributes: ["id", "email", "password", "role"],
          where: { email: email },
          raw: true,
        });

        if (user) {
          let checkPassword = await bcrypt.compareSync(password, user.password);

          if (checkPassword) {
            userData.errCode = 0;
            userData.errMessage = "OK";
            delete user.password;
            userData.user = {
              id: user.id,
              email: user.email,
              role: user.role,
            };
          } else {
            userData.errCode = 3;
            userData.errMessage = "Wrong password!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User's not found!`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Your Email isn't exists. Please try another!";
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

const createNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let emailExists = await checkUserEmail(data.email);
      if (emailExists) {
        return resolve({
          errCode: 1,
          errMessage: "Your Email is already in use! Please try another email!",
        });
      }
      const hashedPassword = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashedPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        address: data.address,
        role: data.role || "staff",
        image: data.image || null,
      });

      resolve({ errCode: 0, errMessage: "OK" });
    } catch (e) {
      reject(e);
    }
  });
};

const getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = "";
      if (userId === "All") {
      }
      users = await db.User.findAll({
        attributes: {
          exclude: ["password"],
        },
      });
      if (userId && userId !== "All") {
        users = await db.User.findAll({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
const UpdateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameter!",
        });
      }

      let user = await db.User.findOne({
        where: { id: data.id },
        raw: false,
      });
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.address = data.address;
        user.phoneNumber = data.phoneNumber;
        user.image = data.image;
        await user.save();

        resolve({
          errCode: 0,
          errMessage: "Update the user succeed!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User note found!",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
const DeleteUserData = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundUser = await db.User.findOne({
        where: { id: userId },
      });

      if (!foundUser) {
        resolve({
          errCode: 1,
          errMessage: "The user isn't exits! ",
        });
      }

      await db.User.destroy({
        where: { id: userId },
      });
      resolve({
        errCode: 0,
        errMessage: "Delete user success!",
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUsers,
  handleLoginUser,
  UpdateUserData,
  DeleteUserData,
};
