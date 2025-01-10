import { create } from "zustand";
import { Server, ServerStore } from "../types";
import { createJSONStorage, persist } from "zustand/middleware";

export const useServersStore = create<ServerStore>()(
    persist((set) => ({
        servers: [],
        addServer: (server: Server) => set((state) => ({ ...state, servers: [...state.servers, server] })),
        removeServer: (id: string) => set((state) => ({ ...state, servers: state.servers.filter((server) => server.id !== id) })),
    }), {
        name: 'servers',
        storage: createJSONStorage(() => localStorage),
    })
)