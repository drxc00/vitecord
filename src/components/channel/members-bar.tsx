import { PublicUser } from "@/types";

export function MembersBar({ members }: { members: PublicUser[] }) {
    return (
        <div className="flex w-full max-w-60 justify-end bg-dark h-screen">
            <p>Members</p>
        </div>
    )
}
