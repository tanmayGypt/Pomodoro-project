import { useLocation, Routes, Route, redirect, useNavigate } from 'react-router-dom';
import Sidebar from './Common/Navbar';
import "./App.css"
import Dashboard from './Core/Dashboard/Dashboard';
import Footer from './Common/Footer';
import Profile from './Core/Profile';
import SessionHistory from './Core/SessionHistory/SessionHistory';
import Pomodoro from './Core/Pomodoro/Pomodoro';
import Welcome from './Auth/Welcome';
function App() {
  const location = useLocation();
  const hiddenRoutes = ['/welcome'];
  const navigate = useNavigate();
  const isHiddenRoute = hiddenRoutes.includes(location.pathname);


  if (!localStorage.getItem("user")) {
    navigate("/welcome");
  }
  return (
    <>
      {!isHiddenRoute && (
        <Sidebar />
      )}
      <Routes>
        <Route path="/welcome" element={<Welcome />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/session-history' element={<SessionHistory />} />
        <Route path='/pomodoro' element={<Pomodoro />} />

      </Routes>
      {!isHiddenRoute && (
        <Footer />
      )}
    </>
  );
}

export default App;
