import { BasePage } from './basePage';
import { expect } from '@playwright/test';


export class CategoryPage extends BasePage {

    async catTileVisible(): Promise<boolean> {
        try {
            await this.page.getByRole('heading', { name: 'Tipos de categorías' }).waitFor({ state: 'visible' });
            return true;
        } catch (e) {
            return false;
        }
    }

    async createNewCat(catName: string): Promise<void> {
        await this.page.getByRole('button', { name: ' Adicionar' }).click();
        await this.page.getByPlaceholder('Nombre de categoría').fill(catName);
        await this.page.getByRole('button', { name: 'Aceptar' }).click();
    }

    async adjustPaginationStyles(): Promise<void> {
        await this.page.evaluate(() => {
            const paginationContainer = document.querySelector('.pagination') as HTMLElement;
            if (paginationContainer) {
                paginationContainer.classList.remove('justify-content-end', 'mb-0');
                paginationContainer.style.display = 'flex';
                paginationContainer.style.flexWrap = 'wrap';
                paginationContainer.style.overflow = 'auto';
            }
        });
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });

        const paginationItems = this.page.locator('.pagination .page-item');
        const count = await paginationItems.count();
        console.log('items encontrados', count);
        const lastPageLink = paginationItems.last().locator('a.page-link');
        await lastPageLink.click();

    }

    async createNewSubCat(catName: string): Promise<void> {
        await this.page.getByRole('button', { name: ' Adicionar' }).click();
        await this.page.getByPlaceholder('Nombre de categoría').fill(catName);
        await this.page.locator('label').filter({ hasText: 'Es subcategoria?' }).click();
        await this.page.getByLabel('Adicionar tipo de categoría').locator('span').nth(1).click();
        await this.page.getByRole('combobox').getByRole('textbox').click();
        await this.page.getByRole('option', { name: 'Star' }).first().click();
        await this.page.getByRole('button', { name: 'Aceptar' }).click();
    }

    async catCreated(): Promise<boolean> {
        try {
            await this.page.locator('div').filter({ hasText: 'Tipo de categoría adicionada' }).nth(2).waitFor({ state: 'visible' });
            return true;
        } catch (e) {
            return false;
        }
    }

    async subCatCreated(catName: string): Promise<boolean> {
        try {
            await this.adjustPaginationStyles();

            await this.page.locator('app-table-generic div').filter({ hasText: 'Previous123456789101112131415161718192021222324252627282930313233343536373839404' }).nth(4).click();
            
            const lastElement = this.page.locator('app-table-generic div').filter({ hasText: 'Previous123456789101112131415161718192021222324252627282930313233343536373839404' }).last(); 
            await lastElement.waitFor({ state: 'visible' }); 
            //await lastElement.click();
            await this.page.getByText('142').click();
            await expect(this.page.getByRole('cell', { name: catName })).toBeVisible();
            return true;
        } catch (e) {
            return false;
        }
    }

}