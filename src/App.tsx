import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import FaveBooks from "./components/FaveBooks";
import Navbar from "./components/Navbar";
import CategoryMenu from "./components/CategoryMenu";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<CategoryMenu />} />
          <Route path="/favebooks" element={<FaveBooks />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
