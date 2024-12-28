# Route Simulation and Management App

This project provides a comprehensive route simulation and management system, allowing users to draw, manage, and simulate routes on an interactive map. The system consists of a frontend built with React and Leaflet for interactive mapping, and a backend built with Node.js, Express, PostgreSQL, and Redis for data management and real-time simulation features.

## Problem Statement

The goal of this project is to create an interactive application where users can plot cycling routes, simulate their journey along those routes in real-time, and save or manage the routes for future use. The backend handles route data storage, simulation control, and live updates, while the frontend provides a user-friendly interface for drawing routes and simulating travel.

## Features

### Frontend

- **Interactive Map**: Draw routes using Leaflet and visualize them on the map.
- **Route Simulation**: Simulate movement along a drawn route with adjustable speeds.
- **Route Management**: Add, edit, and save routes with metadata (e.g., route name).
- **Modal Dialogs**: Modal windows for creating, editing, and managing routes.
- **Responsive UI**: Tailwind CSS ensures a smooth experience on both desktop and mobile devices.

### Backend

- **CRUD Operations**: Manage cycling routes with full Create, Read, Update, Delete functionality.
- **Simulation Control**: Start, pause, reset, and get the status of route simulations.
- **Real-time Updates**: Using Redis and WebSocket (Socket.IO) for live route simulation and updates.
- **Error Handling**: Centralized error handling with detailed responses for better debugging.

## Table of Contents

- Installation
- Frontend Setup
- Backend Setup
- API Endpoints
- Usage
- Folder Structure
- Future Improvements

## Installation

### Frontend Setup

1.Clone the repository:

```bash
git clone https://github.com/your-repo/route-simulation-app.git
cd route-simulation-app
```

2.Install dependencies:

```bash
npm install
```

3.Run the frontend server:

```bash
npm start
```

The app will be available at *```http://localhost:5173```*.

### Backend Setup

1.Clone the backend repository:

```bash
git clone https://github.com/your-repo/cycling-routes-backend.git
cd cycling-routes-backend
```

2.Install dependencies:

```bash
npm install
```

3.Set up the database and environment variables by creating a .env file and running:

```bash
npm run create-schema
```

4.Run the backend server:

```bash
npm start
```

The backend will run on *```http://localhost:3000```*.

## API Endpoints

### Routes Management

- **GET** *` ``/api/routes```*: Fetch all routes.
- **POST** *```/api/routes```*: Create a new route.
- **GET** *```/api/routes/:id```*: Fetch a route by ID.
- **PUT** *```/api/routes/:id```*: Update a route by ID.
- **DELETE** *```/api/routes/:i```d:* Delete a route by ID.

### Simulation Management

- **POST** *```/api/simulate/start```*: Start a simulation.
- **POST** *```/api/simulate/pause```*: Pause the simulation.
- **POST** *```/api/simulate/reset```*: Reset the simulation.
- **GET** *```/api/simulate/status```*: Get the simulation status.

## Usage

After setting up both the frontend and backend, you can:
1.Draw Routes: Use the frontend map to plot routes interactively.
2.Simulate Routes: Control and visualize the simulation of your route.
3.Manage Routes: Save, edit, and delete routes.
4.Real-time Updates: See simulation updates and status in real-time through the backend.

## Future Improvements

### Frontend Enhancements

- Advanced Simulation: Improve simulation with more granular control, including stop-and-go functionality.
- Route Analytics: Add features for showing distance, time, and elevation statistics.
- User Authentication: Implement user accounts to save routes and simulations to a personal dashboard.

### Backend Enhancements

- Route Optimization: Implement algorithms for route optimization (e.g., shortest path, least elevation gain).
- Data Caching: Use Redis to cache route data for faster access.
- Improved Real-time Simulation: Optimize WebSocket communication for even smoother real-time updates.

## Folder Structure

### Front-end

```bash
src/
├── apis/                     
│   ├── routesApi.ts          
│   └── simulationApi.ts      
├── assets/                   
├── components/               
│   ├── MapComponent.tsx      
│   ├── RouteModal.tsx        
│   ├── Modal.tsx             
│   ├── RouteSimulations.tsx  
│   └── UserRoutes.tsx        
├── context/                  
├── pages/                    
│   └── HomePage.tsx          
├── utils/                    
│   ├── types/
│   │   └── AllTypes.ts       
│   └── utilityFunctions.ts   
├── App.tsx                   
├── App.css                   
├── index.css                 
└──  main.tsx                  

```

### Back-end

```bash
src/
├── controllers/
│   ├── routesController.js
│   └── simulateController.js
├── middlewares/
│   └── errorHandler.js
├── models/
│   ├── routesModel.js
│   └── simulationModel.js
├── routers/
│   ├── routesRouter.js
│   └── simulationRouter.js
├── utils/
│   ├── apiResponse.js
│   └── redis.js
├── server.js
```
