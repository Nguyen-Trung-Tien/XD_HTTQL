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
    <div class="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div class="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-6">
          My Profile
        </h1>

        <form method="POST" class="space-y-5">
          <div>
            <label
              class="block text-sm font-medium text-gray-700 mb-1"
              for="email"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              class="w-full px-3 py-2 border border-emerald-500 rounded-md bg-white text-gray-900 outline-emerald-600"
              value={users?.email}
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 mb-1"
              for="first_name"
            >
              First Name
            </label>
            <input
              type="text"
              name="first-name"
              id="first-name"
              class="w-full px-3 py-2 border border-emerald-500 rounded-md bg-white text-gray-900 outline-emerald-600"
              value={users?.firstName}
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 mb-1"
              for="last_name"
            >
              Last Name
            </label>
            <input
              type="text"
              name="last-name"
              id="last-name"
              class="w-full px-3 py-2 border border-emerald-500 rounded-md bg-white text-gray-900 outline-emerald-600"
              value={users?.lastName}
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 mb-1"
              for="phoneNumber"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              class="w-full px-3 py-2 border border-emerald-500 rounded-md bg-white text-gray-900 outline-emerald-600"
              value={users?.phoneNumber}
            />
          </div>

          <div>
            <label
              class="block text-sm font-medium text-gray-700 mb-1"
              for="role"
            >
              Role
            </label>
            <input
              type="text"
              name="role"
              id="role"
              class="w-full px-3 py-2 border border-emerald-500 rounded-md bg-white text-gray-900 outline-emerald-600"
              value={users?.role}
            />
          </div>

          <div class="text-center">
            <button
              type="submit"
              class="px-6 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
