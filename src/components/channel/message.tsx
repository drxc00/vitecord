export function Message({ message }: { message: Chat }) {
  return (
    <div className="flex flex-row items-start justify-start gap-4 px-4 hover:bg-dark/60 py-0.5 pt-2 pb-2 max-w-full">
      <div
        className="h-10 w-10 rounded-full bg-cover"
        style={{
          backgroundImage: `url(https://placecats.com/millie/50/50)`,
        }}
      />
      {/* idk how to fix this part, this seems to be the only thing that works */}
      <div className="max-w-[1350px] w-full pr-10">
        <div className="flex flex-row items-center gap-2">
          <p className="text-sm font-semibold">{message.sender.userName}</p>
          <p className="text-xs text-muted-foreground">
            {new Date(message.createdAt).toLocaleDateString()}
          </p>
        </div>
        <div className="w-full">
          <p className="whitespace-pre-wrap break-words overflow-hidden text-sm">
            {message.message}
          </p>
        </div>
      </div>
    </div>
  );
}
