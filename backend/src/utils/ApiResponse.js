class ApiResponse {
    constructor(res, statusCode, success, message, data = null, errorMessage = null, respDataType = 'json') {
        this.res = res;
        this.statusCode = statusCode;
        this.success = success;
        this.message = message;
        this.data = data;
        this.errorMessage = errorMessage;
        this.respDataType = respDataType;

        this.sendResponse();
    }

    sendResponse() {
        const response = {
            statusCode: this.statusCode,
            success: this.success,
            message: this.message,
            data: this.data,
            errorMessage: this.errMsg,
            respDataType: this.respDataType
        };

        this.res.status(this.statusCode).json(response); 
    }
}

export default ApiResponse;
