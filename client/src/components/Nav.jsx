/* eslint-disable no-unused-vars */
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from '../hooks/useLogout'
import { Link } from "react-router-dom";
import { useBetsContext } from "../hooks/useBetsContext";

export default function Nav() {
  const { logout } = useLogout()
  const { user } = useAuthContext();
  const {bets} = useBetsContext()
  const handleClick = async() => {
    await logout()
  }

  return (
    <nav className="nav ">
      <div className="container h-16 mx-auto flex flex-row justify-between items-center px-2">
        <div className="logo-container">
          <img className="logo p-4" src="" alt="logo" />
        </div>
       { user && <div className="menu">
            <ul className=" text-lg font-semibold text-white flex flex-row gap-4 mt-4 pb-2">
              <li className=" bg-slate-50 w-fit border-green-600 border-2 py-2 px-6 rounded-full shadow-md text-slate-600 flex items-center justify-center">
                {user?.profile.userName}{" "}
              </li>
              <li className="bg-slate-50 border-green-600  border-2 py-2 w-fit px-6 rounded-full shadow-md text-slate-600 flex items-center justify-center">
                Balance: {user?.profile.Balance}{" "}
              </li>
              <Link to="/bets">
                <div className="bg-green-600 py-2 px-6 rounded-full shadow-md text-white w-fit">
                  bets {bets.length === 0?"":bets.length}
                </div>
              </Link>
              <button className="bg-slate-50 border-green-600 border-2 py-2 px-6 rounded-full shadow-md text-slate-600 flex items-center justify-center" 
                onClick={handleClick}>
                Log out
              </button>
            </ul>
        </div>}
        {!user && (
              <div className="flex gap-4">
                <Link className="bg-slate-50 border-green-200 border-2 py-2 w-fit px-6 rounded-full shadow-md text-slate-600 flex items-center justify-center"
                 to="/login">Login</Link>

                <Link className="bg-slate-50 border-green-200 border-2 py-2 w-fit px-6 rounded-full shadow-md text-slate-600 flex items-center justify-center"
                 to="/signup"
                 >Signup</Link>
              </div>
              )}
      </div>
    </nav>
  );
}
