
import { useRef, useCallback } from "react";
import { useSignup } from "../hooks/useSignup";
import { Link } from "react-router-dom";

const App = () => {
  const { signup, isLoading, error } = useSignup();
  const emailInput = useRef();
  const passwordInput = useRef();
  const nameInput = useRef();
  const formHandler = useCallback(
    () => (event) => {
      event.preventDefault();

      const data = {
        email: emailInput.current?.value,
        password: passwordInput.current?.value,
        userName: nameInput.current?.value,
      };

      signup(data.email, data.password, data.userName);
    },
    [signup]
  );

  return (
    <div className="text-gray-500 container mx-auto flex h-screen bg-slate-200 w-screen items-center justify-center">
      <form
        className="mt-4 bg-slate-50 py-2 px-4 rounded-md w-1/2 lg:py-4 lg:px-6 lg:w-1/3"
        onSubmit={formHandler()}
      >
        <h1 className="text-3xl font-semibold p-3">Signup</h1>
        <div className="flex flex-col mb-4">
          <label
            className="text-gray-700 text-sm font-bold px-3 mb-2"
            htmlFor="username"
          >
            username
          </label>
          <input
            ref={nameInput}
            id="username"
            placeholder="username"
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label
            className="text-gray-700 text-sm px-3 font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            ref={emailInput}
            id="email"
            placeholder="Email"
            type="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex flex-col mb-4">
          <label
            className="text-gray-700 text-sm px-3 font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            ref={passwordInput}
            id="password"
            placeholder="Password"
            type="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          disabled={isLoading}
          className="bg-green-600 mx-3 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
        {error && <div>{error}</div>}
        <p className="text-sm my-2 px-3">
          Don&apost have an account{" "}
          <Link to={`/login`} className="hover:underline text-orange-700">
            log in
          </Link>
        </p>
      </form>
    </div>
  );
};
export default App;
