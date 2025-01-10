import { useAuth } from "@/states/users";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";
import { SiVitest } from "react-icons/si";

export function NavBar() {
    const navigate = useNavigate();
    const { user } = useAuth();
    return (
        <div className="flex justify-between items-center p-4 px-40 w-full">
            <div className="flex items-center gap-2 hover:cursor-pointer" onClick={() => navigate('/')}>
                <SiVitest className="text-2xl text-white" />
                <h1 className="text-xl font-bold text-white">Vitecord</h1>
            </div>
            <ul className="flex gap-10 text-white [&>li]:text-md [&>li]:cursor-pointer [&>li:hover]:underline [&>li]:font-medium">
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
                        className="bg-white text-primary rounded-full hover:bg-white font-semibold"
                    >
                        Open Vitecord
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            navigate('/login');
                        }}
                        className="bg-white text-primary rounded-full hover:bg-white font-semibold"
                    >
                        Login
                    </Button>
                )}
            </div>
        </div>
    )
}
