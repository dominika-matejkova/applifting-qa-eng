const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, element, by } = require('detox');

//
// Step Definitions for "View items in the shopping cart" scenario
//

Given('I have {int} of {string} in my shopping cart', async (quantity, product) => {  
  // Simulating adding a product with a given quantity to the shopping cart
  for (let i = 0; i < quantity; i++) {
    await element(by.id('addToCartButton')).tap(); // Add the product to the cart
  }
});

When('I view my shopping cart', async () => {
  await element(by.id('cartIcon')).tap(); // Tap the cart icon to view the shopping cart
});

Then('I should see a list of items in my cart', async () => {
  await expect(element(by.id('cartItemList'))).toBeVisible(); // Verify cart item list is visible
});

Then('the total price is {int}', async (price) => {
  const totalPrice = await element(by.id('cartTotalPrice')).getAttributes(); // Fetch the total price
  await expect(parseInt(totalPrice.text)).toBe(price); // Compare the total price
});

//
// Step Definitions for "Update the quantity of items in the shopping cart" scenario
//

When('I change the quantity of {string} to {int}', async (product, changedQuantity) => {
  await element(by.id(`cartItem-${product}`)).tap(); // Tap the cart item by product ID
  await element(by.id('quantityInput')).clearText(); // Clear existing quantity
  await element(by.id('quantityInput')).typeText(`${changedQuantity}`); // Enter new quantity
  await element(by.id('updateButton')).tap(); // Tap the update button
});

Then('the shopping cart should contain {int} of {string}', async (result, product) => {
  const quantity = await element(by.id(`cartItemQuantity-${product}`)).getAttributes();
  await expect(parseInt(quantity.text)).toBe(result); // Compare the quantity displayed
});

Then('the total price is {int}', async (price) => {
  const totalPrice = await element(by.id('cartTotalPrice')).getAttributes();
  await expect(parseInt(totalPrice.text)).toBe(price); // Compare the total price displayed
});

//
// Step Definitions for "Remove items from the shopping cart" scenario
//

When('I remove {string} from the cart', async (product) => {
  await element(by.id(`removeItemButton-${product}`)).tap(); // Tap the remove button for the product
});

Then('the shopping cart should contain {int} items', async (total) => {
  const cartItems = await element(by.id('cartItemList')).getAttributes();
  await expect(cartItems.children.length).toBe(total); // Compare the total number of items in the cart
});

Then('{string} is not in the cart', async (product) => {
  await expect(element(by.id(`cartItem-${product}`))).not.toBeVisible(); // Ensure the product is no longer in the cart
});
