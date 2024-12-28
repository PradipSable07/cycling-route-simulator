import axios from "axios";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

 export const startSimulation = async () => {
	try {
		const response = await axios.post(`${BACKEND_URL}/simulation/start`);

        console.log('== Raw Response from getAllRoutes() ==',response.data);
		return response.data;
	} catch (error) {
        throw error;
    }
};
 export const pauseSimulation = async () => {
	try {
		const response = await axios.post(`${BACKEND_URL}/simulation/pause`);

        console.log('== Raw Response from getAllRoutes() ==',response.data);
		return response.data;
	} catch (error) {
        throw error;
    }
};
 export const resetSimulation = async () => {
	try {
		const response = await axios.post(`${BACKEND_URL}/simulation/reset`);

        console.log('== Raw Response from getAllRoutes() ==',response.data);
		return response.data;
	} catch (error) {
        throw error;
    }
};
 export const statusSimulation = async () => {
	try {
		const response = await axios.post(`${BACKEND_URL}/simulation/status`);

        console.log('== Raw Response from getAllRoutes() ==',response.data);
		return response.data;
	} catch (error) {
        throw error;
    }
};
