import React, { useState } from "react";
import { Route } from "../utils/types/AllTypes.ts";
import { RiPinDistanceFill } from "react-icons/ri";
import { CgLock } from "react-icons/cg";
import { BsEyeSlash, BsTrash2 } from "react-icons/bs";
import { toast } from "sonner";
import { useMapContext } from "../context/MapContext.tsx";
import { FaEye } from "react-icons/fa6";

interface UserRoutesListProps {
	savedRoutes: Route[];
	handleDeleteRoute: (routeId: number) => void;
	handlePanToRoute: (routeId: number) => void;
	setShowSavedRoutesMenu: React.Dispatch<React.SetStateAction<boolean>>;
	showSavedRoutesMenu: boolean;

}

const UserRoutes: React.FC<UserRoutesListProps> = ({
	savedRoutes,
	handleDeleteRoute,
	handlePanToRoute,
	setShowSavedRoutesMenu,
	showSavedRoutesMenu,
	
}) => {



	
const {speed , setSpeed} = useMapContext()
	
	const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newSpeed = e.target.value;

		if (newSpeed === null || isNaN(Number(newSpeed))) {
			setSpeed("");
			return;
		}

		if (Number(newSpeed) < 1) {
			toast("Speed cannot be less than 4 Km/hr.");
			setSpeed("");
			e.target.select();
		} else if (Number(newSpeed) > 40) {
			toast("Speed cannot be greater than 40 Km/hr");
			setSpeed("40");
			e.target.select();
		} else {
			setSpeed(newSpeed);
		}
	};

	function calculateTime(distance: number) {
		const time = Number(distance) / Number(speed);
		return time.toFixed(2);
	}
	
	
	return (
		<div
			className={`p-5 absolute h-[100vh] w-[20rem] bg-glass shadow-inner top-0 right-0 overflow-auto ${
				showSavedRoutesMenu
					? "opacity-1 pointer-events-auto visible"
					: "opacity-0 pointer-events-none invisible"
			}`}>
			<h4 className='mb-3 text-xl font-bold'>Routes</h4>
			<label htmlFor='my-speed' className='font-semibold'>
				Speed (Km/hr)
			</label>
			<input
				type='number'
				name='speed'
				id='my-speed'
				className='block w-full px-4 py-2 mt-2 rounded-md shadow-sm border-zinc-500 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
				placeholder='Enter your speed.'
				value={speed}
				onChange={handleSpeedChange}
			/>

			
{!savedRoutes || !Array.isArray(savedRoutes) ? (  <p className="z-50 py-2 capitalize"> no routes available.</p>):null} 
			{Array.isArray(savedRoutes) &&
				savedRoutes?.map((_route, _idx) => {
					
					return (
						<div
							key={_idx}
							className='p-3 mt-5 transition-all duration-300 bg-white border rounded-md shadow-sm hover:shadow-sm '>
							<div className='flex justify-between'>
								<h5 className='font-semibold'>{_route.name}</h5>

								<div className='flex flex-col items-end '>
									<span className='inline-flex items-center gap-1 mb-0 text-xs text-sky-400 '>
										<RiPinDistanceFill /> {_route.distance.toFixed(2)} Meter
									</span>
									<span className='inline-flex items-center gap-1 mb-0 text-xs'>
										<CgLock /> {calculateTime(_route.distance)} Min
									</span>
								</div>
							</div>

							<div className='flex gap-3 mt-3'>
							<FaEye onClick={handlePanToRoute.bind(null, _route.id)}/>

								
								{/* <Pencil /> */}
								<BsTrash2 onClick={handleDeleteRoute.bind(null, _route.id)} />
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default UserRoutes;
