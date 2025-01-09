import { Toaster } from "./ui/toaster";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="font-sans">
            {children}
            <Toaster />
        </div>
    )
}
