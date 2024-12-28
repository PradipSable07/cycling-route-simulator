import { LayerGroup } from "leaflet";
import { Map } from "leaflet";

export interface TemporaryRoute {
	layer: L.Layer | null;
	latlng: L.LatLng[] | null;
	polyline: L.Polyline | null | L.Layer;
}
 export type MapInstanceType= Map | LayerGroup<any> | null;
export interface Geometry {
	type: string;
	coordinates: number[][];
}

export interface SaveRouteReqData {
	userId: number;
	name: string;
	geometry: {
	  type: string;
	  coordinates: number[][];
	};
  }
export interface Route {
	id: number;
	user_id: number;
	name: string;
	geometry:{
		type: string;
		coordinates: number[][];
	  };
	distance: number;
	created_at: string;
	updated_at: string;
}

export interface ApiResponse {
    statusCode: number;
    success: boolean;
    message: string;
    data: string; 
    respDataType: string;
    errMsg: string | null;
}

export interface SaveRouteReqData {
    userId: number,
    name: string,
    geometry: Geometry,
}

