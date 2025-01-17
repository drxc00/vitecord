import { Chat } from "@/types";

export function Message({ message }: { message: Chat }) {
  return (
    <div className="flex flex-row items-start justify-start gap-4 px-4 hover:bg-dark/60 py-0.5 pt-2 pb-2 w-full">
      <div
        className="h-10 w-10 flex-shrink-0 rounded-full bg-cover"
        style={{
          backgroundImage: `url(https://placecats.com/millie/50/50)`,
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-2">
            <p className="text-sm font-semibold">{message.sender.userName}</p>
            <p className="text-xs text-muted-foreground">
              {new Date(message.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="w-full">
            <p className="whitespace-pre-wrap break-words text-sm">
              {message.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
