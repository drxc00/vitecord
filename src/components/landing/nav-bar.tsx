import { useAuth } from "@/states/users";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

export function NavBar() {
    const navigate = useNavigate();
    const { user } = useAuth();
    return (
        <div className="flex justify-between items-center p-4 px-40">
            <div>
                <h1 className="text-xl font-bold">Vitecord</h1>
            </div>
            <ul className="flex gap-10 [&>li]:text-md [&>li]:cursor-pointer [&>li:hover]:underline [&>li]:font-medium">
                <li>Download</li>
                <li>Nitro</li>
                <li>Discover</li>
                <li>Quests</li>
                <li>Safety</li>
                <li>Support</li>
                <li>Blog</li>
                <li>Careers</li>
            </ul>

            <div>
                {user ? (
                    <Button
                        onClick={() => {
                            navigate('/channels');
                        }}
                        className="bg-white text-primary rounded-full"
                    >
                        Dashboard
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            navigate('/login');
                        }}
                        className="bg-white text-primary rounded-full"
                    >
                        Login
                    </Button>
                )}
            </div>
        </div>
    )
}
