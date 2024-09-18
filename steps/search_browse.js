const { Given, When, Then } = require('@cucumber/cucumber');
const { expect, element, by } = require('detox');

//
// Step Definitions for the "Searching for a specific item" scenario
//

Given('I am on the homepage', async () => {
  await expect(element(by.id('homepage'))).toBeVisible();  // Assuming 'homepage' is an ID for the home screen.
});

When('I enter {string} into the search bar', async (query) => {
  await element(by.id('searchBar')).tap();
  await element(by.id('searchBar')).typeText(query);
});

When('I click the search button', async () => {
  await element(by.id('searchButton')).tap();
});

Then('I see {int} results', async (amount) => {
  const results = await element(by.id('searchResults')).getAttributes();  // Assume 'searchResults' is the ID for the list of results
  await expect(results.children.length).toBe(amount);  // Verify the number of results matches 'amount'
});

Then('each result contains {string} in the product title or description', async (query) => {
  const resultItems = await element(by.id('searchResults')).findAll(by.id('resultItem'));  // Assuming each result has 'resultItem' as its ID
  for (let i = 0; i < resultItems.length; i++) {
    await expect(resultItems[i]).toContainText(query);  // Verify each result contains the query in title or description
  }
});

//
// Step Definitions for the "Browsing items by category" scenario
//

When('I click on the {string} category', async (category) => {
  await element(by.text(category)).tap();  // Assuming category buttons or links are identifiable by text, e.g., "Electronics".
});

Then('I see a list of electronics products', async () => {
  await expect(element(by.id('productList'))).toBeVisible();  // Verify the product list is displayed after clicking the category
  const items = await element(by.id('productList')).getAttributes();
  await expect(items.children.length).toBeGreaterThan(0);  // Ensure there are items in the product list
});
