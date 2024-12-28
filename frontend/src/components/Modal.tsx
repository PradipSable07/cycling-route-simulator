import React, { RefObject } from "react";
import { VscLoading } from "react-icons/vsc";
import { useMapContext } from "../context/MapContext";


// Define props interface
interface PolylineModalProps {
  handleCancelRoute: () => void; // Function to handle cancellation
  handleAddRoute: () => void; // Function to add a route

  routeNameRef: RefObject<HTMLInputElement>; // Ref for the route name input
  saveRouteLoading: boolean; // Indicates if the save action is loading
}

const PolylineModal: React.FC<PolylineModalProps> = ({
  handleCancelRoute,
  handleAddRoute,
  routeNameRef,
  saveRouteLoading,
}) => {

  const {

      showAddRouteModal,
    } = useMapContext();
  if (!showAddRouteModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="p-4 bg-white shadow-md rounded-md w-[90%] max-w-md">
        <div className="flex flex-col items-center gap-4">
          <input
            type="text"
            name="routeName"
            id="routeName"
            placeholder="Enter route name"
            ref={routeNameRef}
            className="block w-full p-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />

          <div className="flex w-full gap-4">
            <button
              className="flex items-center justify-center w-full px-3 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleAddRoute}
              disabled={saveRouteLoading}
            >
              {saveRouteLoading ? <VscLoading className="mr-2 animate-spin" /> : <span>Save Route</span>}
            </button>

            <button
              className="w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleCancelRoute}
              disabled={saveRouteLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PolylineModal;