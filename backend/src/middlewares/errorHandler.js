import ApiResponse from '../utils/ApiResponse.js';

const errorHandler = (err, req, res, next) => {
    // Log the full error stack for debugging 
    console.error(err.stack);

    // If the error has a custom message, log it (this could be useful for specific errors)
    console.log(err.msg || 'Unknown error', '== Global Error Handler ==');

    // Default status code is 500 for server errors
    const statusCode = err.statusCode || 500;

    // Return a structured error response using the ApiResponse class
    return new ApiResponse(
        res,
        statusCode,
        false,
        'Server error', 
        null,            
        err.message || 'Internal Server Error' 
    );
};

export default errorHandler;
