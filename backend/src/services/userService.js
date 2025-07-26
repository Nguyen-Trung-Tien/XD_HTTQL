const db = require("../models/index.js");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (password) => {
  return await bcrypt.hash(password, salt);
};

const checkUserEmail = async (userEmail) => {
  const user = await db.User.findOne({ where: { email: userEmail } });
  return !!user;
};

const createNewUser = async (data) => {
  const emailExists = await checkUserEmail(data.email);
  if (emailExists) {
    return {
      errCode: 1,
      errMessage: "Your Email is already in use! Please try another email!",
    };
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

  return {
    errCode: 0,
    errMessage: "OK",
  };
};

module.exports = { createNewUser };
