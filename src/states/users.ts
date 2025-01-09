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
            login: (user: LoginUser) => {
                // Check if user exists
                // Access local storage
                const usersStorage = JSON.parse(localStorage.getItem('users') || '');
                console.log(usersStorage);
                const users = usersStorage.state.users;
                const existingUser = users.find((u: User) => u.email === user.email);
                if (!existingUser) {
                        console.log('User does not exist');
                    return;
                }
                set((state) => ({ ...state, user: user, isAuthenticated: true }))
            },
            logout: () => set((state) => ({ ...state, user: null, isAuthenticated: false })),
        }), {
        name: 'auth',
        storage: createJSONStorage(() => localStorage),
    }
    )
);

