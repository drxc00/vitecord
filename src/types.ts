
export interface User {
    id: string;
    email: string;
    userName: string;
    password: string; // make sure to hashhhh
    dob: string;
}

export interface UserStore {
    users: User[];
    addUser: (user: User) => void;
    removeUser: (id: string) => void;
}

export interface Chat {
    id: string;
    message: string;
    sender: User
}

export interface Channel {
    id: string;
    chats: Chat[];
}

export interface Server {
    id: string;
    name: string;
    channels: Channel[];
}

export interface ServerStore {
    servers: Server[];
    addServer: (server: Server) => void;
}