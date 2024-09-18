Feature: Searching and Browsing Items
    As a user
    I want to be able to search for and browse items
    So I can view the item details

    Rule: Searching for specific items is possible using the search bar. Only results containing the searched query should be displayed

        @search
        Scenario: Searching for a specific item
            Given I am on the homepage
            When I enter <query> into the search bar
            And I click the search button
            Then I see <amount> results
            And each result contains <query> in the product title or description

            Examples:
                | query            | amount |
                | "iPhone"         | 110    |
                | "iPhone 11"      | 3      |
                | "iPhone 11 64GB" | 1      |
                | "horse"          | 0      |

    Rule: Browsing the items is possible by selecting a category, which then displays a list of items contained within

        @browse
        Scenario: Browsing items by category
            Given I am on the homepage
            When I click on the "Electronics" category
            Then I see a list of electronics products