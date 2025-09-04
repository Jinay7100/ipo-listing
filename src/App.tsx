import "./App.css";
import { Route, Routes } from "react-router-dom";
import IpoListing from "./pages/IpoListing";
import IpoDetails from "./pages/IpoDetails";
import Home from "./pages/Home";

function App() {
  return (
    <div className="container mx-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ipo-list" element={<IpoListing />} />
        <Route path="/ipo/:id" element={<IpoDetails />} />
      </Routes>
    </div>
  );
}

export default App;
