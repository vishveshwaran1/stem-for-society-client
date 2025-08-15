import { useState } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../lib/hooks";
import { queryClient } from "../lib/api";
import LoginStages from "@/components1/ui/LoginStages";
import LoginForm from "@/components1/ui/LoginForm";

interface LoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const { signIn, isSigningIn, user } = useUser({
    extraOnSuccess: () => {
      toast.success("Login was successful!");
      queryClient.invalidateQueries({ queryKey: ["trainings"] });
    },
  });

  if (user) return <Navigate to={"/"} />;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (formData.email && formData.password) {
      signIn(formData);
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div
        className="absolute inset-0 bg-cover animate-subtle-zoom"
        style={{
          backgroundImage: `url("/lovable-uploads/cc0094aa-ced3-4e50-b5f1-d61b7b6d2988.png")`,
          backgroundPosition: "center 70%",
        }}
      />
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>

      {/* Desktop Layout */}
      <div className="hidden md:block relative z-10 min-h-screen">
        <LoginStages>
          {(stage) => (
            <>
              {/* Logo */}
              <div
                className={`absolute top-1/2 -translate-y-1/2 transition-all ${
                  stage === "logoTransition"
                    ? "duration-[2500ms]"
                    : "duration-[1500ms]"
                } ${
                  stage === "initial" || stage === "textFadeOut"
                    ? "left-1/2 -translate-x-1/2"
                    : "left-[25%] -translate-x-1/2"
                }`}
                style={{
                  transitionTimingFunction:
                    "cubic-bezier(0.25, 0.1, 0.25, 1)",
                  transform:
                    "translate3d(var(--tw-translate-x), var(--tw-translate-y), 0)",
                }}
              >
                <img
                  src="/lovable-uploads/ceabc523-dba1-475b-b670-7ed6b88782a1.png"
                  alt="STEM for Society Logo"
                  className={`object-contain transition-all ${
                    stage === "logoTransition"
                      ? "duration-[2500ms]"
                      : "duration-[1500ms]"
                  } ${
                    stage === "initial" || stage === "textFadeOut"
                      ? "h-32 w-32 md:h-48 md:w-48 lg:h-64 lg:w-64"
                      : "h-40 w-40 md:h-56 md:w-56 lg:h-72 lg:w-72 opacity-50"
                  } ${
                    stage === "logoTransition"
                      ? "animate-pulse-glow-delayed"
                      : ""
                  }`}
                  style={{
                    transitionTimingFunction:
                      "cubic-bezier(0.25, 0.1, 0.25, 1)",
                  }}
                />
              </div>

              {/* Slogan Text */}
              <div
                className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out ${
                  stage === "initial"
                    ? "opacity-100 translate-y-24 md:translate-y-32 lg:translate-y-40"
                    : "opacity-0 -translate-y-5"
                }`}
              >
                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4 leading-tight">
                  Let's Innovate, Incubate and Impact the world together!
                </h1>
              </div>

              {/* Login Form Panel */}
              <div
                className={`absolute right-0 top-0 h-full w-1/2 transition-all ${
                  stage === "logoTransition"
                    ? "duration-[2500ms]"
                    : "duration-[1500ms]"
                } ${
                  stage === "logoTransition"
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }`}
                style={{
                  transitionTimingFunction:
                    "cubic-bezier(0.25, 0.1, 0.25, 1)",
                  transform:
                    "translate3d(var(--tw-translate-x), var(--tw-translate-y), 0)",
                }}
              >
                <div className="absolute inset-0 bg-white/50 rounded-l-3xl backdrop-blur-sm"></div>
                <div className="relative z-10 h-full max-h-screen overflow-y-auto flex items-center justify-center px-4 md:px-8 py-4">
                  <LoginForm
                    email={formData.email}
                    password={formData.password}
                    onInputChange={handleInputChange}
                    onSubmit={handleSubmit}
                    isLoading={isSigningIn}
                  />
                </div>
              </div>
            </>
          )}
        </LoginStages>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden relative z-10 min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center pt-16">
          <img
            src="/lovable-uploads/ceabc523-dba1-475b-b670-7ed6b88782a1.png"
            alt="STEM for Society Logo"
            className="h-24 w-24 object-contain animate-pulse-glow-delayed opacity-50"
          />
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 bg-white/50 rounded-t-3xl backdrop-blur-sm"></div>
          <div className="relative z-10 max-h-[60vh] overflow-y-auto flex items-start justify-center px-4 pt-8 pb-4">
            <div className="w-full max-w-sm">
              <LoginForm
                email={formData.email}
                password={formData.password}
                onInputChange={handleInputChange}
                onSubmit={handleSubmit}
                isLoading={isSigningIn}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
