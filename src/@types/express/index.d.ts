declare namespace Express {
    export interface Request {
        account: {
            id: number; role: string;
        };
        session: {
            characterId: number | null;
        };
    }
}