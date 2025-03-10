# API Event Manager

## 📌 Project Description

Event Manager API is a backend application built with **Node.js**, **Express**, and **TypeScript**. The API allows users to manage events, such as role-playing game competitions, by providing functionalities for creating, updating, deleting, and retrieving events and participants.

## 🚀 Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **TypeScript** - Typed JavaScript
- **ESLint & Prettier** - Code linting and formatting
- **Husky & Lint-Staged** - Pre-commit hooks

## 📂 Project Structure

```
📦 api-event-manager
├── 📁 src
│   ├── 📄 app.ts         # Express app initialization
│   ├── 📄 routes.ts      # API routes
│   ├── 📄 controllers    # Business logic
│   ├── 📄 models         # Data structures
│   ├── 📄 middlewares    # Express middlewares
│   ├── 📄 config.ts      # Configuration settings
│   └── 📄 utils          # Utility functions
├── 📄 package.json       # Project dependencies
├── 📄 tsconfig.json      # TypeScript configuration
├── 📄 .eslintrc.json     # ESLint configuration
├── 📄 .prettierrc        # Prettier configuration
└── 📄 README.md          # Project documentation
```

## 🛠 Installation

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
