import { useState } from "react";
import { Button } from "@/components1/ui/button";
import { Input } from "@/components1/ui/input";
import { Label } from "@/components1/ui/label";
import { Checkbox } from "@/components1/ui/checkbox";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { api } from "../lib/api";
import { GenericError, GenericResponse } from "../lib/types";

type SignUpForm = {
  firstName: string;
  email: string;
  mobile: string;
  password: string;
  confirmPassword: string;
  accept: boolean;
};

// backend API hook
function useSignUp() {
  const navigate = useNavigate();
  return useMutation<
    GenericResponse,
    AxiosError<GenericError>,
    SignUpForm,
    unknown
  >({
    mutationFn: async (data) => {
      const res = await api().post("/auth/register", data);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      navigate("/login");
    },
    onError: (error) => {
      console.error("Sign up failed:", error);
      const errorObject =
        typeof error.response?.data !== "string" && error.response?.data;
      const errorMessage =
        errorObject && "error" in errorObject && errorObject.error;
      const validationError =
        errorObject && "errors" in errorObject && errorObject.errors;

      if (validationError) {
        validationError.forEach((err) => {
          toast.error(err.message);
        });
        return;
      }
      toast.error(errorMessage || error.message || "Server error");
    },
  });
}

const Signup = () => {
  const [formData, setFormData] = useState<SignUpForm>({
    firstName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    accept: false,
  });

  const signUpMutation = useSignUp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData({
      ...formData,
      accept: checked,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      Object.keys(formData).every(
        (field) => formData[field as keyof SignUpForm]
      )
    ) {
      if (!formData.accept)
        return toast.warn("Accept terms and conditions to continue");
      signUpMutation.mutate(formData);
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url("/lovable-uploads/cc0094aa-ced3-4e50-b5f1-d61b7b6d2988.png")`,
          backgroundPosition: "center 75%",
        }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex relative z-10 min-h-screen">
        {/* Left Side */}
        <div className="lg:w-1/2 flex items-center justify-center">
          <div className="text-center text-white mt-16">
            <img
              src="/lovable-uploads/ceabc523-dba1-475b-b670-7ed6b88782a1.png"
              alt="STEM for Society Logo"
              className="h-32 w-32 mx-auto mb-4 opacity-50"
            />
            <h1 className="text-4xl font-bold mb-4">STEM FOR SOCIETY</h1>
            <p className="text-xl">
              Join us to Innovate, Incubate and Impact the world together!
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:w-1/2 relative">
          <div className="absolute inset-0 bg-white/70 rounded-l-3xl"></div>
          <div className="relative z-10 flex items-center justify-center px-8 py-8">
            <div className="w-full max-w-md">
              <div className="text-center mb-6 pt-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Create an Account
                </h1>
                <p className="text-gray-600 text-lg">
                  Enter your details to proceed further
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Name</Label>
                  <Input
                    name="firstName"
                    type="text"
                    placeholder="Enter your name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    name="mobile"
                    type="tel"
                    placeholder="Enter your phone"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Password</Label>
                  <Input
                    name="password"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <Label>Confirm Password</Label>
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="flex items-center space-x-2 py-2">
                  <Checkbox
                    id="terms"
                    checked={formData.accept}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <Label htmlFor="terms" className="text-sm text-gray-600">
                    I accept the terms and conditions
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={signUpMutation.isPending}
                >
                  {signUpMutation.isPending ? "Please wait..." : "Sign Up"}
                </Button>
              </form>

              <div className="text-center mt-4">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-600 hover:underline font-semibold"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      {/* You can reuse the same form here for mobile design */}
    </div>
  );
};

export default Signup;
