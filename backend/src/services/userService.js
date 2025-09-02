const db = require("../models/index.js");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);
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

const handleLoginUser = async (email, password) => {
  try {
    const user = await db.User.findOne({
      attributes: [
        "id",
        "email",
        "password",
        "role",
        "lastName",
        "firstName",
        "image",
        "address",
        "status",
        "gender",
      ],
      where: { email },
      raw: true,
    });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return { errCode: 1, errMessage: "Email hoặc mật khẩu không đúng" };
    }

    if (!user) {
      return { errCode: -1, errMessage: "Email hoặc mật khẩu không đúng" };
    }

    if (user.status === "Bị khóa") {
      return { errCode: -4, errMessage: "Tài khoản đã bị khóa" };
    }

    delete user.password;

    return { errCode: 0, errMessage: "OK", user };
  } catch (e) {
    console.error("handleLoginUser failed:", e);
    throw e;
  }
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
        role: data.role || "Nhân viên",
        status: data.status || "Hoạt động",
        gender: data.gender || "Nam",
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
      let users;
      if (userId === "All" || !userId) {
        users = await db.User.findAll({
          attributes: { exclude: ["password"] },
        });
      } else {
        users = await db.User.findAll({
          where: { id: userId },
          attributes: { exclude: ["password"] },
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
        return resolve({
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
        user.role = data.role;
        user.gender = data.gender;
        user.status = data.status;
        user.phoneNumber = data.phoneNumber;
        if (data.avatarBase64) {
          user.image = data.avatarBase64;
        }

        await user.save();

        resolve({
          errCode: 0,
          errMessage: "Update the user succeed!",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "User not found!",
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
