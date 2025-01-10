
export interface User {
    id: string;
    email: string;
    userName: string;
    password: string; // make sure to hashhhh
    dob: string;
    servers: Server[];
}

export interface PublicUser extends Omit<User, 'password' | 'servers'> { }

export interface LoginUser extends Omit<User, 'password'> { }

export interface Auth {
    user: LoginUser | null;
    isAuthenticated: boolean;
    login: (credentials: { email: string, password: string }) => void;
    logout: () => void;
}

export interface UserStore {
    users: User[];
    addUser: (user: User) => void;
    removeUser: (id: string) => void;
}

export interface Chat {
    id: string;
    message: string;
    sender: PublicUser;
}

export interface Channel {
    id: string;
    chats: Chat[];
}

export interface Server {
    id: string;
    name: string;
    channels: Channel[];
    inviteCode: string;
    members: PublicUser[];
    owner: PublicUser;
}

export interface ServerStore {
    servers: Server[];
    addServer: (server: Server) => void;
}