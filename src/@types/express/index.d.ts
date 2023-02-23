declare namespace Express {
    export interface Request {
        account: {
            id: number; role: string;
        };
        character: {
            id: number | null;
        };
    }
}