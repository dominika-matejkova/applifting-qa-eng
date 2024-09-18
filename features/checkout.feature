Feature: Checkout Process
    As a user
    I want to be able to complete the checkout process
    So I can purchase the items in my shopping cart

    @done
    Scenario: Proceeding to checkout from the shopping cart
        Given I have items in my shopping cart
        When I view my shopping cart
        And I click the "Checkout" button
        Then I should be taken to the checkout page
        And I should see a summary of the items in my cart
        And I should be prompted to enter my shipping and payment information