import React, { useEffect, useRef } from "react";
import L, { Map, Polyline } from "leaflet";
import "leaflet-draw/dist/leaflet.draw.css";
import "leaflet-draw/dist/leaflet.draw.js";
import "leaflet/dist/leaflet.css";
// import { TemporaryRoute } from "../utils/types/AllTypes.ts";
import { useMapContext } from "../context/MapContext.tsx";
import { isPolyLineValid } from "../utils/utilityFuntions.ts";

// interface MapComponentProps {
// 	setTempRoute: React.Dispatch<React.SetStateAction<TemporaryRoute | null>>;
// 	setShowAddRouteModal: React.Dispatch<React.SetStateAction<boolean>>;
// }

const MapComponent: React.FC = () => {
	const mapContainerRef = useRef<HTMLDivElement>(null);
	// const mapInstanceRef = useRef<Map | null>(null);
	const { setTempRoute, mapInstanceRef, setShowAddRouteModal } =
		useMapContext();

	useEffect(() => {
		if (mapContainerRef.current && !mapInstanceRef.current) {
			// Initialize the map only if not already created
			mapInstanceRef.current = L.map(mapContainerRef.current).setView(
				[19.082190306200502, 73.01470036106402], // Initial center
				17 // Initial zoom
			);

			

			// Add the base layer
			L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
				mapInstanceRef.current
			);

			const drawnItems = new L.FeatureGroup();
			mapInstanceRef.current.addLayer(drawnItems);

			// Add draw controls
			const drawControl = new L.Control.Draw({
				draw: {
					polygon: false,
					rectangle: false,
					circle: false,
					marker: false,
					circlemarker: false,
				},
				edit: {
					featureGroup: drawnItems,
					remove: false,
				},
			});
			mapInstanceRef.current.addControl(drawControl);

			mapInstanceRef.current.on("draw:created", (e: any) => {
				const layer = e.layer;
				layer.setStyle({ color: "indigo", weight: 2 });

				const latlng = layer.getLatLngs();

				if (isPolyLineValid(latlng)) {
					const polyline: Polyline = L.polyline(latlng).addTo(
						mapInstanceRef.current!
					);
					setTempRoute({ layer, latlng, polyline }); // Set temp route in context
					setShowAddRouteModal(true); // Show the modal
				}
			});
		}

		// Cleanup function to remove the map instance when the component unmounts
		return () => {
			if (mapInstanceRef.current) {
				mapInstanceRef.current.remove();
				mapInstanceRef.current = null;
			}
		};
	}, [mapContainerRef, mapInstanceRef, setTempRoute, setShowAddRouteModal]);

	return (
		<div
			ref={mapContainerRef}
			className='z-0 w-full h-screen'
			></div>
	);
};

export default MapComponent;
