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
import { signInWithGoogle } from "../lib/firebaseAuth";
import { useUser } from "../lib/hooks";
import { API_URL } from "../Constants";

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
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (
      Object.keys(formData).every(
        (field) => formData[field as keyof SignUpForm]
      )
    ) {
      if (!formData.accept)
        return toast.warn("Accept terms and conditions to continue");
      
      // Use API registration directly
      signUpMutation.mutate(formData);
    } else {
      toast.error("Please fill in all fields");
    }
  };

  const { signIn } = useUser({
    extraOnSuccess: () => {
      toast.success("Login was successful!");
      navigate("/");
    },
  });

  const handleGoogleSignup = async () => {
    try {
      const firebaseUser = await signInWithGoogle();
      
      const googleEmail = firebaseUser.email!;
      const googlePassword = `GoogleUser123456${firebaseUser.uid}ABC`;
      const firstName = firebaseUser.displayName?.split(' ')[0] || 'User';
      const lastName = firebaseUser.displayName?.split(' ').slice(1).join(' ') || '';
      
      // Register the user first
      try {
        const registerResponse = await fetch(`${API_URL}/auth/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: googleEmail,
            firstName: firstName,
            lastName: lastName,
            password: googlePassword,
            mobile: '',
          }),
        });
        
        if (!registerResponse.ok) {
          console.log('Registration failed, user might exist');
        }
      } catch (registerError) {
        console.log('Registration error, proceeding to login');
      }
      
      // Small delay then login
      await new Promise(resolve => setTimeout(resolve, 500));
      
      signIn({
        email: googleEmail,
        password: googlePassword
      });
      
    } catch (error: any) {
      console.error("Google signup failed:", error);
      toast.error(error.message || "Failed to sign up with Google");
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

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">or sign up with</span>
                </div>
              </div>

              {/* Google Sign Up Button */}
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignup}
                className="w-full mb-4 border-gray-300 hover:bg-gray-50"
              >
                <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Sign up with Google
              </Button>

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
