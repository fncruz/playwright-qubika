import { BasePage } from './basePage';

export class LoginPage extends BasePage {

    // Login method
    async login(email: string, password: string): Promise<void> {
        await this.page.getByPlaceholder('Usuario o correo electrónico').fill(email);
        await this.page.getByPlaceholder('Contraseña').fill(password);
        await this.page.getByRole('button', { name: 'Autenticar' }).click();
    }

    // Validate for Brand logo
    async isLoginSuccessful(): Promise<boolean> {
        try {
            await this.page.waitForSelector('.navbar-brand', { state: 'visible' });
            return true;
        } catch (e) {
            return false;
        }
    }
}
