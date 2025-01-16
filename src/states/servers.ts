import { create } from "zustand";
import { Server, ServerStore, Channel, Chat, PublicUser } from "../types";
import { createJSONStorage, persist } from "zustand/middleware";

export const useServersStore = create<ServerStore>()(
  persist(
    (set, get) => ({
      servers: [],
      notifications: {},
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
          notifications: {
            ...state.notifications,
            [id]: {}
          }
        })),
      addMessage: (message: Chat, channelId: string, serverId: string) => {
        set((state) => {

          // Initialize the notifications state for the server if it doesn't exist
          if (!state.notifications[serverId]) {
            state.notifications[serverId] = {};
          }
          if (!state.notifications[serverId][channelId]) {
            state.notifications[serverId][channelId] = 0;
          }

          return ({
            // Initialize the notifications state for the server if it doesn't exist
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
            ),
            // We add a notification to the notification tracker state
            notifications: {
              // Spread the current notifications state
              ...state.notifications,
              // Add a new notification to the server
              [serverId]: {
                // Spread the current server notifications
                ...state.notifications[serverId],
                // Add a new notification to the channel
                [channelId]: state.notifications[serverId][channelId] + 1
              }
            }
          })
        });
      },
      clearNotification: (serverId: string, channelId: string) => {
        set((state) => ({
          // Spread the current notifications state
          notifications: {
            ...state.notifications,
            // Reset the notification for the server and channel
            [serverId]: {
              ...state.notifications[serverId],
              [channelId]: 0
            }
          }
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
      getServerNotifications: (serverId: string) => {
        const serverNotifications = get().notifications[serverId];
        if (!serverNotifications) return 0;

        return Object.values(serverNotifications).reduce((sum, count) => sum + count, 0);
      },
      getChannelNotifications: (serverId: string, channelId: string) => {
        const channelNotifications = get().notifications[serverId]?.[channelId];
        if (!channelNotifications) return 0;

        return channelNotifications;
      },
    }),
    {
      name: "servers",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
