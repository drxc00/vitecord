import { create } from "zustand";
import { Server, ServerStore, Channel } from "../types";
import { createJSONStorage, persist } from "zustand/middleware";

export const useServersStore = create<ServerStore>()(
  persist(
    (set) => ({
      servers: [],
      addChannel: (channel: Channel, serverId: string) => {
        // Set the channel to the server
        set((state) => ({
          // Map through the servers and add the channel to the server
          servers: state.servers.map((server) =>
            // Check if the current server id is the same as the server id
            server.id === serverId
              ? // If it is, add the channel to the server
                { ...server, channels: [...server.channels, channel] }
              : // If it isn't, return the server
                server
          ),
        }));
      },
      removeChannel: (channelId: string, serverId: string) => {
        // Remove the channel from the server
        set((state) => ({
          // Map through the servers and remove the channel from the server
          servers: state.servers.map((server) =>
            // Check if the current server id is the same as the server id
            server.id === serverId
              ? {
                  ...server,
                  channels: server.channels.filter(
                    (channel) => channel.id !== channelId
                  ),
                }
              : server
          ),
        }));
      },
      addServer: (server: Server) =>
        set((state) => ({ ...state, servers: [...state.servers, server] })),
      removeServer: (id: string) =>
        set((state) => ({
          ...state,
          servers: state.servers.filter((server) => server.id !== id),
        })),
    }),
    {
      name: "servers",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
