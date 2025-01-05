import { BrowserRouter } from "react-router-dom";
import { Routing } from "./router/approuter";


function App() {
 
  return <div className="h-screen w-full">
    <BrowserRouter>
    <Routing/>
    </BrowserRouter>
  </div>
}

export default App
