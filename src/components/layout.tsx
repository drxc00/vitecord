import ChannelBar from "./channel-bar";
import { Toaster } from "./ui/toaster";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="font-sans flex">
            <div className="h-screen bg-darker w-full max-w-16">
                <ChannelBar />
            </div>
            {children}
            <Toaster />
        </div>
    )
}
