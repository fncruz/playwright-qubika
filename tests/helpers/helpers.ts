export function randomEmail(): string {
    const randomNum = Math.floor(Math.random() * 900000) + 100000;
    return `test+${randomNum}@test.com`;
}

export function randomCat(long: number): string {
    const caracs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = 'Cat';
    const longCaracs = caracs.length;

    for (let i = 0; i < long - 3; i++) {
        result += caracs.charAt(Math.floor(Math.random() * longCaracs));
    }

    return result;
}