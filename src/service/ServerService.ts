export default class ServerService {

    public static getVersion(): string {
        return '1.0.0';
    }

    public static getTime(): Date {
        return new Date();
    }
}