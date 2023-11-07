import Navbar from "./Components/Navbar/Navbar";
import Rotas from "./config/routes";
import { BrowserRouter as Router } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <>
      <MantineProvider>
        <Router>
          <div className="min-h-screen bg-gray-900 flex flex-col">
            <Navbar />
            <Rotas />
          </div>
        </Router>
      </MantineProvider>
    </>
  );
}

export default App;
