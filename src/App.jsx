import {
  AboutInvestor,
  AboutUs,
  Contact,
  Gallery,
  Homepage,
  Project1,
  Project2,
  Projects,
  Specifications,
  WorkProgress,
} from "@/pages";
import { Route, Routes } from "react-router";
import "./App.scss";
import { Footer, Navigation } from "./components";

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project1" element={<Project1 />} />
        <Route path="/project2" element={<Project2 />} />
        <Route path="/specifications" element={<Specifications />} />
        <Route path="/about-investor" element={<AboutInvestor />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/work-progress" element={<WorkProgress />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
