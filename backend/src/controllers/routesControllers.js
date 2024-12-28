import {createRoute,getAllRoutes,getRouteById,updateRoute,deleteRoute} from "../models/routesModel.js";
import ApiResponse from "../utils/ApiResponse.js"
const createNewRoute = async (req, res, next) => {
    try {
        const data = req.body;
        
        // Validate required fields
        if (!data.userId || !data.name || !data.geometry) {
            return new ApiResponse(res, 400, false, 'Missing required fields (User Id, Name, and Geometry).');
        }
        
        // Insert Route into DB
        const insertResponse = await createRoute(data);
        
        return new ApiResponse(
            res,
            201,
            true,
            'Successfully saved route.',
            insertResponse?.rows[0]
        );
    } catch (error) {
        next(error);
    }
};

const getAllRoutesHandler = async (req, res, next) => {
    try {
        const result = await getAllRoutes(); // Fetch data from the database
        console.log(result, '== Raw Response from getAllRoutes() =='); // Debug log
        
        const routes = result?.rows; // Extract the rows property
        console.log( '== Extracted Routes ==', routes); // Debug log

        if (!routes || routes.length === 0) {
            return new ApiResponse(res, 400, false, 'No routes found.');
        }
        
        const parsedRoutes = routes.map(route => ({
            ...route,
            geometry: JSON.parse(route.geometry) // Convert geometry from string to JSON
        }));
        new ApiResponse(res, 200, true, 'All Routes.', parsedRoutes);
    } catch (error) {
        next(error);
    }
};
// Get Route by ID
const getRouteByIdHandler = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id) {
            return new ApiResponse(res, 400, false, 'Please provide a valid route id.');
        }

        const route = await getRouteById(id);

        // Debug log
        console.log('== Debug: Route Object ==', route);

        // Check if rows are present
        const routeData = route?.rows;
        if (!routeData || routeData.length === 0) {
            return new ApiResponse(res, 400, false, 'No routes found.');
        }

        // Parse the geometry field
        if (routeData[0]?.geometry) {
            routeData[0].geometry = JSON.parse(routeData[0].geometry);
        } else {
            return new ApiResponse(res, 400, false, 'Geometry data is missing.');
        }

        new ApiResponse(res, 200, true, 'Successful.', routeData[0]);
    } catch (error) {
        next(error);
    }
};

const updateRouteHandler = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!Number.isInteger(Number(id))) {
            return new ApiResponse(res, 400, false, 'Please provide a valid route id.');
        }

        const data = req.body;

        // Validate required fields
        if (!data.name || !data.geometry) {
            return new ApiResponse(res, 400, false, 'Missing required fields (Name and Geometry).');
        }

        const result = await updateRoute(data, Number(id));
        
        if (!result.rows || result.rows.length === 0) {
            return new ApiResponse(res, 400, false, 'No routes found.');
        }

        const updatedRoute = result.rows[0];
        
        // Parse the geometry field to JSON
        updatedRoute.geometry = JSON.parse(updatedRoute.geometry);

        new ApiResponse(res, 200, true, 'Update successful.', updatedRoute);
    } catch (error) {
        console.error('== Global Error Handler ==', error);
        next(error);
    }
};
// Delete Route
const deleteRouteHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        // Validate ID
        if (!Number.isInteger(Number(id))) {
            return new ApiResponse(res, 400, false, 'Please provide a valid route id.');
        }
        
        const deleteResp = await deleteRoute(id);
        
        if (deleteResp?.length === 0) {
            return new ApiResponse(res, 400, false, 'No routes found.');
        }
        
        new ApiResponse(res, 200, true, 'Delete successful.', deleteResp[0]);
    } catch (error) {
        next(error);
    }
};

export { createNewRoute, getAllRoutesHandler, getRouteByIdHandler, updateRouteHandler, deleteRouteHandler };