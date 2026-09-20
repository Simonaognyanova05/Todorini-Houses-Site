import { Link, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import About from "./components/About";
import Amenities from "./components/Amenities/Amenities";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import Login from "./components/Login";
import Rooms from "./components/Rooms/Rooms";
import Registration from "./components/Registration";
import Logout from "./components/Logout";
import CreateRoom from "./components/CreateRoom";
import Reservations from "./components/Reservations";
import Messages from "./components/Messages";
import Edit from "./components/Edit";
import ForgottenPassword from "./components/ForgottenPassword";
import CreateOffer from "./components/CreateOffer";
import OffersList from "./components/OffersList/OffersList";
import EditOffer from "./components/EditOffer";
import './premium.css';
import AdminShell from './components/AdminShell';
import { useAuth } from './contexts/AuthContext';



function App() {
  const { pathname } = useLocation();
  const { user } = useAuth();
  const adminPage = ['/bookings', '/messages', '/create', '/createOffer'].includes(pathname)
    || pathname.startsWith('/room/') || pathname.startsWith('/offers/edit/')
    || (Boolean(user.email) && ['/room', '/offersList'].includes(pathname));
  const content = (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/offersList" element={<OffersList />} />
        <Route path="/forgotten" element={<ForgottenPassword />} />
        <Route path="/amenities" element={<Amenities />} />
        <Route path="/:type" element={<Amenities />} />
        <Route path="/room/:roomId" element={<Edit />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/room" element={<Rooms />} />
        <Route path="/bookings" element={<Reservations />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/create" element={<CreateRoom />} />
        <Route path="/createOffer" element={<CreateOffer />} />
        <Route path="/offers/edit/:id" element={<EditOffer />} />
      </Routes>
  );
  if (adminPage) return <AdminShell>
    {['/room', '/offersList'].includes(pathname) && <div className="admin-catalog-action"><Link className="admin-button" to={pathname === '/room' ? '/create' : '/createOffer'}>{pathname === '/room' ? '+ Нова стая' : '+ Нова оферта'}</Link></div>}
    {content}
  </AdminShell>;
  return (
    <>
      <a className="skip-link" href="#main-content">Към съдържанието</a>
      <Header />
      <main id="main-content" className="site-main" tabIndex={-1}>
      {content}
      </main>

      <Footer />
    </>
  );
}

export default App;
