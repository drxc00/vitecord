import { PublicUser } from "@/types";

export function MembersBar({ members }: { members: PublicUser[] }) {
  const totalOnline = members.length;

  return (
    <div className="flex flex-col w-full max-w-60 justify-start bg-primary h-full space-y-1">
      <div className="p-4 pb-0 text-xs text-medium text-muted-foreground">
        ONLINE - {totalOnline}
      </div>
      {members.map((member) => (
        <div className="flex items-center justify-start space-x-3 pl-4 pr-4 pt-3">
          <div className="flex items-center justify-center">
            <div
              className="h-8 w-8 rounded-full bg-cover"
              style={{
                backgroundImage: `url(https://placecats.com/millie/50/50)`,
              }}
            />
            <p className="pl-3">{member.userName}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
