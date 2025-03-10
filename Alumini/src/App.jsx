import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AlumniForm from "./pages/AlumniForm";
import AdminPage from "./pages/AdminPage";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EventsSection from "./pages/EventSection";
import AboutSection from "./pages/About";
import AlumniDetails from "./pages/AlumniDetails";
import Gallery from "./pages/Gallery";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<AlumniForm />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/event" element={<EventsSection/>} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/gallery" element={<Gallery></Gallery>} />

        <Route path="/alum/:id" element={<AlumniDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
