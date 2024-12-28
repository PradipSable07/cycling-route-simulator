# Route Simulation and Mapping App

This project provides a map-based route simulation and management system, using **Leaflet** for the interactive map and **React** for the frontend. The app allows users to draw routes on the map, simulate travel along these routes, and save/manage the routes with the option of adding metadata (e.g., route name). The components include modal dialogs, route management features, and real-time route simulation.

## Features

- **Interactive Map**: Users can draw custom routes using Leaflet on the map.
- **Route Simulation**: Simulate movement along a drawn route, with adjustable simulation speed for better control of the route's visualization.
- **Route Management**: Add, edit, and manage routes by providing a name and other details for each route.
- **Modal Dialogs**: Users are provided with modal dialogs for creating new routes, editing route information, and confirming actions.
- **Save Routes**: After drawing a route, users can save it to the system and revisit it later.
- **Route Visualization**: Display saved routes on the map and manage multiple routes simultaneously.
- **Dynamic Route Creation**: Users can interactively create and modify routes directly on the map with ease.
- **Responsive UI**: The app is designed to work well on different screen sizes, providing a smooth user experience on both desktop and mobile devices.

## Table of Contents


- [Installation](#installation)
- [Components](#components)
  - [MapComponent](#mapcomponent)
  - [PolylineModal](#polylinemodal)
  - [RouteModal](#routemodal)
  - [RouteSimulation](#routesimulation)
- [Usage](#usage)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)


## Installation

To get started, clone this repository and install the dependencies:

```bash
git clone https://github.com/your-repo/route-simulation-app.git
cd route-simulation-app
npm install
```

Make sure you have Node.js installed. You can download it from nodejs.org.

## Components

### MapComponent

The core component of the app that initializes the interactive map. This component uses Leaflet to render the map and allows users to draw custom routes. Once a route is drawn, a modal dialog will appear to let the user name the route and save it.

### PolylineModal

This modal appears when a user draws a route on the map. It provides the option to name the route and save it or cancel the action. It also shows a loading state when the route is being saved.

### RouteModal

The RouteModal allows users to interact with existing routes, enabling them to add a name, view route details, or cancel the operation.

### RouteSimulation

This component simulates the movement along the drawn route. It gives users control over the simulation speed, allowing them to view the movement along the route at different paces. This feature is useful for visualizing a journey or monitoring specific routes in real-time.

---

## Usage

After setting up the project, run the following command to start the development server:

```bash
npm start
```

The app will be available at <http://localhost:3000>. You can draw routes on the map, simulate travel along those routes, and save or edit your routes through the modal dialogs.

---

## Future Improvements

### Frontend Enhancements

1. Map Interface

- Implement an interactive map view using Mapbox GL JS or Leaflet.
- Create a drawing tool for LineString geometry to plot routes.
- Enable basic map controls (zoom, pan, etc.).
- Provide clear visual feedback during route drawing, including snapping to road data if available.

2.Route Management

- Store route geometry in GeoJSON format for compatibility with various mapping systems.
- Calculate and display route statistics such as distance and estimated time based on user-defined parameters.
- Allow users to save and load routes from the database or local storage.
- Implement basic route validation to ensure drawn routes are feasible (e.g., check if the route forms a valid path).

3.Route Simulation

- Create an animation system that moves a marker along the drawn route.
- Implement play/pause/reset controls for the simulation.
- Add a speed control for the simulation, allowing users to adjust the pace of the simulated journey.
- Display current position metrics during the simulation, such as distance traveled and time elapsed.

4.User Experience

- Improve performance optimization for smooth animation and rendering on different devices.
- Add loading states and error feedback for better UX when saving/loading routes or simulating journeys.

5.Bonus Features

- Add elevation profile visualization to show the terrain along the route.
- Provide route optimization suggestions for cyclists, such as the best paths based on time, distance, or elevation.
- Enable social sharing of routes, allowing users to share their cycling paths with others.
- Implement a Progressive Web App (PWA) version for offline access to saved routes and simulations.

## Technical Specifications

- Frontend:
  - **React** for building the UI.
  - **TypeScript** for type safety and better development experience.
  - **Leaflet** for map rendering.
  - **RxJS** for handling simulation events and managing real-time updates.
  - **Tailwind CSS** for styling the UI.
