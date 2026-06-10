import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "./App.scss";
import { Footer, Navigation } from "./components";
import { projects } from "./projects";

const Homepage      = lazy(() => import("@/pages/Homepage/Homepage").then(m => ({ default: m.Homepage })));
const AboutUs       = lazy(() => import("@/pages/AboutUs/AboutUs").then(m => ({ default: m.AboutUs })));
const Project       = lazy(() => import("@/pages/Project/Project").then(m => ({ default: m.Project })));
const SmallHouses   = lazy(() => import("@/pages/SmallHouses/SmallHouses").then(m => ({ default: m.SmallHouses })));
const Specifications = lazy(() => import("@/pages/Specifications/Specifications").then(m => ({ default: m.Specifications })));
const AboutInvestor = lazy(() => import("@/pages/AboutInvestor/AboutInvestor").then(m => ({ default: m.AboutInvestor })));
const Gallery       = lazy(() => import("@/pages/Gallery/Gallery").then(m => ({ default: m.Gallery })));
const WorkProgress  = lazy(() => import("@/pages/WorkProgress/WorkProgress").then(m => ({ default: m.WorkProgress })));
const ContactPage   = lazy(() => import("@/pages/ContactPage/ContactPage").then(m => ({ default: m.ContactPage })));
const ThankYou      = lazy(() => import("@/pages/ThankYou/ThankYou").then(m => ({ default: m.ThankYou })));

function App() {
  return (
    <>
      <Navigation />
      <Suspense fallback={null}>
        <Routes>
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/about-us" element={<AboutUs />} />

          {/* Dynamically generate routes for projects */}
          {projects.map((project, index) => (
            <Route
              key={index}
              path={`/project${index + 1}`}
              element={
                <Project
                  heroImage={project.heroImage}
                  mainImage={project.mainImage}
                  description={project.description}
                  showcaseImages={project.showcaseImages}
                  surfaceArea={project.surfaceArea}
                  seoTitle={project.seoTitle}
                  seoDescription={project.seoDescription}
                  seoPath={`/project${index + 1}`}
                />
              }
            />
          ))}

          <Route path="/small-houses" element={<SmallHouses />} />
          <Route path="/specifications" element={<Specifications />} />
          <Route path="/about-investor" element={<AboutInvestor />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/work-progress" element={<WorkProgress />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/thank-you" element={<ThankYou />} />
        </Routes>
      </Suspense>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
