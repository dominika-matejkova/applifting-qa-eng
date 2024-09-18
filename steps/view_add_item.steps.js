const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, element, by } = require('detox');

//
// Step Definitions for "Viewing product details" scenario
//

Given('I am on the homepage', async () => {
  await expect(element(by.id('homepage'))).toBeVisible();  // Ensure homepage is visible
});

When('I click on a product\'s title', async () => {
  await element(by.id('productTitle')).tap();  // Tap the product's title to view details
});

Then('I am on a product details page', async () => {
  await expect(element(by.id('productDetailsPage'))).toBeVisible();  // Verify product details page is visible
});

Then('I see the product\'s price, description, and image', async () => {
  await expect(element(by.id('productPrice'))).toBeVisible();  // Check for price
  await expect(element(by.id('productDescription'))).toBeVisible();  // Check for description
  await expect(element(by.id('productImage'))).toBeVisible();  // Check for image
});

//
// Step Definitions for "Adding items to the shopping cart" scenario
//

Given('I am on a product details page', async () => {
  await device.launchApp();
  await element(by.id('productTitle')).tap();  // Navigate to product details page
  await expect(element(by.id('productDetailsPage'))).toBeVisible();  // Verify product details page is visible
});

When('I select a quantity of {int} for the product', async (quantity) => {
  await element(by.id('quantityInput')).clearText();  // Clear default quantity
  await element(by.id('quantityInput')).typeText(`${quantity}`);  // Enter new quantity
});

When('I click the {string} button', async (buttonText) => {
  await element(by.text(buttonText)).tap();  // Tap the button, e.g., "Add to Cart"
});

Then('the item should be added to my shopping cart with a quantity of {int}', async (quantity) => {
  await element(by.id('cartIcon')).tap();  // Tap cart icon to view cart
  const cartQuantity = await element(by.id('cartItemQuantity')).getAttributes();  // Fetch quantity in cart
  await expect(parseInt(cartQuantity.text)).toBe(quantity);  // Verify quantity matches
});

Then('a message confirming the addition should be displayed', async () => {
  await expect(element(by.id('confirmationMessage'))).toBeVisible();  // Ensure confirmation message is displayed
});

Then('the shopping cart icon should indicate the updated item count as {int}', async (count) => {
  const cartIconCounter = await element(by.id('cartIconCounter')).getAttributes();  // Fetch the cart icon counter
  await expect(parseInt(cartIconCounter.text)).toBe(count);  // Verify item count matches
});

//
// Step Definitions for "Returning to the homepage" scenario
//

When('I click the {string} link', async (linkText) => {
  await element(by.text(linkText)).tap();  // Tap either "Home" or "Homepage" link to navigate back
});

Then('I am on the homepage', async () => {
  await expect(element(by.id('homepage'))).toBeVisible();  // Ensure homepage is visible
});

//
// Step Definitions for "Viewing product details from the shopping cart" scenario
//

Given('I have items in my shopping cart', async () => {
  await device.launchApp();
  await element(by.id('addToCartButton')).tap();  // Simulate adding a product to the cart
});

When('I view my shopping cart', async () => {
  await element(by.id('cartIcon')).tap();  // Tap the cart icon to view the shopping cart
});

When('I click on a product\'s title', async () => {
  await element(by.id('cartProductTitle')).tap();  // Tap the product title inside the cart
});

Then('I am on a product details page', async () => {
  await expect(element(by.id('productDetailsPage'))).toBeVisible();  // Verify product details page is visible
});

Then('I see the product\'s price, description, and image', async () => {
  await expect(element(by.id('productPrice'))).toBeVisible();  // Check for price
  await expect(element(by.id('productDescription'))).toBeVisible();  // Check for description
  await expect(element(by.id('productImage'))).toBeVisible();  // Check for image
});
