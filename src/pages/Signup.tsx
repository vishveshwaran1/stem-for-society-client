import {
  Button,
  Checkbox,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import bg from "../assets/bg.png";
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

function SignUp() {
  const [formData, setFormData] = useState<SignUpForm>({
    email: "",
    password: "",
    confirmPassword: "",
    mobile: "",
    firstName: "",
    accept: false,
  });

  const signUpMutation = useSignUp();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (
      Object.keys(formData).every(
        (field) => formData[field as keyof SignUpForm],
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
    <div
      className={`flex w-full justify-center items-center relative flex-1 h-full`}
    >
      <div className="flex flex-col items-center bg-white rounded-xl border justify-center gap-5 lg:mx-0 w-full mx-3 lg:w-[35%] p-5">
        <Title order={1}>Get Started Now!</Title>
        <Text size="lg">Enter your details to proceed further</Text>
        {/* </div> */}
        <TextInput
          label="Name"
          placeholder="Enter your email"
          size="md"
          className="w-full"
          name={"firstName"}
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextInput
          label="Email Address"
          placeholder="Enter your name"
          size="md"
          className="w-full"
          name={"email"}
          value={formData.email}
          onChange={handleChange}
        />
        <TextInput
          label="Phone No."
          placeholder="Enter your phone."
          size="md"
          className="w-full"
          name={"mobile"}
          value={formData.mobile}
          onChange={handleChange}
        />
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          size="md"
          className="w-full"
          name={"password"}
          value={formData.password}
          onChange={handleChange}
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Re-Enter your password"
          size="md"
          className="w-full"
          name={"confirmPassword"}
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <div className="w-full">
          <Checkbox
            label={
              <span className=" font-semibold">
                I accept the{" "}
                <span className="text-blue-700 font-semibold">
                  terms and conditions.
                </span>
              </span>
            }
            checked={formData.accept}
            onChange={() =>
              setFormData({ ...formData, accept: !formData.accept })
            }
          />
        </div>

        <Button
          radius={999}
          w="300"
          onClick={handleSubmit}
          disabled={signUpMutation.isPending}
        >
          {signUpMutation.isPending ? "Please wait..." : "Sign Up"}
        </Button>
        <div className="w-full flex flex-row gap-2 justify-center">
          <Text ta="left" fw={500}>
            Have an account?
          </Text>
          <Link to="/login">
            <Text ta="left" c="blue" fw={500}>
              Log In
            </Text>
          </Link>
        </div>
      </div>

      <img
        src={bg}
        className="h-full fixed top-0 left-0 -z-50 w-full object-cover"
        alt="Background"
      />
    </div>
  );
}

export default SignUp;
