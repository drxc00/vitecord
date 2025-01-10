import { Channel } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ChannelsState {
    channels: Channel[];
    setChannels: (channels: Channel[]) => void;
}

export const useChannelsStore = create<ChannelsState>()(
    persist(
        (set) => ({
            channels: [],
            setChannels: (channels: Channel[]) => set({ channels }),
        }),
        {
            name: "channels"
        }
    )
);