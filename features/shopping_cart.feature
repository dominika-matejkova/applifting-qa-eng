Feature: Shopping cart
    As a user
    I want to be able to view and update items in my shopping cart
    So I can checkout

    Rule: Items added to the shopping cart can be displayed on the shopping cart screen

        @shopping_cart
        Scenario: View items in the shopping cart
            Given I have <quantity> of <product> in my shopping cart
            When I view my shopping cart
            Then I should see a list of items in my cart
            And the total price is <price>

            Examples:
                | quantity | product     | price |
                | 1        | "Product A" | 1     |

    Rule: Changing the quantity of a product should update the count and total price displayed

        @update
        #This scenario should verify the happy path of changing the quantity but also make sure invalid input doesn't break the screen
        Scenario: Update the quantity of items in the shopping cart
            Given I have <quantity> of <product> in my shopping cart
            When I view my shopping cart
            And I change the quantity of <product> to <changed_quantity>
            Then the shopping cart should contain <result> of <product>
            And the total price is <price>

            #Two of the examples assume products with a 0 quantity would still be displayed - ideally those products should be removed from the cart altogether and a separate test case added
            Examples:
                | quantity | product     | changed_quantity | result | price |
                | 1        | "Product A" | 3                | 3      | 3     |
                | 1        | "Product B" | 0                | 0      | 0     |
                | 1        | "Product B" | -3               | 0      | 0     |

    Rule: The shopping cart items can be removed one by one

        @cancel
        Scenario: Remove items from the shopping cart
            Given I have <quantity> of <product> in my shopping cart
            When I view my shopping cart
            And I remove <product> from the cart
            Then the shopping cart should contain <total> items
            And <product> is not in the cart

            Examples:
                | quantity | product     | total |
                | 3        | "Product A" | 0     |
