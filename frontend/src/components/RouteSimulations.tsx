import React, { useEffect, useRef, useState } from "react";
import { Route } from "../utils/types/AllTypes.ts";
import L from "leaflet";
import { toast } from "sonner";
import { useMapContext } from "../context/MapContext.tsx";
import { RiResetLeftLine } from "react-icons/ri";
import { MdMotionPhotosPause, MdNotStarted } from "react-icons/md";
import { BsSpeedometer } from "react-icons/bs";

interface RouteSimulationProps {
	routeGeoJSON: any;
	setSelectedRoute: React.Dispatch<React.SetStateAction<Route | null>>;
}

const RouteSimulations: React.FC<RouteSimulationProps> = ({ routeGeoJSON }) => {
	const [simulationRunning, setSimulationRunning] = useState(false);
	const [isSimulationPaused, setSimulationPaused] = useState(false);
	const [currentStep, setCurrentStep] = useState(0);
	const [remainingDistance, setRemainingDistance] = useState(0);
	const { mapInstanceRef,speed,markerRef } = useMapContext();
	const previousRoute = useRef(routeGeoJSON); // Track the previous route
	

	// Parse coordinates
	const routeCoordinates = routeGeoJSON?.coordinates?.map(
		([lat, lng]: [number, number]) => [lat, lng]
	);

	// Calculate distance between two coordinates
	const calculateDistance = (
		[lat1, lng1]: [number, number],
		[lat2, lng2]: [number, number]
	) => {
		const toRad = (x: number) => (x * Math.PI) / 180;
		const R = 6371; // Earth's radius in km
		const dLat = toRad(lat2 - lat1);
		const dLng = toRad(lng2 - lng1);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(lat1)) *
				Math.cos(toRad(lat2)) *
				Math.sin(dLng / 2) *
				Math.sin(dLng / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c; // Distance in km
	};

	const calculateTotalDistance = (step = 0) => {
		if (!routeCoordinates || routeCoordinates.length < 2) return 0;
		return routeCoordinates
			.slice(step)
			.reduce(
				(
					total: number,
					coord: [number, number],
					index: number,
					arr: [number, number][]
				) => {
					if (index === 0) return total;
					return total + calculateDistance(arr[index - 1], coord);
				},
				0
			);
	};
	// Initial setup for marker and total distance
	useEffect(() => {
		if (routeGeoJSON !== previousRoute.current) {
			//  Update the previous route
			setSimulationPaused(false);
			setSimulationRunning(false);
			setCurrentStep(0);
			setRemainingDistance(calculateTotalDistance());
			previousRoute.current = routeGeoJSON;

			if (mapInstanceRef.current instanceof L.Map && routeCoordinates?.length) {
				console.log("Marker ", markerRef);
				if (markerRef.current) {
					markerRef.current.remove();
					markerRef.current = null;
				}

				const initialMarker = L.marker(routeCoordinates[0]).addTo(
					mapInstanceRef.current
				);
				markerRef.current = initialMarker;
				console.log("Marker initialized:", markerRef.current);
				// Set initial distance
				setRemainingDistance(calculateTotalDistance());
				toast("Route changed. Simulation reset.");
			}
		}
	}, [routeGeoJSON]);

	// Simulate step
	const simulateStep = (step: number) => {
		if (markerRef.current && step < routeCoordinates.length) {
			markerRef.current.setLatLng(routeCoordinates[step]);
			if (mapInstanceRef.current instanceof L.Map) {
				mapInstanceRef.current.panTo(routeCoordinates[step]);
			}

			// Update remaining distance
			const distanceCovered =
				calculateTotalDistance() - calculateTotalDistance(step);
			setRemainingDistance(distanceCovered);

			// Update current step
			setCurrentStep(step);
		}
	};

	// Simulation effect
	useEffect(() => {
		let interval: NodeJS.Timeout | null = null;

		if (simulationRunning && !isSimulationPaused) {
			let step = currentStep;

			interval = setInterval(() => {
				if (step < routeCoordinates.length) {
					simulateStep(step);
					step++;
				} else {
					clearInterval(interval!);
					setSimulationRunning(false);
					toast.success("Destination completed!");
				}
			}, Number(speed)*100);
		}

		return () => {
			if (interval) clearInterval(interval);
		};
	}, [simulationRunning, isSimulationPaused, speed, currentStep]);

	const startSimulation = () => {
		if (!routeCoordinates?.length) {
			toast.error("No route coordinates available to simulate.");
			return;
		}
		toast("Starting Route...");
		setSimulationRunning(true);
		setSimulationPaused(false);
	};

	const pauseSimulation = () => {
		setSimulationRunning(false);
		setSimulationPaused(true);
		toast("Route paused.");
	};

	const resetSimulation = () => {
		setSimulationRunning(false);
		setSimulationPaused(false);
		setCurrentStep(0);
		setRemainingDistance(calculateTotalDistance());
		if (markerRef.current) {
			markerRef.current.setLatLng(routeCoordinates[0]);
			if (mapInstanceRef.current instanceof L.Map) {
				mapInstanceRef.current.setView(
					routeCoordinates[0],
					mapInstanceRef.current.getZoom()
				);
			}
		}
		toast("Route reset.");
	};

	return (
		<div className='flex flex-col '>
			
			<div className='top-[13rem] left-2 absolute bg-glass flex justify-center items-center  text-2xl  text-gray-600 flex-col'>
				<button
					className={`p-2 ${simulationRunning ? "text-gray-950 " : ""} `}
					onClick={startSimulation}
					disabled={simulationRunning}>
					<MdNotStarted/>
				</button>
				<button
					className={`'p-2 border-gray-400 border-y ${ isSimulationPaused? "text-gray-950 " : ""} `}
					onClick={pauseSimulation}
					disabled={!simulationRunning}>
					<MdMotionPhotosPause/>
				</button>
				<button className='p-2 hover:text-sky-950 ' onClick={resetSimulation}>
				<RiResetLeftLine/>
				</button>
				<div></div>
			</div>

			{simulationRunning && (
				<div className='absolute flex flex-col items-start justify-center w-full px-4 py-2 max-w-96 bottom-4 left-4 bg-glass'>
				<h3 className='w-full text-lg font-semibold border-b border-gray-400'>
					Route Simulation
				</h3>
				<div className='flex flex-col gap-2 py-2'>
					{/* <div className="text-xl" >
						<label className="text-sm font-semibold text-gray-900">
							Simulation Speed (ms):
						</label>
							<input
								type='number'
								value={simulationSpeed}
								onChange={(e) => setSimulationSpeed(Number(e.target.value))}
								min={100}
								step={100} className="px-4 bg-transparent w-36"
								disabled={simulationRunning}
							/>
					</div> */}
					<div className="text-xl" >
						<span className="text-sm font-semibold text-gray-900"> Simulation Speed :</span> {speed}{" "}
						km
					</div>
					<div className="text-xl" >
						<span className="text-sm font-semibold text-gray-900"> Distance Covered:</span> {remainingDistance.toFixed(2)}{" "}
						km
					</div>
					<div className="text-xl" >
						<span className="text-sm font-semibold text-gray-900">Current Step:</span> {currentStep}/
						{routeCoordinates?.length - 1 || 0}
					</div>
				</div>
			</div>
			)}
		</div>
	);
};

export default RouteSimulations;
