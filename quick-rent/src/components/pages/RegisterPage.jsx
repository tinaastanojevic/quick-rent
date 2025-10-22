import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function RegisterPage() {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const { register: registerFromContext, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  //if (isLoggedIn === null) return <div>Loading...</div>;

  if (isLoggedIn) return <Navigate to="/" replace />;

  const submit = async (data) => {
    registerFromContext(data);
    navigate("/");
  };

  return (
    <>
      <div className="flex flex-col items-center min-h-screen p-5 bg-gray-100">
        <form
          onSubmit={handleSubmit(submit)}
          className="p-8 flex flex-col w-full max-w-md bg-white rounded-2xl shadow-md"
        >
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
            Register
          </h2>

          <Input
            {...register("username", {
              required: "Username is required!",
              minLength: {
                value: 4,
                message: "Username must be at least 4 characters long",
              },
            })}
            className="mb-4 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Username"
            type="text"
          />
          {errors.username && (
            <p className="text-red-500 mb-2">{errors.username.message}</p>
          )}

          <Input
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email address",
              },
            })}
            className="mb-4 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Email"
            type="email"
          />
          {errors.email && (
            <p className="text-red-500 mb-2">{errors.email.message}</p>
          )}

          <Input
            {...register("password", {
              required: "Password is required!",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
            className="mb-4 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Password"
            type="password"
          />
          {errors.password && (
            <p className="text-red-500 mb-2">{errors.password.message}</p>
          )}

          <select
            defaultValue=""
            className="mb-4 p-3 w-full text-gray-700 bg-gray-100 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            {...register("role", { required: "Role is required!" })}
          >
            <option value="" disabled hidden>
              Select a Role
            </option>
            <option value="Customer">Customer</option>
            <option value="Owner">Owner</option>
          </select>
          {errors.role && (
            <p className="text-red-500 mb-2">{errors.role.message}</p>
          )}

          <button
            type="submit"
            className="w-full p-3 text-xl text-white bg-blue-500 cursor-pointer rounded-lg shadow-md hover:bg-blue-600 transition-colors mb-4"
          >
            Register
          </button>

          <label className="text-gray-600 text-center">
            Already have an account?{" "}
            <a className="text-blue-600 hover:underline" href="/login">
              Login here!
            </a>
          </label>
        </form>
      </div>
    </>
  );
}
