import "tailwindcss/tailwind.css";
import { useCallback, useState } from "react";
import type { NextPage } from "next";
import axios from "axios";
import Cookies from "js-cookie";
import Router from "next/router";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const login = useCallback(async () => {
    try {
      const result = await axios.post("http://172.44.9.1:3001/auth", {
        email,
        password,
      });

      if (!!result.data?.token) {
        setErrMessage("");
        Cookies.set("token", result.data?.token);
      }

      Router.push("dashboard");
    } catch (err: any) {
      setErrMessage(err?.message || "Oops... something went wrong.");
    }
  }, [email, password]);

  return (
    <div className="h-screen bg-slate-300 flex justify-center items-center ">
      <div className="max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              E-mail
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Email"
              onChange={(evt: any) => setEmail(evt?.target?.value || "")}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(evt: any) => setPassword(evt?.target?.value || "")}
            />
          </div>
          <p className="text-red-500">{errMessage}</p>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={login}
            >
              Sign In
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2022 Exclusible. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
