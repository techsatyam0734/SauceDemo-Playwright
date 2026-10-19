const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');
const { InventoryPage } = require('../pages/InventoryPage');
const { CartPage } = require('../pages/CartPage');
const { CheckoutPage } = require('../pages/CheckoutPage');
const { users, products, checkoutInfo } = require('../utils/testData');

test.describe('Cart and checkout flow', () => {
  let inventoryPage;
  let cartPage;
  let checkoutPage;

  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(users.standard.username, users.standard.password);
    await inventoryPage.addToCart(products.backpack.id);
    await inventoryPage.openCart();
  });

  test('TC11 - added product is visible in the cart', async () => {
    await expect(cartPage.title).toHaveText('Your Cart');
    await expect(cartPage.itemNames).toHaveText([products.backpack.name]);
  });

  test('TC12 - user can complete an order end to end', async ({ page }) => {
    await cartPage.checkout();
    await checkoutPage.fillInformation(
      checkoutInfo.firstName,
      checkoutInfo.lastName,
      checkoutInfo.postalCode
    );
    await expect(checkoutPage.title).toHaveText('Checkout: Overview');
    await checkoutPage.finishOrder();
    await expect(page).toHaveURL(/checkout-complete\.html/);
    await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
  });

  test('TC13 - checkout fails when first name is missing', async () => {
    await cartPage.checkout();
    await checkoutPage.fillInformation('', checkoutInfo.lastName, checkoutInfo.postalCode);
    await expect(checkoutPage.errorMessage).toContainText('First Name is required');
  });

  test('TC14 - checkout fails when last name is missing', async () => {
    await cartPage.checkout();
    await checkoutPage.fillInformation(checkoutInfo.firstName, '', checkoutInfo.postalCode);
    await expect(checkoutPage.errorMessage).toContainText('Last Name is required');
  });

  test('TC15 - checkout fails when postal code is missing', async () => {
    await cartPage.checkout();
    await checkoutPage.fillInformation(checkoutInfo.firstName, checkoutInfo.lastName, '');
    await expect(checkoutPage.errorMessage).toContainText('Postal Code is required');
  });
});
