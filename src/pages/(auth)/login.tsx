import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import auth_bg_img from '@/assets/images/auth_bg_img.png';
import { useEffect, useState } from "react";
import { FormInput } from "@/components/auth/form-control";
import { FormLabel } from "@/components/auth/form-control";
import { FormControl } from "@/components/auth/form-control";
import { useAuth } from "@/states/users";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router";


export default function Login() {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { login, isAuthenticated } = useAuth();

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated])

    const handleLogin = () => {
        // Check if inputs are empty
        if (username === '' || password === '') {
            toast({
                title: 'Please fill in all fields',
                variant: 'destructive',
            });
            return;
        }

        login({
            email: username,
            password: password,
        });
    }
    return (
        <div style={{
            backgroundImage: `url(${auth_bg_img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }} className="h-screen grid place-items-center">
            <Card className="w-full max-w-lg bg-background rounded-sm border-none">
                <CardContent className="flex flex-col gap-4 py-8">
                    <div className="flex flex-col items-center justify-center">
                        <h1 className="text-2xl font-bold text-primary-foreground">Welcome back!</h1>
                        <p className="text-sm text-muted-foreground font-semibold">We&apos;re so excited to see you again!</p>
                    </div>
                    <div className="flex flex-col gap-4">
                        <FormControl>
                            <FormLabel>USERNAME <span className="text-red-500">*</span></FormLabel>
                            <FormInput
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-darker border-none rounded-sm focus-visible:ring-transparent text-primary-foreground" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>PASSWORD <span className="text-red-500">*</span></FormLabel>
                            <FormInput
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                className="bg-darker  border-none rounded-sm focus-visible:ring-transparent text-primary-foreground" />
                            <p className="text-xs text-blue-500 font-semibold">Forgot your password?</p>
                        </FormControl>
                        <Button
                            onClick={handleLogin}
                            className="w-full rounded-sm bg-blue-500 text-primary-foreground hover:bg-blue-600 transition-colors duration-300">Login</Button>
                        <div className="text-sm font-semibold">
                            <p className="text-sm text-muted-foreground">Need an account? <a href="/register" className="text-blue-500">Register</a></p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
