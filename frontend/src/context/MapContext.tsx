import React, { createContext, useContext, useRef, ReactNode, useState } from "react";
import { TemporaryRoute, Route, MapInstanceType } from "../utils/types/AllTypes.ts";

//type for the context value
interface MapContextValue {
  savedRoutes: Route[];
  setSavedRoutes: React.Dispatch<React.SetStateAction<Route[]>>;
  tempRoute: TemporaryRoute | null;
  setTempRoute: React.Dispatch<React.SetStateAction<TemporaryRoute | null>>;
  showAddRouteModal: boolean;
  setShowAddRouteModal: React.Dispatch<React.SetStateAction<boolean>>;
  simulationRunning: boolean;
  setSimulationRunning: React.Dispatch<React.SetStateAction<boolean>>;
  selectedRoute: Route | null;
  setSelectedRoute: React.Dispatch<React.SetStateAction<Route | null>>;
  mapInstanceRef: React.MutableRefObject<MapInstanceType | null>;
  speed : string | number;
  setSpeed : React.Dispatch<React.SetStateAction<string | number>>
  markerRef: React.MutableRefObject<L.Marker | null>;
}

interface MapProviderProps {
  children: ReactNode;
}

const MapContext = createContext<MapContextValue | undefined>(undefined);

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [tempRoute, setTempRoute] = useState<TemporaryRoute | null>(null);
  const [showAddRouteModal, setShowAddRouteModal] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const mapInstanceRef = useRef<MapInstanceType | null>(null);
  const [savedRoutes, setSavedRoutes] = useState<Route[]>([]);
  const [speed, setSpeed] = useState<string | number>("10");
  const markerRef = useRef<L.Marker | null>(null);
  return (
    <MapContext.Provider
      value={{

        savedRoutes,
        setSavedRoutes,
        tempRoute,
        setTempRoute,
        showAddRouteModal,
        setShowAddRouteModal,
        simulationRunning,
        setSimulationRunning,
        selectedRoute,
        setSelectedRoute,
        mapInstanceRef
        ,setSpeed,
        speed,
        markerRef
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext: () => MapContextValue = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMapContext must be used within a MapProvider");
  }
  return context;
};