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

### Install dependencies

```sh
npm install
```

### Run the server

```sh
npm run start
```

## 🔥 API Endpoints

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| GET    | `/events`     | Get all events     |
| POST   | `/events`     | Create a new event |
| GET    | `/events/:id` | Get event details  |
| PUT    | `/events/:id` | Update an event    |
| DELETE | `/events/:id` | Delete an event    |
