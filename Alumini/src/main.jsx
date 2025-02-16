import React from "react";
import ReactDOM from "react-dom/client"
import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import EventsSection from "./components/EventsSection";
import Footer from "./components/Footer";
import "./index.css"
import Login from "./components/Login";
import HeroSection from "./components/HeroSection";
import RegistrationForm from "./components/RegistrationForm";
import  {createBrowserRouter,  RouterProvider } from "react-router-dom"
import RegisterAdmin from "./components/RegisterAdmin";
import AdminPage from "./components/AdminPage";
const App = () => {
  return (
    <div className="font-sans">
      <Header />
      <HeroSection></HeroSection>
      <AboutSection />
      <EventsSection />
      <RegistrationForm></RegistrationForm>
      <Footer />
    </div>
  );
};

const appRoute = createBrowserRouter([
  {
    path:"/",
    element:<App></App>
  },
  {
    path:"/login",
    element:<Login></Login>
  },{
    path:"/register",	
    element:<RegisterAdmin></RegisterAdmin>
  },{
    path:"/admin",
    element:<AdminPage></AdminPage>
  }
])

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRoute}></RouterProvider>)