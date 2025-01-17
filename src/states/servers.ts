import { create } from "zustand";
import { Server, ServerStore, Channel, Chat, PublicUser, NotificationType } from "../types";
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
          // Initialize notifications
          const serverUsers = state.servers.find(server => server.id === serverId)?.members;
          const otherUsers = serverUsers?.filter(user => user.id !== message.sender.id);

          // Create notifications object
          const newNotifications = otherUsers?.reduce((notifs: NotificationType, user: PublicUser) => {
            // Get the current count of notifications for the user
            const currentCount = state.notifications[user.id]?.[serverId]?.[channelId] || 0;
            return {
              ...notifs,
              [user.id]: {
                ...state.notifications[user.id],
                [serverId]: {
                  ...state.notifications[user.id]?.[serverId],
                  [channelId]: currentCount + 1 // Add 1 to the current count
                }
              }
            };
          }, {} as NotificationType);

          return {
            servers: state.servers.map((server) =>
              server.id === serverId
                ? {
                  ...server,
                  channels: server.channels.map((channel) =>
                    channel.id === channelId
                      ? { ...channel, chats: [...channel.chats, message] }
                      : channel
                  )
                }
                : server
            ),
            notifications: {
              ...state.notifications,
              ...newNotifications
            }
          };
        });
      },
      clearNotification: (userId: string, serverId: string, channelId: string) => {
        set((state) => ({
          notifications: {
            ...state.notifications,
            [userId]: {
              ...state.notifications[userId],
              [serverId]: {
                ...state.notifications[userId]?.[serverId],
                [channelId]: 0
              }
            }
          },
          servers: state.servers
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
      getServerNotifications: (userId: string, serverId: string) => {
        const userNotifications = get().notifications[userId];
        if (!userNotifications) return 0;

        const serverNotifications = userNotifications[serverId];
        if (!serverNotifications) return 0;

        return Object.values(serverNotifications).reduce((sum, count) => sum + count, 0);
      },
      getChannelNotifications: (userId: string, serverId: string, channelId: string) => {
        const channelNotifications = get().notifications[userId]?.[serverId]?.[channelId];
        if (!channelNotifications) return 0;

        return channelNotifications;
      },
      clearNotifications: (userId: string, serverId: string, channelId: string) => {
        set((state) => ({
          notifications: {
            ...state.notifications,
            [userId]: {
              ...state.notifications[userId],
              [serverId]: {
                ...state.notifications[userId]?.[serverId],
                [channelId]: 0
              }
            }
          }
        }));
      },
    }),
    {
      name: "servers",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
