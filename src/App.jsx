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
  //  const feedbackData = [
  //   { rating: 8, date: '2025-06-01', time: '10:15', message: 'Productive session!' },
  //   { rating: 9, date: '2025-06-02', time: '12:30', message: 'Great focus today.' },
  //   { rating: 7, date: '2025-06-03', time: '09:45', message: 'Struggled a bit, but got things done.' },
  //   { rating: 10, date: '2025-06-04', time: '11:00', message: 'Perfect flow state.' },
  //   { rating: 6, date: '2025-06-05', time: '14:20', message: 'Too many distractions.' },
  //   { rating: 9, date: '2025-06-06', time: '16:10', message: 'Very efficient session!' },
  //   { rating: 5, date: '2025-06-07', time: '13:00', message: 'Couldn’t focus well.' },
  //   { rating: 8, date: '2025-06-08', time: '15:40', message: 'Decent progress made.' },
  //   { rating: 10, date: '2025-06-09', time: '17:30', message: 'Extremely productive day!' },
  //   { rating: 7, date: '2025-06-10', time: '14:30', message: 'Good session, but room for improvement.' },
  //   { rating: 9, date: '2025-06-11', time: '11:45', message: 'Felt in control the whole time.' },
  //   { rating: 6, date: '2025-06-12', time: '10:00', message: 'Needed more motivation.' },
  // ];
  // localStorage.setItem("sessionFeedbacks", JSON.stringify(feedbackData));

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
