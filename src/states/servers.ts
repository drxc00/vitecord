import { create } from "zustand";
import { Server, ServerStore } from "../types";
    
export const useServersStore = create<ServerStore>((set) => ({
    servers: [],
    addServer: (server: Server) => set((state) => ({ ...state, servers: [...state.servers, server] })),
    removeServer: (id: string) => set((state) => ({ ...state, servers: state.servers.filter((server) => server.id !== id) })),
}))