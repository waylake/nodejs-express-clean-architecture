# Project Structure and Implementation Details

## Overview

This project implements a Clean Architecture-based Express.js application with TypeScript. It provides authentication functionality including user registration, login, token refresh, and logout. The application uses MongoDB for data persistence and Redis for caching.

## Project Structure

```mermaid
graph TD
    A[src] --> B[domain]
    A --> C[infrastructure]
    A --> D[interfaces]
    A --> E[types]
    B --> B1[entities]
    B --> B2[errors]
    B --> B3[interfaces]
    B --> B4[usecases]
    C --> C1[auth]
    C --> C2[cache]
    C --> C3[config]
    C --> C4[database]
    C --> C5[express]
    C --> C6[logging]
    C --> C7[repositories]
    C --> C8[swagger]
    D --> D1[controllers]
    D --> D2[presenters]
    E --> E1[reflect-metadata.d.ts]
```

## Architecture

The project follows Clean Architecture principles, separating concerns into different layers:

1. **Domain Layer** (`src/domain`): Contains business logic, entities, and use cases.
2. **Infrastructure Layer** (`src/infrastructure`): Handles external concerns like databases, caching, and framework setup.
3. **Interface Layer** (`src/interfaces`): Manages the presentation of data and user interactions.

## Key Components

### Domain Layer

1. **Entities**: Define the core business objects (e.g., User).
2. **Use Cases**: Implement application-specific business rules.
3. **Interfaces**: Define contracts for repositories and other dependencies.

### Infrastructure Layer

1. **Auth**: Handles JWT token generation and verification.
2. **Cache**: Manages Redis connection and operations.
3. **Config**: Stores application configuration.
4. **Database**: Manages MongoDB connection.
5. **Express**: Sets up the Express application and server.
6. **Logging**: Configures application logging.
7. **Repositories**: Implements data access logic.
8. **Swagger**: Configures API documentation.

### Interface Layer

1. **Controllers**: Handle HTTP requests and responses.
2. **Presenters**: Format data for presentation to the client.

## Data Flow

```mermaid
sequenceDiagram
    participant Client
    participant Controller
    participant UseCase
    participant Repository
    participant Database

    Client->>Controller: HTTP Request
    Controller->>UseCase: Execute business logic
    UseCase->>Repository: Fetch/Store data
    Repository->>Database: Query/Update
    Database-->>Repository: Result
    Repository-->>UseCase: Data
    UseCase-->>Controller: Result
    Controller->>Client: HTTP Response
```

## Dependency Injection

The project uses InversifyJS for dependency injection. The container is configured in `src/infrastructure/config/inversify.config.ts`.

```mermaid
graph TD
    A[Inversify Container] --> B[UseCases]
    A --> C[Repositories]
    A --> D[Controllers]
    A --> E[Presenters]
    B --> C
    D --> B
    D --> E
```

## Error Handling

Custom errors are defined in `src/domain/errors/CustomError.ts`. The application uses a global error handler middleware to catch and format errors consistently.

## API Documentation

Swagger is used for API documentation. The configuration is in `src/infrastructure/swagger/swagger.ts`, and individual API definitions are in YAML files under `src/infrastructure/swagger/definitions/`.

## Testing

Jest is used for unit testing. Test files are located next to the files they test with a `.test.ts` extension.

## Build and Deployment

The project uses TypeScript for development and is compiled to JavaScript for production. The build process includes:

1. TypeScript compilation
2. Copying of non-TypeScript files (e.g., Swagger YAML files)

Docker is used to set up development dependencies (MongoDB and Redis).

```mermaid
graph TD
    A[Source Code] --> B[TypeScript Compiler]
    B --> C[JavaScript Output]
    A --> D[File Copier]
    D --> E[Non-TS Files]
    C --> F[Dist Folder]
    E --> F
    F --> G[Node.js Runtime]
```

This structure allows for a clear separation of concerns, making the codebase more maintainable and testable. The use of dependency injection further enhances the modularity of the application.
