import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardPage';
import { CategoryPage } from '../pages/categoryPage';
import { randomCat, randomEmail } from '../tests/helpers/helpers';

test('Validate user registration and e2e flow', async ({ request, page }) => {

    const catName = randomCat(10);

    const emailRndm = randomEmail();
    const pswd = "Password1";

    await test.step('Register a new user via API', async () => {
        const endpoint = 'https://api.club-administration.qa.qubika.com/api/auth/register';
        const requestData = {
            email: emailRndm,
            password: pswd,
            roles: ["ROLE_ADMIN"]
        };

        const response = await request.post(endpoint, { data: requestData });

        expect(response.status()).toBe(201);

        const responseBody = await response.json();
        //console.log(responseBody);
        expect(responseBody).toMatchObject({
            id: expect.any(String),
            userName: expect.any(String),
            email: emailRndm,
            password: expect.any(String),
            roles: expect.arrayContaining(["ROLE_ADMIN"]),
            firstName: null,
            lastName: null,
            fullName: null,
        });
    });

    await test.step('Log in with the new user via UI', async () => {
        let loginPage: LoginPage;
        loginPage = new LoginPage(page);
        await loginPage.navigate('https://club-administration.qa.qubika.com/#/auth/login');
        await loginPage.login(emailRndm, pswd);
        const isSuccess = await loginPage.isLoginSuccessful();
        expect(isSuccess).toBeTruthy();
    });

    await test.step('Go to category section', async () => {
        let dashboardPage: DashboardPage;
        dashboardPage = new DashboardPage(page);
        await dashboardPage.goToCategory();

        let categoryPage: CategoryPage;
        categoryPage = new CategoryPage(page);
        const isTitle = await categoryPage.catTileVisible();
        expect(isTitle).toBeTruthy();
    });

    await test.step('Create new category', async () => {
        let categoryPage: CategoryPage;
        categoryPage = new CategoryPage(page);
        await categoryPage.createNewCat(catName);
        const isCat = await categoryPage.catCreated();
        expect(isCat).toBeTruthy();
    });

    await test.step('Create new sub category', async () => {
        let categoryPage: CategoryPage;
        categoryPage = new CategoryPage(page);
        await categoryPage.createNewSubCat(catName);
        const isSubCat = await categoryPage.catCreated();
        expect(isSubCat).toBeTruthy();
    });

});