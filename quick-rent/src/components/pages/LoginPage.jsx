import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function LoginPage() {
  const { login, isLoggedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  if (isLoggedIn) return <Navigate to="/" replace />;

  const handleLogin = async (e) => {
    e.preventDefault();
    login(email, password);
    navigate("/");
  };

  return (
    <form onSubmit={handleLogin}>
      <div className="flex flex-col  items-center min-h-screen p-5 bg-gray-100 ">
        <div className="p-8 flex flex-col w-full max-w-md bg-white rounded-2xl shadow-md">
          <div className="flex flex-col mb-6">
            <Input
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
              type="email"
            />
            <Input
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
              type="password"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 text-xl text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 cursor-pointer transition-colors mb-4"
          >
            Login
          </button>

          <label className="text-gray-600 text-center">
            Don't have an account?{" "}
            <a className="text-blue-600 hover:underline" href="/register">
              Register here!
            </a>
          </label>
        </div>
      </div>
    </form>
  );
}

export default LoginPage;
