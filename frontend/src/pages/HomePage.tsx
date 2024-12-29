import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import MapComponent from "../components/MapComponent";
import { useMapContext } from "../context/MapContext.tsx";
import { CgClose, CgSpinner } from "react-icons/cg";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Route, SaveRouteReqData } from "../utils/types/AllTypes.ts";
import PolylineModal from "../components/Modal.tsx";
import UserRoutes from "../components/UserRoutes.tsx";
import L from "leaflet";
import RouteSimulations from "../components/RouteSimulations.tsx";
import { TbRouteSquare } from "react-icons/tb";

import { createRoute, deleteRoute, getAllRoutes } from "../apis/routesApi.ts";
// import {getAllRoutes} from '../apis/routesApi.js';

const HomePage: React.FC = () => {
	const queryClient = useQueryClient();

	// Local states
	const [showSavedRoutesMenu, setShowSavedRoutesMenu] = useState(false);
	const routeNameRef = useRef<HTMLInputElement | null>(null);
	const polyLinesRef = useRef<L.Polyline[]>([]);
	const {
		savedRoutes,
		setSavedRoutes,
		tempRoute,
		setTempRoute,
		setShowAddRouteModal,
		selectedRoute,
		setSelectedRoute,
		mapInstanceRef,
		markerRef,
	} = useMapContext();

	//  Get all routes
	const { data: savedRoutesData, isLoading: GetAllRoutesLoading } = useQuery({
		queryKey: ["savedRoutes"],
		queryFn: getAllRoutes,
		refetchOnWindowFocus: false,
	});
	useEffect(()=>{
		if(savedRoutesData){
			// console.log(savedRoutesData.data, '== Saved Data from  Routes ==')
			toast.success(savedRoutesData?.message, { duration: 1000 });
			setSavedRoutes(savedRoutesData?.data)

		}
	},[savedRoutesData])

	// Mutation to add a route
	const addRouteMutation = useMutation({
		mutationFn: (routeData: SaveRouteReqData) => createRoute(routeData),
		onSuccess: () => {
			toast.success("Route added successfully!");
			queryClient.invalidateQueries({ queryKey: ["savedRoutes"] });
			setTempRoute(null);
			setShowAddRouteModal(false);
		},
		onError: (error) => {
			toast.error(error.message || "Failed to add route");
		},
	});

	// Mutation to delete a route
	const deleteRouteMutation = useMutation({
		mutationFn: (routeId:number) => deleteRoute(routeId ),
		onSuccess: () => {
			toast.success("Route deleted successfully!");
			queryClient.invalidateQueries({ queryKey: ["savedRoutes"] });
		},
		onError: (error: { message: any }) => {
			toast.error(error.message || "Failed to delete route");
		},
	});

	useEffect(() => {
		if (savedRoutes) {
			drawSavedRoutes();
		}
	}, [savedRoutes]);
	//  draw Saved Routes on the map logic
	function drawSavedRoutes() {
		// console.log(savedRoutes, "== Saved Data from  Routes ==");

		//  Clear previous polylines
		if (polyLinesRef.current) {
			polyLinesRef.current.forEach((polyline) => {
				if (mapInstanceRef.current) {
					mapInstanceRef.current.removeLayer(polyline);
				}
			
			});
			polyLinesRef.current.length = 0;
		}
		// Draw new polylines
		savedRoutes.forEach((route) => {
			const geometry = route.geometry as unknown as { type: string; coordinates: number[][] };;
			const coordinates = geometry?.coordinates?.map(([lat, lng]) => [lat, lng]); 
			
			// console.log('cordinates',coordinates)
			
			if (mapInstanceRef.current && coordinates) {
				const polyline = L.polyline(coordinates as [number, number][], {
				  color: "blue",
				  weight: 3,
				}).addTo(mapInstanceRef.current);
				// Store the polyline in the refs
				polyLinesRef.current.push(polyline); 
				
			  }
		});
	}

	// Handle adding a route
	const handleAddRoute = () => {
		const routeName = routeNameRef.current?.value?.trim();
		if (!routeName) {
			toast.error("Please provide a name for the route.");
			return;
		}
		if (!tempRoute?.latlng) {
			toast.error("Please draw a route on the map.");
			return;
		}

		const coordinates = tempRoute.latlng.map(({ lat, lng }) => [lat, lng]);
		const newRoute = {
			userId: 1, // Example user ID
			name: routeName,
			geometry: {
				type: "LineString",
				coordinates,
			},
		};
		// console.log(newRoute, '== New Route ==')
		addRouteMutation.mutate(newRoute);
	};

	// Cancel adding a route
	const handleCancelRoute = () => {
		setShowAddRouteModal(false);
		setTempRoute(null);
	};

	// Handle deleting a route
	const handleDeleteRoute = (routeId: number) => {
		deleteRouteMutation.mutate(routeId);
	};

	
	const handlePan = (routeId: number) => {
		const routeToPan = savedRoutes.find(
		  (route: { id: number }) => route.id === routeId
		) as Route | undefined;
	  
		if (!routeToPan) {
		  toast.error("Route not found.");
		  return;
		}
		console.log("Marker ", markerRef);
				if (markerRef.current) {
					markerRef.current.remove();
					markerRef.current = null;
				}
	  
		const coordinates: [number, number][] = routeToPan?.geometry?.coordinates as [number, number][] ?? [0,0]; 
		// console.log("coordinates",coordinates)
		if (mapInstanceRef.current instanceof L.Map && coordinates) {
		  mapInstanceRef.current.panTo( coordinates[0]); 
		//   console.log("routeToPan", routeToPan)
		const initialMarker = L.marker(coordinates[0]).addTo(
							mapInstanceRef.current
						);
						markerRef.current = initialMarker;
		  setSelectedRoute(routeToPan);
		} else {
		  toast.error("Unable to pan to the selected route.");
		}
	  };


	return (
		<>
			<MapComponent />
			{GetAllRoutesLoading ? (
				<CgSpinner className='absolute z-30 text-3xl top-1/2 left-1/2 animate-spin' />
			) : null}

			<PolylineModal
				routeNameRef={routeNameRef}
				handleAddRoute={handleAddRoute}
				handleCancelRoute={handleCancelRoute}
				saveRouteLoading={addRouteMutation.isPending}
			/>

			<UserRoutes
				setShowSavedRoutesMenu={setShowSavedRoutesMenu}
				showSavedRoutesMenu={showSavedRoutesMenu}
				savedRoutes={savedRoutesData?.data || {}}
				handleDeleteRoute={handleDeleteRoute}
				handlePanToRoute={handlePan}
			/>

			<button
				type='button'
				className='absolute z-50 inline-flex items-center p-2 text-sm font-semibold leading-4 text-white border border-transparent rounded-full shadow-inner bg-violet-400 top-3 right-5 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
				onClick={() => setShowSavedRoutesMenu(!showSavedRoutesMenu)}>
				{!showSavedRoutesMenu && <TbRouteSquare className='text-2xl' />}
				{showSavedRoutesMenu && <CgClose />}
			</button>

			{selectedRoute && (
				<RouteSimulations
					routeGeoJSON={selectedRoute.geometry}
					setSelectedRoute={setSelectedRoute}
				/>
			)}
		</>
	);
};

export default HomePage;
