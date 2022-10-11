import { persist } from "zustand/middleware";
import { BASE_URL } from "utils";
import axios from "axios";
import create from "zustand";

const authStore = (set: any) => ({
  userProfile: null,
  allUsers: [],

  addUser: (user: any) => set({ userProfile: user }),
  removeUser: () => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const response = await axios.get(`${BASE_URL}/api/users`);

    set({ allUsers: response.data });
  },
});

export const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);
