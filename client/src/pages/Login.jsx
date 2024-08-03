/* eslint-disable react/no-unescaped-entities */
import { useRef } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const App = () => {
  const { login, isLoading, error } = useLogin();
  const emailInput = useRef();
  const passwordInput = useRef();
  const nameInput = useRef();
  const formHandler = () => async (event) => {
    event.preventDefault();
    const data = {
      email: emailInput.current?.value,
      password: passwordInput.current?.value,
      userName: nameInput.current?.value,
    };
    console.log(data);

    await login(data.email, data.password, data.userName);
  };
  return (
    <div className="container mx-auto flex h-screen bg-gray-200 w-screen items-center justify-center text-slate-500">
      <form
        className="mt-4 w-1/2 bg-slate-50 py-2 px-4 rounded-lg lg:py-4 lg:px-6 lg:w-1/3"
        onSubmit={formHandler()}
      >
        <h1 className="text-3xl font-semibold p-3">login</h1>
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
            className="text-gray-700 text-sm font-bold px-3 mb-2"
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
            className="text-gray-700 text-sm font-bold px-3 mb-2"
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
          className="bg-green-600 mx-3 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Submit
        </button>
        {error && <div>{error}</div>}
        <p className="text-sm my-2 px-3">
          Don't have an account{" "}
          <Link to={`/signup`} className="hover:underline text-orange-700">
            sign up
          </Link>
        </p>
      </form>
    </div>
  );
};
export default App;
