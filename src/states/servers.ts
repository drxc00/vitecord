import { create } from "zustand";
import { Server, ServerStore, Channel, Chat, PublicUser } from "../types";
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
      addMessage: (message: Chat, channelId: string, serverId: string) => {
        set((state) => ({
          servers: state.servers.map((server) => 
            server.id === serverId
              ? {
                  ...server,
                  // Map through the channels and add the message to the channel
                  channels: server.channels.map((channel) =>
                    channel.id === channelId
                      ? {
                          ...channel,
                          chats: [...channel.chats, message] // Append the message to the channel
                        }
                      : channel // Return the channel --Default behavior
                  )
                }
              : server // Return the server --Default behavior
          )
        }));
      },
      addUserToServer: (user: PublicUser, serverId: string) => {
        set((state) => ({
          servers: state.servers.map((server) => (
            // Check if the current server id is the same as the server id
            server.id === serverId
              ? { ...server, members: [...server.members, user] } // Append the user to the server
              : server) // Return the server --Default behavior
          ),
        }));
      },
    }),
    {
      name: "servers",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
