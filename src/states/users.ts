import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, Auth, LoginUser } from "../types";
import { UserStore } from "../types";


export const useUsersStore = create<UserStore>()(
    persist(
        (set, get) => ({
            users: [],
            addUser: (user: User) => {
                // Check if user already exists
                const existingUser = get().users.find((u) => u.email === user.email);
                if (existingUser) {
                    return;
                }
                set((state) => ({ ...state, users: [...state.users, user] }))
            },
            removeUser: (id: string) => set((state) => ({ ...state, users: state.users.filter((user) => user.id !== id) })),
        }), {
        name: 'users',
        storage: createJSONStorage(() => localStorage),
    }
    )
);


export const useAuth = create<Auth>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            login: (credentials: { email: string, password: string }) => {

                // Check if users exist
                if (localStorage.getItem('users') === null) {
                    throw new Error('No users found');
                }

                // Check if the user exists
                const usersStorage = JSON.parse(localStorage.getItem('users') || '');
                const users = usersStorage.state.users;
                const existingUser = users.find((u: User) => u.email === credentials.email);
                if (!existingUser) {
                    throw new Error('User does not exist');
                }

                // Check if password is correct
                if (existingUser.password !== credentials.password) {
                    throw new Error('Invalid password');
                }

                // Set user
                // We only return the values that we need
                const user: LoginUser = {
                    id: existingUser.id,
                    email: existingUser.email,
                    userName: existingUser.userName,
                    dob: existingUser.dob,
                    servers: existingUser.servers,
                }

                set((state) => ({ ...state, user: user, isAuthenticated: true }))
            },
            logout: () => set((state) => ({ ...state, user: null, isAuthenticated: false })),
        }), {
        name: 'auth',
        storage: createJSONStorage(() => sessionStorage),
    }
    )
);

