export interface IPayload {
    sub: number; 
    login: string; 
    claim: string; 
    iat: number;
    exp: number;
}

export type UserRoom = {
    id: string;
    username: string;
}

export type UserMessage = {
    msg: string;
    id: string;
}

export type RoomMessage = {
    id: string;
}