import React, { useEffect, useState } from "react";
import { GetDetailUser } from "../API/user/userApi";

const Profile = () => {
  const [users, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const userId = storedUser?.id;

        if (!userId) {
          console.warn("User ID not found in localStorage");
          return;
        }

        const res = await GetDetailUser(userId);

        if (res.errCode === 0 && res.users.length > 0) {
          const data = res.users[0];
          setUser({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            role: data.role,
          });
        } else {
          console.warn("Không tìm thấy user hoặc có lỗi:", res);
        }
      } catch (err) {
        console.error("Failed to fetch user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <div>
      <div class="my-5">
        <div class="container mx-auto max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl shadow-md dark:shadow-white py-4 px-6 sm:px-10 bg-gray-100 dark:bg-gray-600 border-emerald-500 rounded-md">
          <a
            href="#"
            class="px-4 py-2 bg-red-500 rounded-md text-white text-sm sm:text-lg shadow-md"
          >
            Go Back
          </a>

          <div class="my-3">
            <h1 class="text-center text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              My Profile
            </h1>
            <form action="" method="POST">
              <div class="my-2">
                <label
                  for="email"
                  class="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
                >
                  Email
                </label>
                <input
                  type="text"
                  name="class"
                  class="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  id="email"
                  value={users?.email}
                />
              </div>
              <div class="my-2">
                <label
                  for="first_name"
                  class="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  class="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  id="first_name"
                  value={users?.firstName}
                />
              </div>

              <div class="my-2">
                <label
                  for="lastName"
                  class="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="class"
                  class="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  id="last-name"
                  value={users?.lastName}
                />
              </div>

              <div class="my-2">
                <label
                  for="lastName"
                  class="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="class"
                  class="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  id="phoneNumber"
                  value={users?.phoneNumber || "null"}
                />
              </div>

              <div class="my-2">
                <label
                  for="lastName"
                  class="text-sm sm:text-md font-bold text-gray-700 dark:text-gray-300"
                >
                  Role
                </label>
                <input
                  type="text"
                  name="class"
                  class="block w-full border border-emerald-500 outline-emerald-800 px-2 py-2 text-sm sm:text-md rounded-md my-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  id="role"
                  value={users?.role}
                />
              </div>

              <button class="px-4 py-1 bg-emerald-500 rounded-md text-black text-sm sm:text-lg shadow-md">
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
