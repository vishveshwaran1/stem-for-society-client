import { Button, PasswordInput, Text, TextInput, Title } from "@mantine/core";
import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../assets/bg.png";
import { useUser } from "../lib/hooks";
import { queryClient } from "../lib/api";

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const { signIn, isSigningIn, user } = useUser({
    extraOnSuccess: () => {
      toast.success("Login was successful!");
      queryClient.invalidateQueries({ queryKey: ["trainings"] });
    },
  });

  if (user) return <Navigate to={"/training"} />;

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
    <div
      className={`flex w-full justify-center items-center relative flex-1 h-full`}
    >
      <div className="flex flex-col items-center bg-white rounded-xl border justify-center gap-5 lg:mx-0 w-full mx-3 lg:w-[35%] p-5">
        <Title order={1}>Login</Title>
        <Text size="lg">Enter your credentials to proceed further</Text>
        <TextInput
          label="Email Address"
          placeholder="Enter your email"
          size="md"
          name="email"
          className="w-full"
          value={formData.email}
          onChange={handleInputChange}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          size="md"
          name="password"
          type="password"
          className="w-full"
          value={formData.password}
          onChange={handleInputChange}
        />
        <Button
          radius={999}
          w={"100%"}
          onClick={handleSubmit}
          disabled={isSigningIn}
        >
          {isSigningIn ? "Logging in..." : "Login"}
        </Button>
        <div className="w-full flex flex-row gap-2">
          <Text ta="left" fw={500}>
            Don't have an account?
          </Text>
          <Link to={"/signup"}>
            <Text ta="left" c="blue" fw={500}>
              Sign Up
            </Text>
          </Link>
        </div>
      </div>
      <img
        src={bg}
        className="h-full absolute -z-50 w-full object-cover"
        alt="Background"
      />
    </div>
  );
}

export default Login;
