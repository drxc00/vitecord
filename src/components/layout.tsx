
export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="bg-background text-foreground font-sans">
            {children}
        </div>
    )
}
