import { create } from "zustand";
import { User } from "../types";
import { UserStore } from "../types";


export const useUsersStore = create<UserStore>((set) => ({
    users: [],
    addUser: (user: User) => set((state) => ({ ...state, users: [...state.users, user] })),
    removeUser: (id: string) => set((state) => ({ ...state, users: state.users.filter((user) => user.id !== id) })),
}));


