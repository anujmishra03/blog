import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@chifuyu106/common";
import axios from "axios";

// Use the cloud URL directly as the BACKEND_URL
const BACKEND_URL = "https://blog.dailywrites.workers.dev";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  const sendRequest = async () => {
    try {
      const url = `${BACKEND_URL}/api/v1/user/${type}`;
      const payload =
        type === "signup"
          ? postInputs
          : { username: postInputs.username, password: postInputs.password };

      const response = await axios.post(url, payload);
      const jwt = response.data.token;

      localStorage.setItem("token", jwt);

      // Show alert only for signup
      if (type === "signup") {
        alert("Signed up successfully!");
      }

      navigate("/blogs"); // Corrected the route
    } catch (err: any) {
      console.error("Auth error:", err?.response?.data || err.message);
      alert(
        err?.response?.data?.msg || "Failed to authenticate. Please try again."
      );
    }
  };

  const handleSubmit = () => {
    const { name, username, password } = postInputs;

    if (!username.trim() || !password.trim()) {
      alert("Username and password are required.");
      return;
    }

    if (type === "signup" && !name.trim()) {
      alert("Please enter your name to sign up.");
      return;
    }

    sendRequest();
  };

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="w-80">
        <h2 className="text-3xl font-bold text-black text-center">
          {type === "signup" ? "Create an account" : "Welcome Back"}
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          {type === "signup"
            ? "Already have an account?"
            : "Don't have an account?"}
          <Link
            className="pl-1 underline text-gray-600"
            to={type === "signup" ? "/signin" : "/signup"}
          >
            {type === "signup" ? "Signin" : "Signup"}
          </Link>
        </p>

        <div className="mt-6 space-y-4">
          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="Enter your name"
              onChange={(e) =>
                setPostInputs({
                  ...postInputs,
                  name: e.target.value.trimStart(),
                })
              }
            />
          )}
          <LabelledInput
            label="Username"
            placeholder="Enter your email"
            onChange={(e) =>
              setPostInputs({
                ...postInputs,
                username: e.target.value.trimStart(),
              })
            }
          />
          <LabelledInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            onChange={(e) =>
              setPostInputs({ ...postInputs, password: e.target.value })
            }
          />

          <button
            onClick={handleSubmit}
            className="w-full mt-4 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition"
          >
            {type === "signup" ? "Sign up" : "Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface LabelledInputProps {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({
  label,
  placeholder,
  onChange,
  type = "text",
}: LabelledInputProps) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-900">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type}
        className="w-full border border-gray-300 text-sm rounded-md px-3 py-2 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
        placeholder={placeholder}
        required
      />
    </div>
  );
}
