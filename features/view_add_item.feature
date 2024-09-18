Feature: Viewing Item Details and Adding Items to the Shopping Cart
    As a user
    I want to be able to view the item details and add items to my shopping cart
    So I can complete my order

    Rule: Items displayed while browsing or in search results can be clicked to open the product details screen

        @view
        Scenario: Viewing product details
            Given I am on the homepage
            When I click on a product's title
            Then I am on a product details page
            And I see the product's price, description, and image

    Rule: Adding an item to the shopping cart displays a confirmation message and updates the shopping cart icon counter

        @like_it
        Scenario: Adding items to the shopping cart
            Given I am on a product details page
            When I select a quantity of 2 for the product
            And I click the "Add to Cart" button
            Then the item should be added to my shopping cart with a quantity of 2
            And a message confirming the addition should be displayed
            And the shopping cart icon should indicate the updated item count as 2

        @skip_it
        Scenario: Returning to the homepage
            Given I am on a product details page
            When I click the "Home" or "Homepage" link
            Then I am on the homepage

        @review
        Scenario: Viewing product details from the shopping cart
            Given I have items in my shopping cart
            When I view my shopping cart
            And I click on a product's title
            Then I am on a product details page
            And I see the product's price, description, and image