import { useState } from "react";
import { useAppContext } from "../Contexts/AppContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    login(email, password);
    setEmail("");
    setPassword("");
  }

  const { toggleIsNewUser, login } = useAppContext();
  return (
    <div className="flex w-full min-h-screen justify-center items-center bg-gray-300">
      <div className="flex flex-col justify-center bg-white rounded-lg shadow-lg p-5 w-sm font-mono">
        <p className="w-full text-center text-2xl font-semibold mb-8">Login</p>
        <form className="flex justify-center flex-col space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-2 py-1 rounded bg-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-2 py-1 rounded bg-gray-300"
          />
          <button
            onClick={handleLogin}
            className="p-2 bg-blue-500 text-white font-semibold rounded-lg mt-2 hover:bg-blue-700 focus:outline-white"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center space-x-3 mt-4">
          <p>New User ?</p>
          <button
            onClick={toggleIsNewUser}
            className="border-b-2 border-gray-400 hover:border-blue-700 font-semibold"
          >
            Create an account
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
