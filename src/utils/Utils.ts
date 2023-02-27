export class Utils {
    public static randomString(length: number): string {
        let string = '';
        const randomChar = function () {
            const number = Math.floor(Math.random() * 62);
            if (number < 10) return number;
            if (number < 36) return String.fromCharCode(number + 55);
            return String.fromCharCode(number + 61);
        };
        while (string.length < length) string += randomChar();
        return string;
    }
}