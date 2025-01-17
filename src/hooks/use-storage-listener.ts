import { useEffect } from "react";
import { useServersStore } from "@/states/servers";

export function useStorageListener() {
    useEffect(() => {
        const handleStorageChange = () => {
            // Force state update when localStorage changes
            useServersStore.persist.rehydrate();
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);
}