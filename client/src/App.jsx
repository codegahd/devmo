/* eslint-disable no-unused-vars */
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import { useAuthContext } from "./hooks/useAuthContext";
import useGamesContext from "./hooks/useGamesContext";
import { BetContextProvider } from "./context/BetsContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import HomeLayout from "./Layouts/HomeLayout";
import Admin from "./pages/Admin";
import Bets from "./pages/Bets";


const App = () => {
  // const [betType, setbetType]=useState("")
  const { user } = useAuthContext();
  const {state} = useGamesContext()
  return (
    <>
      
        <BetContextProvider>
        <BrowserRouter>
            <div className="pages">
              <HomeLayout />
              <Routes>
                <Route
                  path="/"
                  element={user ? <Home /> : <Navigate to="/login" />}
                />
                <Route
                  path="/login"
                  element={!user ? <Login /> : <Navigate to="/" />}
                />
                <Route
                  path="/signup"
                  element={!user ? <Signup /> : <Navigate to="/" />}
                />
                <Route
                  path="/admin"
                  element={user ? <Admin /> : <Navigate to="/" />}
                />
                <Route
                  path="/bets"
                  element={user?<Bets/>:<Login/>}
                />
              </Routes>
            </div>
        </BrowserRouter>
        </BetContextProvider>
    </>
  );
};

export default App;
