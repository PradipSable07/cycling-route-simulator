import { MapProvider } from "./context/MapContext"
import HomePage from "./pages/HomePage"


const App = () => {
  return (
   <>
   <MapProvider>

   <HomePage/>
   </MapProvider>
   </>
  )
}

export default App