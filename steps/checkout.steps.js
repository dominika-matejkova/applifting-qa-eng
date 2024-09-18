const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('detox');

Given('I have items in my shopping cart', async () => {
    await expect(element(by.id('cartCount'))).toBeVisible();  // The cart contains some items
});

When('I view my shopping cart', async () => {
  await element(by.id('cartIcon')).tap(); // Tap the cart icon to view the shopping cart
});

When('I click the {string} button', async (buttonText) => {
  await element(by.text(buttonText)).tap();  // Tap the "Checkout" button
});

Then('I should be taken to the checkout page', async () => {
  await expect(element(by.id('checkoutPage'))).toBeVisible();  // Verify checkout page is visible
});

Then('I should see a summary of the items in my cart', async () => {
  await expect(element(by.id('cartSummary'))).toBeVisible();  // Verify the cart summary is visible
  await expect(element(by.id('cartItem'))).toBeVisible(); // Verify that items in the cart are displayed
});

Then('I should be prompted to enter my shipping and payment information', async () => {
  await expect(element(by.id('shippingInfo'))).toBeVisible();  // Verify the shipping information form is visible
  await expect(element(by.id('paymentInfo'))).toBeVisible();  // Verify the payment information form is visible
});
