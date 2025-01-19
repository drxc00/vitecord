import { PublicUser } from "@/types";
import { Crown } from "lucide-react";

export function MembersBar({
  owner,
  members,
}: {
  owner: PublicUser;
  members: PublicUser[];
}) {
  const totalOnline = members.length;

  return (
    <div className="flex flex-col w-full max-w-60 justify-start bg-primary h-full space-y-1">
      <div className="p-4 pb-0 text-xs text-medium text-muted-foreground">
        ONLINE - {totalOnline}
      </div>
      {members.map((member, idx) => (
        <div
          key={idx}
          className="flex items-center justify-start space-x-3 pl-2 pr-2"
        >
          <div className="flex items-center justify-start hover:bg-[#35373c] w-full p-1 pl-2 pr-2 rounded-md">
            <div
              className="h-8 w-8 rounded-full bg-cover"
              style={{
                backgroundImage: `url(https://placecats.com/millie/50/50)`,
              }}
            />
            <p className="pl-3 flex items-center">
              {member.userName}
              {member.id === owner.id && (
                <Crown className="ml-2 h-4 w-4 text-[#bf902e] fill-[#bf902e]" />
              )}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
