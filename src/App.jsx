import { Routes, Route } from "react-router";
import { Footer, Navigation } from "./components";
import { AboutUs, Homepage, Projects, Specifications } from "./pages";
import "./App.scss";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/specifications" element={<Specifications />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
