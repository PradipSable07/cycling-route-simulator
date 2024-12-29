import React, { RefObject } from "react";
// import { SaveRouteReqData } from "../utils/types/AllTypes.ts";

interface RouteModalProps {
  routeNameRef: RefObject<HTMLInputElement>;
  handleAddRoute: () => void;
  handleCancelRoute: () => void;
  showAddRouteModal: boolean;
  saveRouteLoading: boolean;
}

const RouteModal: React.FC<RouteModalProps> = ({
  routeNameRef,
  handleAddRoute,
  handleCancelRoute,
  showAddRouteModal,
  saveRouteLoading,
}) => {
  if (!showAddRouteModal) return null;

  return (
    <div className="fixed z-50 max-w-xl transform -translate-x-1/2 -translate-y-1/2 bg-glass top-1/2 left-1/2">
      <div className="">
        <h2>Add New Route</h2>
        <input ref={routeNameRef} type="text" placeholder="Route Name" />
        <div>
          <button onClick={handleAddRoute} disabled={saveRouteLoading}>
            {saveRouteLoading ? "Saving..." : "Save Route"}
          </button>
          <button onClick={handleCancelRoute}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default RouteModal;