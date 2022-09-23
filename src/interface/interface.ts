export interface IPayload {
    sub: number; 
    login: string; 
    claim: string; 
    iat: number;
    exp: number;
}