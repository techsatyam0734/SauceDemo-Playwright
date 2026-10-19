const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users } = require('../utils/testData');

test.describe('Login feature', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('TC01 - valid user can log in successfully', async ({ page }) => {
    await loginPage.login(users.standard.username, users.standard.password);
    const inventoryPage = new InventoryPage(page);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title).toHaveText('Products');
  });

  test('TC02 - wrong password shows an error message', async () => {
    await loginPage.login(users.invalid.username, users.invalid.password);
    await expect(loginPage.errorMessage).toContainText(
      'Username and password do not match any user in this service'
    );
  });

  test('TC03 - locked out user cannot log in', async () => {
    await loginPage.login(users.lockedOut.username, users.lockedOut.password);
    await expect(loginPage.errorMessage).toContainText('this user has been locked out');
  });

  test('TC04 - empty username shows a required error', async () => {
    await loginPage.login('', users.standard.password);
    await expect(loginPage.errorMessage).toContainText('Username is required');
  });

  test('TC05 - empty password shows a required error', async () => {
    await loginPage.login(users.standard.username, '');
    await expect(loginPage.errorMessage).toContainText('Password is required');
  });
});
