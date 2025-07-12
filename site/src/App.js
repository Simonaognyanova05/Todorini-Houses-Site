import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home";
import About from "./components/About";
import Amenities from "./components/Amenities";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Rooms from "./components/Rooms";
import Registration from "./components/Registration";



function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/room" element={<Rooms />} />


      </Routes>

      <Footer />
    </>
  );
}

export default App;
