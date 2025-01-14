import { Chat } from "@/types";

export function Message({ message }: { message: Chat }) {
    return (
        <div className="flex flex-row items-center justify-start gap-4 px-4 hover:bg-dark/60 py-0.5">
            <div className="w-10 h-10 rounded-full bg-muted-foreground">

            </div>
            <div>
                <div className="flex flex-row items-center gap-2">
                    <p className="text-sm">{message.sender.userName}</p>
                    <p className="text-xs text-muted-foreground">{new Date(message.createdAt).toLocaleDateString()}</p>
                </div>
                <p>{message.message}</p>
            </div>
        </div>
    )
}
