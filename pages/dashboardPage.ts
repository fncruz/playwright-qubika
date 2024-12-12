import { BasePage } from './basePage';

export class DashboardPage extends BasePage {

    async goToCategory(): Promise<void> {
       await this.page.getByRole('link', { name: ' Tipos de Categorias' }).click();
    }
}
