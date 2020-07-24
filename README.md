# froggin-api
API run on AWS using Serverless for the Froggin web app.

## DynamoDB Schema
**Users**
|  HASH  |  RANGE |                       |
|--------|--------|-----------------------|
|username|password|   [bcrypt password]   |
|username| colors |[array of owned colors]|
