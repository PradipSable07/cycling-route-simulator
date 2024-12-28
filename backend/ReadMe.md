# Cycling Routes Backend

This project is a backend application for managing and simulating cycling routes. It is built with *Node.js* and *Express*, using *PostgreSQL* as the database and *Redis* for real-time state management. *WebSocket* communication is integrated with Socket.IO for live updates.

---

## Features

- CRUD operations for managing cycling routes.
- Simulation functionality with pause, reset, and live status updates.
- Real-time communication using WebSocket.
- API structure for modularity and scalability.
- Error handling with a structured response format.

---

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Folder Structure](#folder-structure)
- [API Endpoints](#api-endpoints)
- [Simulation Workflow](#simulation-workflow)
- [Error Handling](#error-handling)

---

## Installation

1.Clone the repository:

```bash
   git clone https://github.com/your-repo/cycling-routes-backend.git
   cd cycling-routes-backend
 ```

2.Install dependencies:

```bash
    npm install
```

3.Set up the database using the provided schema:

```bash
npm run create-schema
```

## Environment Variables

Create a .env file in the root directory using the .env.example template:

```bash
PORT=3000
DATABASE_URL="postgres://postgres:{your_password}@localhost:5432/cycling_routes?schema=public"
```

## Scripts

- Start server: npm start
- Start server in development mode: npm run dev
- Create database schema: npm run create-schema

## Folder Structure

```bash
src/
├── controllers/
│   ├── routesControllers.js
│   ├── simulateControllers.js
├── middlewares/
│   └── errorHandler.js
├── models/
│   ├── routesModel.js
│   └── simulationModel.js
├── routers/
│   ├── index.js
│   ├── routesRouter.js
│   └── simulationRouter.js
├── utils/
│   ├── ApiResponse.js
│   ├── createSchema.js
│   ├── db.js
│   └── redis.js
├── server.js
```

- **server.js**: Entry point of the application.
- **routers/index.js**: Main router combining all sub-routes.
- **controllers:** Handles business logic for routes and simulations.
- **utils**: Utility files for reusable components like ApiResponse.

## API Endpoints

### Routes Management

- **GET** *```/api/routes```*: Fetch all routes.
- **POST** *```/api/routes```*: Create a new route.
- **GET**  *```/api/routes/:id```*: Fetch a route by ID.
- **PUT** *```/api/routes/:id```*: Update a route by ID.
- **DELETE** *```/api/routes/:id```*: Delete a route by ID.

### Simulation Management

- **POST** *```/api/simulate/start```*: Start a simulation.
- **POST** *```/api/simulate/pause```*: Pause the simulation.
- **POST** *```/api/simulate/reset```*: Reset the simulation.
- **GET** *```/api/simulate/status```*: Get the simulation status.

## Simulation Workflow

1. **Start Simulation**: POST /api/simulate/start with a route array to begin.
2. **Pause Simulation**: Pause the running simulation using /api/simulate/pause.
3. **Reset Simulation**: Reset the state using /api/simulate/reset.
4. **Check Status**: Use /api/simulate/status to get the current simulation state.

## Error Handling

All errors are handled centrally using the errorHandler middleware. The response follows this structure:

```bash
{
  "statusCode": 400,
  "success": false,
  "message": "Error message",
  "data": null,
  "errorMessage": "Detailed error description"
}
```

- **File**: errorHandler.js
