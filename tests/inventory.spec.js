const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { users, products } = require('../utils/testData');

test.describe('Inventory and cart badge', () => {
  let inventoryPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
  });

  test('TC06 - inventory page shows 6 products', async () => {
    await expect(inventoryPage.items).toHaveCount(6);
  });

  test('TC07 - adding one product updates the cart badge to 1', async () => {
    await inventoryPage.addToCart(products.backpack.id);
    await expect(inventoryPage.cartBadge).toHaveText('1');
  });

  test('TC08 - adding two products updates the cart badge to 2', async () => {
    await inventoryPage.addToCart(products.backpack.id);
    await inventoryPage.addToCart(products.bikeLight.id);
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  test('TC09 - removing a product clears the cart badge', async () => {
    await inventoryPage.addToCart(products.backpack.id);
    await inventoryPage.removeFromCart(products.backpack.id);
    await expect(inventoryPage.cartBadge).toHaveCount(0);
  });

  test('TC10 - sorting by price low to high orders products correctly', async () => {
    await inventoryPage.sortBy('lohi');
    const prices = await inventoryPage.getPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });
});
