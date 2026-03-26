
## Description
This lab contains a SQL injection vulnerability in the product category filter. You can use a UNION attack to retrieve the results from an injected query.

To solve the lab, display the database version string.

## Objective

Make the database retrieve the string: '8.0.42-0ubuntu0.20.04.1
## Payload Crafting

`"UNION SELECT @@version, NULL#"`

