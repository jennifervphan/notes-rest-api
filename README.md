# Notes REST API

A simple REST API for managing notes using Node.js, Express.js and in-memory storage.

## Features
- **GET /notes** – get all notes
- **POST /notes** – add a new note
- **DELETE /notes/:id** – delete a note

## Getting Started

### Prerequisites

- Node.js 20+
- yarn

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn run dev

# Run tests
yarn run test

# Format and lint
yarn run format
```

## Design decisions
### 1. Express.js with modular architecture
- simple REST API with Express
- modules are separated by domains
- each module is split into architecture layers: controller, service, repository
### 2. No async Operations
- in-memory storage operates synchronously because there are no external http requests or database operations
### 3. Error handling
- use custom error middleware to handle errors
- ensure consistent error responses with correct HTTP status codes, no stack traces exposed in production
### 4. Unit tests
- use Jest for unit tests
- minimal test suite covers ```notes.service.ts```, validating creating a note, getting all notes, deleting a note and handling error cases

## Considerations for production
### 1. Asynchronous Operations
- when migrating to a real database, repository methods will return a Promise since Input/Output operations are asynchronous
- controllers/services will also become async
### 2. Dependency injection
- default parameter injection is used for this app, this approach was chosen because it provides the benefit of dependency injection with a simple solution
- for production, recommending using InversifyJS for better dependency injection
### 3. Authentication & Authorization
- use AWS Cognito for user-based authentication
- user authentication tokens are generated using AWS Cognito JWT token generation
- API Gateway will validate the JWT token and provide the user identity to the Lambda function
- use fine-grained access to ensure users can only access their own notes
### 4. AWS Lambda implementation
- replace Express routes with a Lambda handler
- convert controller methods to be compatible with AWS Lambda handler
- service layer can be kept as it is
### 5. DynamoDB implementation
- current in-memory storage would be replaced with DynamoDB operations in ```notes.repository.ts```

  |             | DynamoDB operation |
    |-------------|--------------------|
  | Create note | PutItem            | 
  | Get notes   | Scan / Query       |
  | Delete note | DeleteItem         |

- additional features in production:
  - query and sort support for efficient data retrieval
  - support pagination for large datasets
  - support caching for frequently accessed data
### 6. Additional tests
- integration tests to test how components work together (e.g., controller - service - repository)
- end-to-end tests to test the complete user flow from HTTP request to auth to database and back, it would require a real database on a test environment
### 7. Logging & monitoring
- add logging with a structured logging library (e.g., winston)
- add middleware for request logging to log all requests
- add integration with an Application Performance Monitoring system
### 8. Healthcheck
- could expand to database check, memory usage
### 9. Documentation
- OPENAPI/Swagger documentation
- Postman collection to be shared between developers and teams
- Architecture Decision Records for major decisions
- Diagram of the application architecture