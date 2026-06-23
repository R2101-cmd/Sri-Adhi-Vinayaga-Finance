import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';

const Home = lazy(() => import('./pages/Home.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const EMICalculator = lazy(() => import('./pages/EMICalculator.jsx'));
const Gallery = lazy(() => import('./pages/Gallery.jsx'));
const VehicleDetails = lazy(() => import('./pages/VehicleDetails.jsx'));
const EmployeeLogin = lazy(() => import('./pages/EmployeeLogin.jsx'));
const EmployeeDashboard = lazy(() => import('./pages/EmployeeDashboard.jsx'));
const AddVehicle = lazy(() => import('./pages/AddVehicle.jsx'));
const EditVehicle = lazy(() => import('./pages/EditVehicle.jsx'));
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute.jsx'));

function PageFallback() {
  return (
    <div className="grid min-h-[55vh] place-items-center bg-ivory px-5 text-center">
      <div>
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-emeraldDeep/15 border-t-gold" />
        <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-emeraldDeep">Loading</p>
      </div>
    </div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <ScrollToTop />
      <Navbar />
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageFallback />}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/emi-calculator" element={<EMICalculator />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/gallery/vehicle/:id" element={<VehicleDetails />} />
            <Route path="/employee/login" element={<EmployeeLogin />} />
            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute>
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/vehicle/new"
              element={
                <ProtectedRoute>
                  <AddVehicle />
                </ProtectedRoute>
              }
            />
            <Route
              path="/employee/vehicle/:id/edit"
              element={
                <ProtectedRoute>
                  <EditVehicle />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
