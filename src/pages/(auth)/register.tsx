import auth_bg_img from '@/assets/images/auth_bg_img.png';
import { FormControl, FormInput, FormLabel } from '@/components/auth/form-control';
import Layout from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectItem, SelectValue, SelectContent, SelectTrigger } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
// import { hashPassword } from '@/lib/hash';
import { useNavigate } from 'react-router';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';
import { useAuth, useUsersStore } from '@/states/users';

export default function Register() {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [dobMonth, setDobMonth] = useState<string>('');
    const [dobDay, setDobDay] = useState<string>('');
    const [dobYear, setDobYear] = useState<string>('');

    const navigate = useNavigate();
    // User Store
    const { addUser } = useUsersStore();

    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated])

    const handleRegister = () => {
        // Check if inputs are empty
        if (
            email === '' ||
            username === '' ||
            password === '' ||
            dobMonth === '' ||
            dobDay === '' ||
            dobYear === ''
        ) {
            toast({
                title: 'Please fill in all fields',
                variant: 'destructive',
            });
            return;
        }


        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Sanitize inputs
        const sanitizedEmail = email.trim().toLowerCase();
        const sanitizedUsername = username.trim();
        const sanitizedPassword = password.trim();

        // Validate inputs
        if (!emailPattern.test(sanitizedEmail)) {
            toast({
                title: 'Invalid email address',
                description: 'Please enter a valid email address',
                variant: 'destructive',
            });
            return;
        }

        if (sanitizedUsername.length < 3) {
            toast({
                title: 'Invalid username',
                description: 'Username must be at least 3 characters long',
                variant: 'destructive',
            });
            return;
        }

        if (sanitizedPassword.length < 8) {
            toast({
                title: 'Invalid password',
                description: 'Password must be at least 8 characters long',
                variant: 'destructive',
            });
            return;
        }

        // Format DOB
        const dob = `${dobMonth}-${dobDay}-${dobYear}`;
        addUser({
            id: uuidv4(),
            email,
            userName: username,
            password: password,
            dob,
        });
        navigate('/login');
    }

    return (
        <Layout>
            <div style={{
                backgroundImage: `url(${auth_bg_img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }} className="h-screen grid place-items-center">
                <Card className="w-full max-w-lg bg-background rounded-sm border-none">
                    <CardContent className="flex flex-col gap-4 py-8">
                        <a href="/login" className='flex items-center gap-2 text-primary-foreground'>
                            <ArrowLeft className='w-4 h-4' />
                            <h1 className='text-sm font-semibold'>Go back</h1>
                        </a>
                        <div>
                            <h1 className='text-2xl font-bold text-primary-foreground text-center'>Create an account</h1>
                        </div>
                        <FormControl>
                            <FormLabel>EMAIL <span className="text-red-500">*</span></FormLabel>
                            <FormInput value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>USERNAME <span className="text-red-500">*</span></FormLabel>
                            <FormInput value={username} onChange={(e) => setUsername(e.target.value)} />
                        </FormControl>
                        <FormControl>
                            <FormLabel>PASSWORD <span className="text-red-500">*</span></FormLabel>
                            <FormInput value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>DATE OF BIRTH <span className="text-red-500">*</span></FormLabel>
                            <div className='flex flex-row items-center gap-2'>
                                <Select value={dobMonth} onValueChange={(value) => setDobMonth(value)}>
                                    <SelectTrigger className='bg-darker border-none rounded-sm focus-visible:ring-transparent text-primary-foreground'>
                                        <SelectValue placeholder="Month" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-darker border-none rounded-sm focus-visible:ring-transparent text-primary-foreground'>
                                        {Array.from({ length: 12 }, (_, index) => (
                                            <SelectItem key={index} value={`${index + 1}`}>{`${index + 1}`}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={dobDay} onValueChange={(value) => setDobDay(value)}>
                                    <SelectTrigger className='bg-darker border-none rounded-sm focus-visible:ring-transparent text-primary-foreground'>
                                        <SelectValue placeholder="Day" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-darker border-none rounded-sm focus-visible:ring-transparent text-primary-foreground'>
                                        {Array.from({ length: 31 }, (_, index) => (
                                            <SelectItem key={index} value={`${index + 1}`}>{`${index + 1}`}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <Select value={dobYear} onValueChange={(value) => setDobYear(value)}>
                                    <SelectTrigger className='bg-darker border-none rounded-sm focus-visible:ring-transparent text-primary-foreground'>
                                        <SelectValue placeholder="Year" />
                                    </SelectTrigger>
                                    <SelectContent className='bg-darker border-none rounded-sm focus-visible:ring-transparent text-primary-foreground'>
                                        {Array.from({ length: 100 }, (_, index) => {
                                            const year = new Date().getFullYear() - index;
                                            return (
                                                <SelectItem key={year} value={`${year}`}>{year}</SelectItem>
                                            );
                                        })}
                                    </SelectContent>
                                </Select>
                            </div>
                        </FormControl>
                        <div>
                            <Button
                                onClick={handleRegister}
                                className='w-full rounded-sm bg-blue-500 text-primary-foreground hover:bg-blue-600 transition-colors duration-300'
                            >Create account</Button>
                            <a href="/login" className="text-blue-500 text-xs font-semibold">Already have an account?</a>
                        </div>
                        <div className='text-xs text-muted-foreground'>
                            <p>By creating an account, you agree to Discord&apos;s <a href="/terms" className="text-blue-500">Terms of Service</a> and <a href="/privacy" className="text-blue-500">Privacy Policy</a></p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    )
}
