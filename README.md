# SauceDemo Playwright Automation

End-to-end UI test automation for [SauceDemo](https://www.saucedemo.com) (a demo e-commerce site) built with **Playwright** and **JavaScript**, using the **Page Object Model (POM)**.

## What is covered (15 test cases)

| Area | Test cases |
|------|-----------|
| Login | Valid login, wrong password, locked out user, empty username, empty password |
| Inventory | Product count, cart badge (add one / add two / remove), sort by price low to high |
| Cart | Added product appears in the cart |
| Checkout | Complete order end to end, missing first name, missing last name, missing postal code |

## Tech stack
- Playwright Test (JavaScript)
- Page Object Model
- HTML report, screenshots and video on failure

## Project structure
```
pages/       Page objects (LoginPage, InventoryPage, CartPage, CheckoutPage)
tests/       Test specs (login, inventory, checkout)
utils/       Test data
playwright.config.js
```

## How to run
```bash
npm install
npx playwright install
npm test              # run all tests (headless)
npm run test:headed   # watch the browser
npm run report        # open the HTML report
```

## Highlights
- Reusable page objects keep locators out of the test files
- Positive and negative scenarios with clear assertions
- Test data kept in one file
- Auto screenshots and video when a test fails
