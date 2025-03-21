# API Event Manager

## 📌 Project Description

Event Manager API is a backend application built with Node.js, Express, and TypeScript. The API allows users to manage events, such as role-playing game competitions, by providing functionalities for creating, updating, deleting, and retrieving events and participants.

## 🚀 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Typed JavaScript
- **ESLint & Prettier** - Code linting and formatting
- **Husky & Lint-Staged** - Pre-commit hooks

## 📂 Project Structure

```
📦 api-event-manager
├── 📁 postman           # Postman test files
│   ├── 📄 tests.events.json
│   ├── 📄 tests.users.json
├── 📁 prisma            # Prisma ORM configuration
│   ├── 📁 migrations    # Database migrations folder
│   ├── 📄 schema.prisma # Prisma schema definition
├── 📁 src               # Main source code
│   ├── 📁 controllers   # Business logic for endpoints
│   ├── 📁 entities      # Entity/model definitions
│   ├── 📁 middlewares   # Express middleware
│   ├── 📁 repositories  # Database access management
│   ├── 📁 routes        # API route definitions
│   ├── 📁 schemas       # Data validation
│   ├── 📁 services      # Business services
│   ├── 📄 app.ts        # Express application initialization
│   ├── 📄 prismaClient.ts # Prisma client for DB connection
│   ├── 📄 swaggerConfig.ts # Swagger configuration for API documentation
├── 📄 .env-example      # Example environment file
├── 📄 package.json      # Project dependencies
└── 📄 tsconfig.json     # TypeScript configuration
```

## 🛠 Installation

In first, environments variables

```sh
cp .env-example .env
```

### With NPM and Docker

Run the postgres service

```sh
docker compose up -d --build db
```

Install the dependencies

```sh
npm install
```

Connect and setup the prisma ORM with the bdd

```sh
npm run setup_prisma
```

Run the Express API

```sh
npm run start
```

### CMD Docker

Run the project ONLY with docker

```sh
docker compose up --build -d
```

Connect to the Express service

```sh
docker compose exec -it api sh
```

Connect to the Postgresql service

```sh
docker compose exec db psql -U postgres -d event_manager
```

## 🔥 API Documentation

You can access to the swagger of the API with this link:
[http://localhost:3000/docs/](http://localhost:3000/docs/)

> The API need to be started
