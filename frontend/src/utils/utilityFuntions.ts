import { LatLng } from "leaflet";

export const isPolyLineValid = (latlng: LatLng[]): boolean => latlng.length >= 2;