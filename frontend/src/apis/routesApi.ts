import axios from "axios";
import { SaveRouteReqData } from "../utils/types/AllTypes";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

 export const getAllRoutes = async () => {
	try {
		const response = await axios.get(`${BACKEND_URL}/routes`);

        // console.log('== Raw Response from getAllRoutes() ==',response.data);
		return response.data;
	} catch (error) {
        throw error;
    }
};


export const getRouteById = async (routeId:number) => {
	try {
		const response = await axios.get(`${BACKEND_URL}/routes/${routeId}`);
		console.log('== Raw Response from getRouteById() ==',response.data);
		return response.data;
	} catch (error) {
		throw error;
	}
};

export const createRoute = async(newRoute:SaveRouteReqData) => {
	try{
		const response = await axios.post(`${BACKEND_URL}/routes/`, newRoute, {
			headers: { "Content-Type": "application/json" },
		});
		console.log('== Raw Response from createRoute() ==',response.data);
		return response.data;
	}catch(error){
		throw error;
	}
}


// export const updateRoute = async(routeId) => {
// 	try{
// 		const response = await axios.put(`${BACKEND_URL}/routes/${routeId}`);
// 		console.log('== Raw Response from deleteRoute() ==',response.data);
// 		return response.data;
// 	}catch(error){
// 		throw error;
// 	}
// }
export const deleteRoute = async(routeId:number) => {
	try{
		const response = await axios.delete(`${BACKEND_URL}/routes/${routeId}`);
		console.log('== Raw Response from deleteRoute() ==',response.data);
		return response.data;
	}catch(error){
		throw error;
	}
}