import React, { useState } from "react";
import Button from "@src/components/Button";
import Input from "@src/components/Input";
import logo from "@assets/images/logo-unpak.png";
// import { useAuth } from "@src/context/authContext";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
//   const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    // setLoading(true);
    // try {
    //   const response = await apiProduction.post("/api/Authentication", {
    //     username,
    //     password,
    //   });

    //   const token = response.data;
    //   // console.log("Token:", token);

    //   if (token) {
    //     setLoading(false);
    //     login(token);
    //   } else {
    //     setLoading(false);
    //     setError("Login gagal, silakan coba lagi.");
    //   }
    // } catch (err) {
    //   setLoading(false);
    //   setError(err.response?.data?.message || "Terjadi kesalahan saat login.");
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-400 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        {/* Logo & Heading */}
        <div className="flex justify-center mb-4">
          <img
            src={logo}
            alt="Logo"
            className="h-16"
          />
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Universitas Pakuan
        </h2>
        <p className="text-center text-gray-600 mb-6">Lapor Diri PPG</p>

        {/* Form */}
        <form className="space-y-4">
          <Input
            label="Username"
            type="text"
            placeholder="Masukkan username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Masukkan password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Pesan Error */}
          {error && (
            <div className="text-sm text-center text-red-600 bg-red-100 rounded-md py-2 px-4">
              {error}
            </div>
          )}

          <div className="mb-4"></div>

          {/* Login Button */}
          <Button loading={loading} onClick={handleLogin} className="w-full">
            Masuk
          </Button>
        </form>

        <div className="text-sm text-center text-gray-400 mt-5">
          © {new Date().getFullYear()} Universitas Pakuan. All Rights Reserved.
        </div>

        {/* Register Option */}
        {/* <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="#" className="text-purple-500 hover:underline">
            Sign Up
          </a>
        </p> */}
      </div>
    </div>
  );
};

export default Auth;
